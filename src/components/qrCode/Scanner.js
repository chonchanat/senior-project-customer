import Wrapper from "../Wrapper";
import Html5QrcodePlugin from "./Html5QrcodePlugin";

function Scanner({ open, setOpen, handlerScanner = () => {return 0;} }) {
    return (
        <>
            <Wrapper state={open} bgColor="bg-black/50"
                click={() => setOpen(false)} />

            <div className={`h-fit w-full fixed z-50 p-4
                ${open ? "top-[80px]" : "top-[-480px] invisible"}`}
                style={{ "transition": "0.2s ease-out" }}>

                <div className="bg-white p-4 rounded-lg">
                    <p onClick={() => setOpen(false)}>close</p>
                    <Html5QrcodePlugin handlerScanner={handlerScanner} open={open}/>
                </div>
                
            </div>
        </>
    );
}

export default Scanner;