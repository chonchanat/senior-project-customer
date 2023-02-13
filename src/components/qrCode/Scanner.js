import Wrapper from "../Wrapper";
import Html5QrcodePlugin from "./Html5QrcodePlugin";

import { IoClose } from 'react-icons/io5';

function Scanner({ open, setOpen, handlerScanner = () => { return 0; } }) {
    return (
        <>
            <Wrapper state={open} bgColor="bg-black/50" />

            <div className={`h-fit w-full fixed z-50 p-4 max-w-[560px] mx-auto left-[50%] transform translate-x-[-50%]
                ${open ? "top-[80px]" : "top-[-480px] invisible"}`}
                style={{ "transition": "0.2s ease-out" }}>
                <div className="bg-white p-4 rounded-lg">
                    <div className="flex justify-between mb-4">
                        <p className="font-bold">Scan QR-code</p>
                        <IoClose className="text-2xl" onClick={() => setOpen(false)} />
                    </div>
                    <Html5QrcodePlugin handlerScanner={handlerScanner} open={open} />
                </div>
            </div>
        </>
    );
}

export default Scanner;