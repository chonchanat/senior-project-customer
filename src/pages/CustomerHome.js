import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Navbar } from '../components/Navbar'
import { BlockMobile } from '../components/Block';
import { Card, CardWithHead, CardComment } from '../components/Card';
import { ListQueue } from '../components/List';
import Scanner from '../components/qrCode/Scanner';

import { TbQrcode } from 'react-icons/tb';
import { GoListUnordered } from 'react-icons/go';
import { BiBookContent, BiMapPin, BiCommentDetail } from 'react-icons/bi';

import { getOneActivity } from "../api/activityAPI";
import { getIncomingQueue } from '../api/queueAPI';

import Cookies from 'js-cookie';
function CustomerHome() {

    const navigate = useNavigate();
    const authReducer = useSelector(state => state.authReducer);

    const scanRef = useRef();
    const [open, setOpen] = useState(false);
    const [controlActivity, setControlActivity] = useState(null);
    const [incomingQueue, setIncomingQueue] = useState(null);
    const [noti, setNoti] = useState({ message: "", error: false });

    useEffect(() => {
        async function getControlActivity() {
            const controlActivityCookie = Cookies.get('controlActivityCookie')
            if (controlActivityCookie === undefined) return;
            const response = await getOneActivity(controlActivityCookie);
            setControlActivity(response);
        }
        async function getIncomingQueueData() {
            const response = await getIncomingQueue(authReducer.username);
            setIncomingQueue(response)
        }

        if (authReducer.role === "customer") {
            getIncomingQueueData();
        }
        else getControlActivity();

    }, [authReducer])

    function handlerQueue(data) {
        navigate(`/customer-myactivity/${data._id}`)
    }
    function handlerCard(link) {
        navigate(link);
    }
    function handlerScanner(data) {
        const regexCheck = /^[A-Z]\d{4}$/;
        const web = "https://quedeeproj.web.app/customer-scan/";
        if (data.includes(web)) {
            const code = data.split("/").pop();
            if (regexCheck.test(code)) {
                navigate(`/customer-scan/${code}`);
            } else setNoti({ message: "QR Code ไม่ถูกต้อง", error: true });
        } else {
            setNoti({ message: "QR Code ไม่ถูกต้อง", error: true });
        }
    }

    return (
        <div>
            <Navbar />
            <Scanner open={open} setOpen={setOpen} handlerScanner={handlerScanner} noti={noti} />
            <BlockMobile>

                {authReducer.role !== "customer" ?
                    <StaffCardHead data={controlActivity} />
                    :
                    <CustomerCardHead data={incomingQueue} click={handlerQueue} />
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
                        <p className="text-white text-sm ml-2">ประวัติกิจกรรม</p>
                    </CardComment>
                }

                <input type="file" accept="image/*" capture="environment" ref={scanRef} className="hidden" />
            </BlockMobile>
        </div>
    );
}

function CustomerCardHead({ data, click }) {
    return (
        <CardWithHead title="คิวที่กำลังจะถึง">
            {data ?
                <ListQueue data={data} click={click} />
                :
                <div className="h-16 flex items-center justify-center">
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
                    <div className="h-16 flex items-center justify-center">
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