// import { IoClose } from 'react-icons/io5';

const List = ["หน้าแรก", "รายการคิว", "กิจกรรมทั้งหมด", "แผนที่"]

function MenuList({ text, click }) {
    return (
        <div className="py-4 pl-4 border-b-[1px] border-light-blue font-bold text-sm"
        key={text}
        onClick={click}>
            {text}
        </div>
    );
}

function SideMenu({ toggle, setToggle }) {
    return (
        <div className={` h-screen bg-fha-desktop fixed top-0 w-[220px] z-50 transition duration-300
            ${toggle ? "right-[0]" : "right-[-200px] invisible"}`}
            style={{ "transition": "0.3s ease-out" }}>
            <div className="bg-fha h-fit relative py-4 pl-4">
                {/* <IoClose size="28px" className="text-white absolute right-2 top-2"
                onClick={() => setToggle(false)} /> */}
                <p className="pb-2">ยินดีต้อนรับ</p>
                <p className="font-bold">คุณ 0887828326</p>
                <p>ดาวที่เหลือ : 121 ดวง</p>
            </div>
            <div className="pt-4">
                {List.map((text) => (<MenuList text={text} />)
                )}
            </div>
            <div className="mt-[60%] border-t-[1px] border-light-blue py-4 pl-4 font-bold text-sm" onClick={() => setToggle(false)}>
                ออกจากระบบ
            </div>
        </div>
    );
}

export default SideMenu;