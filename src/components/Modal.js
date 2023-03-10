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
                <input className="h-5 w-5 mr-4 mb-2"
                    type="checkbox" checked={options.status === "all"} value="all"
                    onChange={(e) => click({ ...options, status: e.target.value })} />
                <label >ทั้งหมด</label><br />

                <input className="h-5 w-5 mr-4 mb-2"
                    type="checkbox" checked={options.status === "open"} value="open"
                    onChange={(e) => click({ ...options, status: e.target.value })} />
                <label >เปิดให้บริการ</label><br />

                <input className="h-5 w-5 mr-4 mb-2"
                    type="checkbox" checked={options.status === "temporarily closed"} value="temporarily closed"
                    onChange={(e) => click({ ...options, status: e.target.value })} />
                <label>ปิดให้บริการชั่วคราว</label><br />

                <input className="h-5 w-5 mr-4 mb-4"
                    type="checkbox" checked={options.status === "closed"} value="closed"
                    onChange={(e) => click({ ...options, status: e.target.value })} />
                <label>ปิดให้บริการ</label><br />
                <Divider />
                <input className="h-5 w-5 mr-4 mt-2"
                    type="checkbox" checked={options.sortMin}
                    onChange={(e) => click({ ...options, sortMin: !options.sortMin })} />
                <label>เรียงจากเวลารอน้อยที่สุด</label>
            </div>
        </div>
    );
}

function ModalStartQueue({ state, setState, click, queue, members }) {
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
                        <p>จำนวนคิว {queue}</p>
                        <p>จำนวนผู้เข้าร่วม {members}</p>
                    </div>
                </div>
                <Divider />
                <div className="flex justify-end pt-4">
                    {queue !== 0 && <Button bgColor="bg-accept" width="w-[100px]" click={click}>เริ่ม</Button>}
                    {queue === 0 && <Button bgColor="bg-slate-300" width="w-[100px]">เริ่ม</Button>}
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

function ModalInfoQueue({ state, setState, click, form, data, round, firstIndex }) {
    const lastIndex = data.allRounds.length - 1;
    const waitSlot = data.allRounds[lastIndex].status === "done" ? true : false;

    function checkSize(space, index) {
        if (form.size > space) {
            return <p className="col-span-6 text-sm text-decline">ที่ว่างไม่เพียงพอ</p>;
        }
        if (data.duration * (index - firstIndex) === 0) {
            return <p className="col-span-6 text-sm text-accept">พร้อมในรอบต่อไป</p>;
        } else {
            return <p className="col-span-6 text-sm">{data.duration * (index - firstIndex)} นาที</p>
        }
    }
    function handlerClick(space, index) {
        if (form.size <= space) {
            click(index + 1, space);
        }
    }

    return (
        <div>
            <Wrapper state={state} bgColor="bg-black/50"
                click={() => setState(false)} />

            <div className={`fixed top-20 bg-white z-50 left-[50%] translate-x-[-50%] w-[90%] max-w-[400px] min-h-[80px] shadow-lg rounded-xl p-4
                ${state ? "top-[140px]" : "top-[120px] invisible"}`}
                style={{ transition: "all 0.1s ease-out" }}>

                <IoMdClose className="ml-auto text-xl" onClick={() => setState(false)} />
                <p>รายการที่ว่างของแต่ละรอบ ในขณะนี้</p>
                <div className="grid grid-cols-10 text-sm my-2">
                    <div />
                    <p className="col-span-7">รอบ</p>
                    <p className="col-span-2 text-center">ที่ว่าง</p>
                </div>

                <div className="h-[180px] overflow-y-scroll">
                    {waitSlot ?
                        <div>
                            <div className="grid grid-cols-10 flex items-center text-sm my-2" onClick={() => handlerClick(data.space, 0)}>
                                <div className="w-3 h-3 rounded-full bg-fha" />
                                <p className="col-span-2">1</p>
                                <p className="col-span-6 text-sm text-accept">พร้อมในรอบต่อไป</p>
                                <p>{data.size}</p>
                            </div>
                            <Divider />
                        </div>
                        :
                        data.allRounds.map((data, index) => {
                            if (data.status === "wait") {
                                return <div key={index}>
                                    <div className="grid grid-cols-10 flex items-center text-sm my-2" onClick={() => handlerClick(data.space, index)}>
                                        {index === round - 1 ? <div className="w-3 h-3 rounded-full bg-fha" /> : <div />}
                                        <p className="col-span-2">{index - firstIndex + 1}</p>
                                        {checkSize(data.space, index)}
                                        <p>{data.space}</p>
                                    </div>
                                    <Divider />
                                </div>
                            }
                        })
                    }
                </div>

            </div>
        </div>
    );
}

export { ModalBookQueue, ModalUnBookQueue, ModalOptions, ModalStartQueue, ModalRemoveQueue, ModalInfoQueue };