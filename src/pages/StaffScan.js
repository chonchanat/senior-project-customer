import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BlockMobile } from "../components/Block";
import { Navbar } from "../components/Navbar";
import { CardActivity } from "../components/Card";
import { Button } from "../components/Button";
import Scanner from "../components/qrCode/Scanner";
import { ModalStartQueue, ModalRemoveQueue } from "../components/Modal";

import { AiFillCamera } from 'react-icons/ai';

import { getOneActivity } from "../api/activityAPI";
import { startQueue } from "../api/queueAPI";

function StaffScan() {

    const navigate = useNavigate();
    const authReducer = useSelector(state => state.authReducer);
    const { code } = useParams();

    const [data, setData] = useState(null);
    const [members, setMembers] = useState(0);
    const [bookData, setBookData] = useState([]);
    const [error, setError] = useState("พร้อมสแกน");

    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (authReducer.role === "customer") navigate('/customer-home');
    }, [authReducer, navigate])

    useEffect(() => {
        async function getActivity() {
            const response = await getOneActivity(code);
            setData(response);
        }
        getActivity();
    }, [code])

    const [modalStart, setModalStart] = useState(false);
    const [modalRemove, setModalRemove] = useState(false);

    function handlerScanner(dataScan) {
        const obj = JSON.parse(dataScan);
        setOpen(false);

        if (obj.disable) {
            setError("QR Code หมดอายุแล้ว");
            return;
        };
        if (obj.activityCode !== code) {
            setError("QR Code รหัสกิจกรรมไม่ถูกต้อง");
            return;
        }
        if (obj.size + members > data.size) {
            setError("QR Code นี้มีผู้เข้าร่วมกิจกรรมมากกว่าที่ว่าง");
            return;
        }

        let found = false;
        for (const q of bookData) {
            if (q.queueId === obj.queueId) {
                setError("QR Code นี้ถูกสแกนแล้ว")
                found = true;
            }
        }
        if (!found) {
            setBookData([...bookData, obj])
            setMembers(members + obj.size);
            setError("พร้อมสแกน");
        }
    }

    function handlerStart() {
        setModalStart(false);
        setMembers(0);
        setBookData([]);
        const bookDataList = [];
        for (const i of bookData) {
            bookDataList.push(i.queueId);
        }
        startQueue({
            activityCode: data.code,
            queueId: bookDataList,
        });
    }
    function handlerRemove() {
        setModalRemove(false);
        setMembers(0);
        setBookData([]);
    }

    return (
        <div>
            <Navbar />
            <ModalStartQueue state={modalStart} setState={setModalStart} click={handlerStart} queue={bookData.length} members={members} />
            <ModalRemoveQueue state={modalRemove} setState={setModalRemove} click={handlerRemove} />
            <Scanner open={open} setOpen={setOpen} handlerScanner={handlerScanner} />
            <BlockMobile>
                {data ?
                    <div className="text-sm">
                        <CardActivity data={data} />

                        <Button width="w-full h-12 mt-4 font-bold" bgColor="bg-[#DFD1C6]" click={() => setOpen(true)}>แสกน QR-Code<AiFillCamera className="ml-2 text-xl" /></Button>
                        <div className="flex my-4">
                            <Button width="w-full h-12" bgColor="bg-accept" click={() => setModalStart("start")}>เริ่มกิจกรรม</Button>
                            <div className="w-8" />
                            <Button width="w-full h-12" bgColor="bg-decline" click={() => setModalRemove("remove")}>ล้างคิวทั้งหมด</Button>
                        </div>

                        <p>ขนาดความจุผู้เข้าร่วม : {members} / {data.size}</p>
                        <p>แจ้งเตือน : {error}</p>
                        <p>ตารางแสดงผู้เข้าร่วมรอบนี้</p>
                        <div className="bg-light-gray p-4 rounded-md mt-4">
                            {bookData.map((item, index) =>
                                <div className="grid grid-cols-10" key={index}>
                                    <p className="">{index + 1}</p>
                                    <div className="flex items-center">{item.diffRound ? <div className="w-3 h-3 rounded-full bg-orange-400" /> : <div />}</div>
                                    <p className="col-span-6">{item.username}</p>
                                    <p className="col-span-2 text-end">{item.size} คน</p>
                                </div>
                            )}
                            {bookData.length === 0 && <p className="text-sm">ขณะนี้ยังไม่มีรายการเข้าเล่น</p>}
                        </div>
                    </div>
                    :
                    <p>การโหลดข้อมูลผิดพลาด</p>
                }
            </BlockMobile>
        </div>
    );
}

export default StaffScan;