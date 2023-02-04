import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';


import { BlockMobile } from "../components/Block";
import { Navbar } from "../components/Navbar";

import { CardActivity } from "../components/Card";
import { Button } from "../components/Button";
// import { getOneActivity } from "../api/activityAPI";

function StaffScan() {

    const { code } = useParams();

    const [data, setData] = useState(null);
    const [bookData, setBookData] = useState([]);
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
        setBookData([
            {
                userId: "ajhv1",
                members: 4,
            },
            {
                userId: "ajhv2",
                members: 2,
            },
            {
                userId: "ajhv2",
                members: 6,
            },
        ])
    }, [code])

    return (
        <div>
            {/* <Navbar /> */}
            <BlockMobile>
                {data ?
                    <div>
                        <CardActivity data={data} />
                        <div className="flex py-4">
                            <Button width="w-full h-12" bgColor="bg-accept">เริ่มกิจกรรม</Button>
                            <div className="w-8" />
                            <Button width="w-full h-12" bgColor="bg-decline">???</Button>
                        </div>
                        <div className="bg-light-gray">
                            {bookData.map((item, index) => 
                                <div className="flex">
                                    <p>{index}</p>
                                    <p>{item.userId}</p>
                                    <p>{item.members}</p>
                                </div>
                            )}
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