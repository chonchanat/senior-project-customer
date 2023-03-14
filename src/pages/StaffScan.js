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
    const [noti, setNoti] = useState({ message: "", error: false });

    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (authReducer.role === "customer") navigate('/customer-home');
    }, [authReducer, navigate])

    useEffect(() => {
        async function getActivity() {
            if (authReducer.role === "customer") navigate("/customer-home");

            const response = await getOneActivity(code);
            setData(response);
        }
        getActivity();
    }, [code])

    const [modalStart, setModalStart] = useState(false);
    const [modalRemove, setModalRemove] = useState(false);

    function handlerScanner(dataScan) {
        const obj = JSON.parse(dataScan);

        if (obj.disable) {
            setNoti({ message: "QR Code หมดอายุแล้ว", error: true });
            return;
        };
        if (obj.activityCode !== code) {
            setNoti({ message: "QR Code รหัสกิจกรรมไม่ถูกต้อง", error: true });
            return;
        }
        if (obj.size + members > data.size) {
            setNoti({ message: "QR Code นี้มีผู้เข้าร่วมกิจกรรมมากกว่าที่ว่าง", error: true });
            return;
        }

        for (const q of bookData) {
            if (q.queueId === obj.queueId) {
                setNoti({ message: "QR Code นี้ถูกสแกนแล้ว", error: true });
                return;
            }
        }
        
        setBookData([...bookData, obj])
        setMembers(members + obj.size);
        setNoti({ message: "", error: false })
        setOpen(false);
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
            <Scanner open={open} setOpen={setOpen} handlerScanner={handlerScanner} noti={noti} />
            <BlockMobile>
                {data ?
                    <div className="text-sm">
                        <CardActivity data={data} />

                        <Button width="w-full h-12 mt-4 font-bold" bgColor="bg-[#DFD1C6]" click={() => {setOpen(true); setNoti({message:"", error:false})}}>แสกน QR-Code<AiFillCamera className="ml-2 text-xl" /></Button>
                        <div className="flex my-4">
                            <Button width="w-full h-12" bgColor="bg-accept" click={() => setModalStart("start")}>เริ่มกิจกรรม</Button>
                            <div className="w-8" />
                            <Button width="w-full h-12" bgColor="bg-decline" click={() => setModalRemove("remove")}>ล้างคิวทั้งหมด</Button>
                        </div>

                        <p>ขนาดความจุผู้เข้าร่วม : {members} / {data.size}</p>
                        {/* <p>แจ้งเตือน : {error}</p> */}
                        {/* <p>ตารางแสดงผู้เข้าร่วมรอบนี้</p> */}
                        <div className="bg-light-gray p-4 rounded-md mt-4">
                            {bookData.map((item, index) =>
                                <div className="grid grid-cols-12" key={index}>
                                    <p className="">{index + 1}</p>
                                    {/* <div className="flex items-center">{item.diffRound ? <div className="w-3 h-3 rounded-full bg-orange-400" /> : <div />}</div> */}
                                    <p className="col-span-4">{item.username}</p>
                                    <p className="col-span-5 text-red-400">{item.diffRound > 0 && "คิวนี้ไม่ตรงตามรอบ"}</p>
                                    <p className="col-span-2 text-end">{item.size} คน</p>
                                </div>
                            )}
                            {bookData.length === 0 && <p className="text-sm">ขณะนี้ยังไม่มีรายการผู้ร่วมกิจกรรม</p>}
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