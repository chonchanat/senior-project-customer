import Wrapper from './Wrapper';
import { Button } from './Button';
import Divider from './Divider';

import { RiBook2Line, RiDeleteBin7Line } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';
import { BsPlay } from 'react-icons/bs';

function ModalBookQueue({ state, setState, click, form, data }) {
    return (
        <div>
            <Wrapper state={state} bgColor="bg-black/50"
                click={() => setState(false)} />

            <div className={`fixed top-20 bg-white z-50 left-[50%] translate-x-[-50%] w-[90%] max-w-[400px] min-h-[80px] shadow-lg rounded-xl p-4
                ${state ? "top-[140px]" : "top-[120px] invisible"}`}
                style={{ transition: "all 0.1s ease-out" }}>

                <IoMdClose className="ml-auto text-xl" onClick={() => setState(false)} />
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

function ModalUnBookQueue({ state, setState, click }) {
    return (
        <div>
            <Wrapper state={state} bgColor="bg-black/50"
                click={() => setState(false)} />

            <div className={`fixed top-20 bg-white z-50 left-[50%] translate-x-[-50%] w-[90%] max-w-[400px] min-h-[80px] shadow-lg rounded-xl p-4
                ${state ? "top-[140px]" : "top-[120px] invisible"}`}
                style={{ transition: "all 0.1s ease-out" }}>

                <IoMdClose className="ml-auto text-xl" onClick={() => setState(false)} />
                <div className="flex items-center pb-4">
                    <RiDeleteBin7Line className="text-white text-5xl bg-decline p-2 rounded-full mx-4" />
                    <p className="text-base">คุณต้องการยกเลิกการจองคิวนี้</p>
                </div>
                <Divider />
                <div className="flex justify-end pt-4">
                    <Button bgColor="bg-decline" width="w-[100px]" click={click}>ยกเลิก</Button>
                </div>
            </div>
        </div>
    );
}

function ModalOptions({ state, setState, click, options }) {
    return (
        <div>
            <Wrapper state={state} bgColor="bg-black/50"
                click={() => setState(false)} />

            <div className={`fixed top-20 bg-white z-50 left-[50%] translate-x-[-50%] text-sm w-[90%] max-w-[400px] min-h-[80px] shadow-lg rounded-xl p-4
                ${state ? "top-[140px]" : "top-[120px] invisible"}`}
                style={{ transition: "all 0.1s ease-out" }}>

                <IoMdClose className="ml-auto text-xl" onClick={() => setState(false)} />
                <p className="text-base mb-2">ตัวเลือกการค้นหา</p>
                <input className="h-4 w-4 mr-4"
                    type="checkbox" checked={options.status === "open"} value="open"
                    onChange={(e) => click({ ...options, status: e.target.value })} />
                <label >เปิดให้บริการ</label><br />

                <input className="h-4 w-4 mr-4"
                    type="checkbox" checked={options.status === "temporarily closed"} value="temporarily closed"
                    onChange={(e) => click({ ...options, status: e.target.value })} />
                <label>ปิดให้บริการชั่วคราว</label><br />

                <input className="h-4 w-4 mr-4 mb-4"
                    type="checkbox" checked={options.status === "closed"} value="closed"
                    onChange={(e) => click({ ...options, status: e.target.value })} />
                <label>ปิดให้บริการ</label><br />
                <Divider />
                <input className="h-4 w-4 mr-4 mt-2"
                    type="checkbox" checked={options.sortMin}
                    onChange={(e) => click({ ...options, sortMin: !options.sortMin })} />
                <label>เรียงจากเวลารอน้อยที่สุด</label>
            </div>
        </div>
    );
}

function ModalStartQueue({ state, setState, click, data }) {
    return (
        <div>
            <Wrapper state={state} bgColor="bg-black/50"
                click={() => setState(false)} />

            <div className={`fixed top-20 bg-white z-50 left-[50%] translate-x-[-50%] w-[90%] max-w-[400px] min-h-[80px] shadow-lg rounded-xl p-4
                ${state ? "top-[140px]" : "top-[120px] invisible"}`}
                style={{ transition: "all 0.1s ease-out" }}>

                <IoMdClose className="ml-auto text-xl" onClick={() => setState(false)} />
                <div className="flex items-center pb-4">
                    <BsPlay className="text-white text-5xl bg-accept p-2 rounded-full mx-4" />
                    <div className="text-sm">
                        <p className="text-base mb-2">คุณต้องการเริ่มกิจกรรม</p>
                        <p>จำนวนคิว</p>
                        <p>จำนวนผู้เข้าร่วม</p>
                    </div>
                </div>
                <Divider />
                <div className="flex justify-end pt-4">
                    <Button bgColor="bg-accept" width="w-[100px]" click={click}>เริ่ม</Button>
                </div>
            </div>
        </div>
    );
}

function ModalRemoveQueue({ state, setState, click }) {
    return (
        <div>
            <Wrapper state={state} bgColor="bg-black/50"
                click={() => setState(false)} />

            <div className={`fixed top-20 bg-white z-50 left-[50%] translate-x-[-50%] w-[90%] max-w-[400px] min-h-[80px] shadow-lg rounded-xl p-4
                ${state ? "top-[140px]" : "top-[120px] invisible"}`}
                style={{ transition: "all 0.1s ease-out" }}>

                <IoMdClose className="ml-auto text-xl" onClick={() => setState(false)} />
                <div className="flex items-center pb-4">
                    <RiDeleteBin7Line className="text-white text-5xl bg-decline p-2 rounded-full mx-4" />
                    <p className="text-base">คุณต้องการล้างคิวทั้งหมด</p>
                </div>
                <Divider />
                <div className="flex justify-end pt-4">
                    <Button bgColor="bg-decline" width="w-[100px]" click={click}>ล้างคืว</Button>
                </div>
            </div>
        </div>
    );
}

function ModalInfoQueue({ state, setState, click }) {
    return (
        <div>
            <Wrapper state={state} bgColor="bg-black/50"
                click={() => setState(false)} />

            <div className={`fixed top-20 bg-white z-50 left-[50%] translate-x-[-50%] w-[90%] max-w-[400px] min-h-[80px] shadow-lg rounded-xl p-4
                ${state ? "top-[140px]" : "top-[120px] invisible"}`}
                style={{ transition: "all 0.1s ease-out" }}>

                <IoMdClose className="ml-auto text-xl" onClick={() => setState(false)} />
                <p className="">รายการที่ว่างของแต่ละรอบ ในขณะนี้</p>

            </div>
        </div>
    );
}

export { ModalBookQueue, ModalUnBookQueue, ModalOptions, ModalStartQueue, ModalRemoveQueue, ModalInfoQueue };