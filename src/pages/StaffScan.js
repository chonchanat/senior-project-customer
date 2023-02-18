import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';


import { BlockMobile } from "../components/Block";
import { Navbar } from "../components/Navbar";
import { CardActivity } from "../components/Card";
import { Button } from "../components/Button";
import Scanner from "../components/qrCode/Scanner";

import { AiFillCamera } from 'react-icons/ai';

// import { getOneActivity } from "../api/activityAPI";

function StaffScan() {

    const { code } = useParams();

    const [data, setData] = useState(null);
    const [bookData, setBookData] = useState([]);
    const [userIdList, setUserIdList] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // async function getActivity() {
        //     const response = await getOneActivity(code);
        //     setData(response);
        // }
        // getActivity();
        setData({
            name: ["รถไฟเหาะ", "Roller"],
            image: "https://www.changtrixget.com/wp-content/uploads/2018/09/superman-krypton-coaster.jpg",
        })
    }, [code])

    function handlerScanner(data) {
        const obj = JSON.parse(data);
        if (!userIdList.includes(obj.userId)) {
            setBookData([ ...bookData, obj]);
            setUserIdList([ ...userIdList, obj.userId]);
        }
        setOpen(false);
    }

    return (
        <div>
            <Navbar />
            <Scanner open={open} setOpen={setOpen} handlerScanner={handlerScanner} />
            <BlockMobile>
                {data ?
                    <div>
                        <CardActivity data={data} />

                        <Button width="w-full h-12 mt-4 font-bold" bgColor="bg-[#DFD1C6]" click={() => setOpen(true)}>แสกน qr-code<AiFillCamera size="20px" className="ml-2" /></Button>
                        <div className="flex my-4">
                            <Button width="w-full h-12" bgColor="bg-accept">เริ่มกิจกรรม</Button>
                            <div className="w-8" />
                            <Button width="w-full h-12" bgColor="bg-decline">ล้างคิวทั้งหมด</Button>
                        </div>

                        <p>ตารางแสดงผู้เล่นรอบนี้</p>
                        <div className="bg-light-gray p-4 rounded-md mt-4">
                            {bookData.map((item, index) =>
                                <div className="flex" key={index}>
                                    <p className="w-16">{index + 1}</p>
                                    <p className="w-full">{item.userId}</p>
                                    <p className="w-16 text-end">{item.members} คน</p>
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