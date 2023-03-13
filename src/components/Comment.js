import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, ButtonTransparent } from './Button';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { reviewActivity } from '../api/activityAPI';

function RatingStar({ form, setForm }) {
    return (
        <div className="flex justify-center">
            {[...Array(5)].map((star, index) => {
                return (
                    <div key={index}>
                        <AiFillStar className={`text-yellow text-[40px] ${index >= form.rating && "hidden"}`} onClick={() => setForm({ ...form, rating: index + 1 })} />
                        <AiOutlineStar className={`text-yellow text-[40px] ${index < form.rating && "hidden"}`} onClick={() => setForm({ ...form, rating: index + 1 })} />
                    </div>
                );
            })}
        </div>
    );
}

function Comment({ data, setSelectData }) {

    const authReducer = useSelector(state => state.authReducer);
    const [form, setForm] = useState({
        username: authReducer.username,
        rating: 0,
        text: "",
    });
    const [noti, setNoti] = useState({ message: "", error: false });
    function handlerSubmit() {
        if (form.rating === 0) {
            setNoti({ message: "กรุณาให้คะแนนกิจกรรม", error: true });
            return;
        }

        setNoti({ message: "กำลังโอัปโหลดข้อมูล", error: false });
        reviewActivity({
            code: data.code,
            comment: form,
        })
            .then(() => { setNoti({ message: "", error: false }); window.location.reload(true) })
            .catch(() => setNoti({ message: "อัปโหลดข้อมูลไม่สำเร็จ", error: true }))
    }
    return (
        <div>
            <p className="font-bold mb-4">ให้คะแนนและความคิดเห็น : <label>{data.name[0]}</label></p>
            <p className="text-sm text-slate-500 my-2">ให้คะแนน</p>
            <RatingStar form={form} setForm={setForm} />
            <p className="text-sm text-slate-500 my-2">ความคิดเห็น</p>
            <textarea className="rounded-lg border border-inputBorder bg-light-blue w-full h-32 p-4" onChange={(e) => setForm({ ...form, text: e.target.value })} />
            {noti.message && <p className={`text-sm text-center mt-2 ${noti.error ? "text-decline" : "text-accept"}`}>{noti.message}</p>}
            <div className="flex justify-between mt-6">
                <ButtonTransparent width="w-20" font="font-bold" click={() => setSelectData(null)}>Cancel</ButtonTransparent>
                <Button bgColor="bg-accept" width="w-20" font="font-bold" click={handlerSubmit}>Send</Button>
            </div>
        </div>
    );
}

export default Comment;