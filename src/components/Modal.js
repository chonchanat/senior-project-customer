import Wrapper from './Wrapper';
import { Button } from './Button';
import Divider from './Divider';

import { RiBook2Line } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';

function ModalBookQueue({ state, setState, click, form, data }) {
    return (
        <div>
            <Wrapper state={state} bgColor="bg-black/50"
                click={() => setState(false)} />

            <div className={`fixed top-20 bg-white z-50 left-[50%] translate-x-[-50%] w-[90%] max-w-[400px] min-h-[80px] shadow-lg rounded-xl p-4
                ${state ? "top-[140px]" : "top-[120px] invisible"}`}
                style={{ transition: "all 0.1s ease-out" }}>
                
                <IoMdClose className="ml-auto text-xl" onClick={() => setState(false)}/>
                <div className="flex items-center pb-4">
                    <RiBook2Line className="text-white text-5xl bg-accept p-2 rounded-full mx-4" />
                    <div className="text-sm">
                        <p className="text-base mb-2">รายการจอง : {data.name[0]}</p>
                        <p>จำนวนผู้เข้าร่วม {form.size}</p>
                        <p>จำนวนดาวที่ใช้ {form.star}</p>
                    </div>
                </div>
                <Divider />
                <div className="flex justify-end pt-4">
                    <Button bgColor="bg-accept" width="w-[100px]" click={click}>จองคิว</Button>
                </div>
            </div>
        </div>
    );
}

export { ModalBookQueue };