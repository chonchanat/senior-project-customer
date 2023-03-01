import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { setQueue } from '../actions/queueActions';

import { Navbar } from '../components/Navbar'
import { BlockMobile } from '../components/Block';
import { Card, CardWithHead, CardComment } from '../components/Card';

import { TbQrcode } from 'react-icons/tb';
import { GoListUnordered } from 'react-icons/go';
import { BiBookContent, BiMapPin, BiCommentDetail } from 'react-icons/bi';
import Scanner from '../components/qrCode/Scanner';

import { getOneActivity } from "../api/activityAPI";

import Cookies from 'js-cookie';
function CustomerHome() {

    const navigate = useNavigate();
    const authReducer = useSelector(state => state.authReducer);

    const scanRef = useRef();
    const [open, setOpen] = useState(false);
    const [controlActivity, setControlActivity] = useState(null);
    const [incomingQueue, setIncomingQueue] = useState(null);

    useEffect(() => {
        async function getControlActivity() {
            const controlActivityCookie = Cookies.get('controlActivityCookie')
            if (controlActivityCookie === undefined) return;
            const response = await getOneActivity(controlActivityCookie);
            setControlActivity(response);
        }

        if( authReducer.role === "customer"){
            console.log('รอ API ดึงคิวที่กำลังจะถึงจาก CustomerHeadCard');
            setIncomingQueue(null);
        }
        else getControlActivity();

    }, [authReducer])

    function handlerCard(link) {
        navigate(link);
    }
    function handlerScanner(data) {
        const code = data.split("/").pop();
        navigate(`/customer-scan/${code}`);
    }

    return (
        <div>
            <Navbar />
            <Scanner open={open} setOpen={setOpen} handlerScanner={handlerScanner} />
            <BlockMobile>

                {authReducer.role !== "customer" ?
                    <StaffCardHead data={controlActivity} />
                    :
                    <CustomerCardHead data={incomingQueue}/>
                }

                <div className="flex flex-wrap justify-between">
                    {authReducer.role === "customer" && (<Card title="จองคิว" bgColor="#DFD1C6" icon={<TbQrcode size="72px" className="text-[#DFD1C6] bg-white rounded-xl" />} click={() => setOpen(true)} />)}
                    {authReducer.role === "customer" && (<Card title="รายการคิว" bgColor="#BBF38F" icon={<GoListUnordered size="72px" className="text-[#BBF38F] bg-white rounded-xl" />} click={() => handlerCard("/customer-myactivity")} />)}
                    <Card title="แผนที่" bgColor="#E38181" icon={<BiMapPin size="72px" className="text-[#E38181] bg-white rounded-xl" />} click={() => handlerCard("/customer-map")} />
                    <Card title="กิจกรรมทั้งหมด" bgColor="#F7EB84" icon={<BiBookContent size="72px" className="text-[#F7EB84] bg-white rounded-xl" />} click={() => handlerCard("/customer-activity")} />
                </div>

                {authReducer.role === "customer" &&
                    <CardComment click={() => handlerCard("/customer-comment")}>
                        <BiCommentDetail className="text-white text-lg" />
                        <p className="text-white text-sm font-bold ml-2">ประวัติกิจกรรม</p>
                    </CardComment>
                }

                <input type="file" accept="image/*" capture="environment" ref={scanRef} className="hidden" />
            </BlockMobile>
        </div>
    );
}

function CustomerCardHead({ data }) {
    return (
        <CardWithHead title="คิวที่กำลังจะถึง">
            {data ?
                <div className="grid grid-cols-2 gap-4 px-2">
                    <div>
                        {/* <img src={data.image} alt="img of activity" /> */}
                    </div>
                    <div className="flex flex-col justify-between">
                        <div>
                            {/* <p className="text-xl font-bold">{data.name}</p> */}
                            {/* <p className="text-xs">{data.member} คน</p> */}
                            {/* {ready && <p className="text-accept">รอบต่อไป</p>} */}
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-xs">เวลารอคิว</p>
                                {/* <p className="text-sm">{estimateTime} นาที</p> */}
                            </div>
                            <div>
                                <p className="text-xs text-right">จำนวนคิว</p>
                                {/* <p className="text-sm text-right">{data[0].queue}/{data[0].size} คิว</p> */}
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="h-16 flex items-center">
                    <p className="text-sm">ขณะนี้ คุณยังไม่ได้จองกิจกรรมที่ต้องการเล่น</p>
                </div>
            }
        </CardWithHead>
    );
}

function StaffCardHead({ data }) {

    const navigate = useNavigate();

    return (
        <CardWithHead title="กิจกรรมหลัก">
            {
                data === null ?
                    <div className="h-16 flex items-center">
                        <p className="text-sm">กรุณาเลือกกิจกรรมหลักที่ต้องการดูแล</p>
                    </div>
                    :
                    <div className="w-[full] h-[140px] overflow-hidden relative flex flex-col justify-center items-center rounded-lg"
                        onClick={() => navigate(`/staff-scan/${data.code}`)}>
                        <img src={data.picture} alt="acitivty" />
                        <p className="bg-white py-2 px-4 rounded-lg font-bold text-fha text-sm absolute bottom-2 shadow-md">{data.name[0]}</p>
                    </div>
            }
        </CardWithHead>
    );
}

export default CustomerHome;