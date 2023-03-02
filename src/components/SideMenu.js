import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../actions/authActions';

import { HiHome } from 'react-icons/hi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { RiFileListFill, RiBook2Fill } from 'react-icons/ri';
import { IoLogOut } from 'react-icons/io5';
import { AiFillStar } from 'react-icons/ai';
import { MdComment } from 'react-icons/md';
import Divider from './Divider';

function SideMenu({ toggle }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authReducer = useSelector(state => state.authReducer);

    function handlerLogout() {
        Cookies.remove("accesstoken");
        Cookies.remove("userCookie");
        dispatch(setAuth(null));
        navigate('/customer-signin');
    }

    return (
        <div className={` h-screen bg-fha-desktop fixed top-0 w-[240px] z-50 flex flex-col px-4
            ${toggle ? "right-[0]" : "right-[-240px] invisible"}`}
            style={{ "transition": "0.1s ease-out" }}>

            <div className="relative text-white py-4">
                <p className="pb-2 font-bold">ยินดีต้อนรับ</p>
                <p className="font-bold">คุณ {authReducer.username}</p>
                {
                    authReducer.role === "customer" ?
                        <p className="flex items-center">ดาวที่เหลือ : {authReducer.star} <AiFillStar className="text-yellow ml-1" /></p>
                        :
                        <p>พนักงาน</p>
                }
            </div>

            <Divider color="fha"/>

            <div className="pt-4 mb-40">
                <div className="flex items-center py-2 text-white font-bold"
                    onClick={() => navigate("/customer-home")}>
                    <HiHome size="28px" className="bg-white p-1 rounded-full mr-2 text-fha" /><p>หน้าแรก</p>
                </div>
                {authReducer.role === "customer" &&
                    <div className="flex items-center py-2 text-white font-bold"
                        onClick={() => navigate("/customer-myactivity")}>
                        <RiFileListFill size="28px" className="bg-white p-1 rounded-full mr-2 text-fha" /><p>รายการคิว</p>
                    </div>
                }
                <div className="flex items-center py-2 text-white font-bold"
                    onClick={() => navigate("/customer-activity")}>
                    <RiBook2Fill size="28px" className="bg-white p-1 rounded-full mr-2 text-fha" /><p>กิจกรรมทั้งหมด</p>
                </div>
                <div className="flex items-center py-2 text-white font-bold"
                    onClick={() => navigate("/customer-map")}>
                    <FaMapMarkerAlt size="28px" className="bg-white p-1 rounded-full mr-2 text-fha" /><p>แผนที่</p>
                </div>
                {authReducer.role === "customer" &&
                    <div className="flex items-center py-2 text-white font-bold"
                        onClick={() => navigate("/customer-comment")}>
                        <MdComment size="28px" className="bg-white p-1 rounded-full mr-2 text-fha" /><p>ประวัติกิจกรรม</p>
                    </div>
                }
            </div>

            <Divider color="fha"/>

            <div className="flex items-center pt-6 text-white font-bold" onClick={handlerLogout}>
                <IoLogOut size="28px" className="bg-white p-1 rounded-full mr-2 text-fha" /><p>ออกจากระบบ</p>
            </div>
        </div>
    );
}

export default SideMenu;