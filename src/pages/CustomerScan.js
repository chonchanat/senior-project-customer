import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Navbar } from '../components/Navbar';
import { BlockMobile } from '../components/Block'
import { CardWithHead } from '../components/Card';
import { Button } from '../components/Button';
import { ModalBookQueue } from '../components/Modal';

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
            if (!response) {
                navigate('/customer-home');
            }
            else {
                setData(response);
                setForm({ ...form, star: response.star });
            }
        }
        getActivity();
    }, [code, navigate])

    const [state, setState] = useState(false);
    const [errMessage, setErrMessage] = useState("");

    function handlerAdd() {
        if (form.size < authReducer.members) {
            if (100 < data.star * (form.size + 1)) {
                setErrMessage("จำนวนดาวไม่เพียงพอ");
                return;
            }
            setForm({ ...form, size: form.size + 1, star: data.star * (form.size + 1) });
        }
    }
    function handlerSub() {
        if (form.size > 1) {
            setErrMessage("");
            setForm({ ...form, size: form.size - 1, star: data.star * (form.size - 1) });
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
                <ModalBookQueue state={state} setState={setState} click={handlerSubmit} form={form} data={data} />
                <CardWithHead title={"จองคิวกิจกรรม"} bgColor={"#F8F8F8"}>
                    <div className="flex flex-col items-center">
                        <p className="text-xl font-bold">{data.name[0]}</p>
                        <p className="flex items-center text-sm">{data.star} <AiFillStar className="text-yellow mx-1" /> / คน</p>

                        <img src={data.picture} className="mt-4 h-[120px] w-[180px] rounded-md" alt="img of activity" />
                        <p className="mt-6 text-sm">จำนวนผู้เข้าร่วม (สูงสุด {authReducer.members} คน)</p>
                        <div className="flex my-2 bg-gray-200 rounded-lg h-[40px] items-center">
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
                        <p className="text-sm">ใช้ดาวทั้งหมด {data.star * form.size} ดวง</p>
                        <div className="flex w-[220px] justify-between mt-8 mb-4">
                            <Button bgColor="bg-decline" width="w-[100px]" click={() => navigate('/customer-home')}>ยกเลิก</Button>
                            <Button bgColor="bg-accept" width="w-[100px]" click={() => setState(true)}>ตกลง</Button>
                        </div>
                        <p className="text-sm text-decline">{errMessage}</p>
                    </div>
                </CardWithHead>
            </BlockMobile>
        </div>
    );
}

export default CustomerScan;