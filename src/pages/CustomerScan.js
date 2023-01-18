import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Navbar } from '../components/Navbar';
import { BlockMobile } from '../components/Block'
import { CardWithHead } from '../components/Card';
import { Button } from '../components/Button';

import { getOneActivity } from '../api/activityAPI';

import { AiFillStar } from 'react-icons/ai';

function CustomerScan() {

    const navigate = useNavigate();
    const { code } = useParams();
    const authReducer = useSelector(state => state.authReducer);

    const [data, setData] = useState(null);
    useEffect(() => {
        async function getActivity() {
            const response = await getOneActivity(code);
            setData(response);
        }
        getActivity();
    }, [code])

    const [member, setMember] = useState(1);

    function handlerAdd() {
        if (member < authReducer.member) {
            setMember(member + 1);
        }
    }
    function handlerSub() {
        if (member > 1) {
            setMember(member - 1);
        }
    }

    return (
        data &&
        <div>
            <Navbar />
            <BlockMobile>
                <CardWithHead title={"จองคิวกิจกรรม"} bgColor={"#F8F8F8"}>
                    <div className="flex flex-col items-center">
                        <p className="text-xl font-bold">{data.name[0]}</p>
                        <p className="flex items-center text-sm">{data.star} <AiFillStar className="text-yellow mx-1" /> / คน</p>
                        <div className="pt-4 h-[150px] w-[180px] overflow-hidden">
                            <img src={data.image} alt="img of activity" />
                        </div>
                        <p className="mt-6 text-sm">จำนวนผู้เข้าร่วม (สูงสุด {authReducer.members} คน)</p>
                        <div className="flex mt-4 bg-gray-200 rounded-lg h-[40px] items-center">
                            <div className="mx-[16px] w-[28px] h-[28px] text-center border-[1px] border-gray-300 rounded-full" onClick={handlerSub}>
                                -
                            </div>
                            <div className="w-[100px] text-center border-[1px] rounded-lg border-gray-300 font-bold">
                                {member}
                            </div>
                            <div className="mx-[16px] w-[28px] h-[28px] text-center border-[1px] border-gray-300 rounded-full" onClick={handlerAdd}>
                                +
                            </div>
                        </div>
                        <p className="mt-4 text-sm">ใช้ดาวทั้งหมด {data.star * member} ดวง</p>
                        <div className="flex w-[220px] justify-between mt-8 mb-4">
                            <Button bgColor="bg-accept" width="w-[100px]">ตกลง</Button>
                            <Button bgColor="bg-decline" width="w-[100px]" click={() => navigate('/customer-home')}>ยกเลิก</Button>
                        </div>
                    </div>
                </CardWithHead>
            </BlockMobile>
        </div>
    );
}

export default CustomerScan;