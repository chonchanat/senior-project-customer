import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Navbar } from '../components/Navbar';
import { BlockMobile } from '../components/Block'
import { CardWithHead } from '../components/Card';
import { Button } from '../components/Button';

import { getOneActivity } from '../api/activityAPI';
import { createQueue } from '../api/queueAPI';

import { AiFillStar } from 'react-icons/ai';

function CustomerScan() {

    const navigate = useNavigate();
    const { code } = useParams();
    const authReducer = useSelector(state => state.authReducer);

    const [data, setData] = useState(null);
    const [form, setForm] = useState({
        username: authReducer.username,
        activityCode: code,
        status: "wait",
        size: 1,
        star: 0,
    });
    useEffect(() => {
        async function getActivity() {
            const response = await getOneActivity(code);
            setData(response);
        }
        getActivity();
    }, [code])

    function handlerAdd() {
        if (form.size < authReducer.members) {
            setForm({ ...form, size: form.size + 1 });
        }
    }
    function handlerSub() {
        if (form.size > 1) {
            setForm({ ...form, size: form.size - 1 });
        }
    }

    function handlerSubmit() {
        createQueue({ ...form, star: form.size * data.star }).then((queueId) => navigate(`/customer-myactivity/${queueId}`));
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
                            <img src={data.picture} alt="img of activity" />
                        </div>
                        <p className="mt-6 text-sm">จำนวนผู้เข้าร่วม (สูงสุด {authReducer.members} คน)</p>
                        <div className="flex mt-4 bg-gray-200 rounded-lg h-[40px] items-center">
                            <div className="mx-[16px] w-[28px] h-[28px] text-center border-[1px] border-gray-300 rounded-full" onClick={handlerSub}>
                                -
                            </div>
                            <div className="w-[100px] text-center border-[1px] rounded-lg border-gray-300 font-bold">
                                {form.size}
                            </div>
                            <div className="mx-[16px] w-[28px] h-[28px] text-center border-[1px] border-gray-300 rounded-full" onClick={handlerAdd}>
                                +
                            </div>
                        </div>
                        <p className="mt-4 text-sm">ใช้ดาวทั้งหมด {data.star * form.size} ดวง</p>
                        <div className="flex w-[220px] justify-between mt-8 mb-4">
                            <Button bgColor="bg-accept" width="w-[100px]" click={handlerSubmit}>ตกลง</Button>
                            <Button bgColor="bg-decline" width="w-[100px]" click={() => navigate('/customer-home')}>ยกเลิก</Button>
                        </div>
                    </div>
                </CardWithHead>
            </BlockMobile>
        </div>
    );
}

export default CustomerScan;