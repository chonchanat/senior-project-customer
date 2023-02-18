import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setQueue } from '../actions/queueActions';

import { Navbar } from '../components/Navbar'
import { BlockMobile } from '../components/Block';
import { Card, CardWithHead, CardComment } from '../components/Card';

import MyActivityData from '../fakeData/MyActivityData';

import { TbQrcode } from 'react-icons/tb';
import { GoListUnordered } from 'react-icons/go';
import { BiBookContent, BiMapPin, BiCommentDetail } from 'react-icons/bi';
import Scanner from '../components/qrCode/Scanner';

function CustomerHome() {

    const navigate = useNavigate();
    const authReducer = useSelector(state => state.authReducer);

    const scanRef = useRef();
    const [open, setOpen] = useState(false);

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
                
                <CardHead activityData={MyActivityData}/>

                <div className="flex flex-wrap justify-between">
                    {authReducer.role === "customer" && (<Card title="จองคิว" bgColor="#DFD1C6" icon={<TbQrcode size="72px" className="text-[#DFD1C6] bg-white rounded-xl" />} click={() => setOpen(true)} />)}
                    {authReducer.role === "customer" && (<Card title="รายการคิว" bgColor="#BBF38F" icon={<GoListUnordered size="72px" className="text-[#BBF38F] bg-white rounded-xl" />} click={() => handlerCard("/customer-myactivity")} />)}
                    <Card title="แผนที่" bgColor="#E38181" icon={<BiMapPin size="72px" className="text-[#E38181] bg-white rounded-xl" />} click={() => handlerCard("/customer-map")} />
                    <Card title="กิจกรรมทั้งหมด" bgColor="#F7EB84" icon={<BiBookContent size="72px" className="text-[#F7EB84] bg-white rounded-xl" />} click={() => handlerCard("/customer-activity")} />
                </div>

                <CardComment click={() => handlerCard("/customer-comment")}>
                    <BiCommentDetail className="text-white text-lg" />
                    <p className="text-white text-sm font-bold ml-2">รีวิวกิจกรรม</p>
                </CardComment>

                <input type="file" accept="image/*" capture="environment" ref={scanRef} className="hidden" />
            </BlockMobile>
        </div>
    );
}

function CardHead({ activityData }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authReducer = useSelector(state => state.authReducer);

    const estimateTime = Math.ceil(activityData[0].queue / activityData[0].size) * activityData[0].duration;
    const ready = Math.ceil(activityData[0].queue / activityData[0].size);

    function handlerClick(activityData) {
        dispatch(setQueue(activityData))
        navigate(`/customer-myactivity/${activityData.id}`)
    }

    return (
        authReducer.role === "customer" ?
        activityData.length &&
            <CardWithHead title="คิวที่กำลังจะถึง">
                {activityData.length === 0 ?
                    <div className="h-16 flex items-center">
                        <p className="text-sm">ขณะนี้ คุณยังไม่ได้จองกิจกรรมที่ต้องการเล่น</p>
                    </div>
                    :
                    <div className="grid grid-cols-2 gap-4 px-2" onClick={() => handlerClick(activityData[0])}>
                        <div>
                            <img src={activityData[0].image} alt="img of activity" />
                        </div>
                        <div className="flex flex-col justify-between">
                            <div>
                                <p className="text-xl font-bold">{activityData[0].name}</p>
                                <p className="text-xs">{activityData[0].member} คน</p>
                                {ready && <p className="text-accept">รอบต่อไป</p>}
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-xs">เวลารอคิว</p>
                                    <p className="text-sm">{estimateTime} นาที</p>
                                </div>
                                <div>
                                    <p className="text-xs text-right">จำนวนคิว</p>
                                    <p className="text-sm text-right">{activityData[0].queue}/{activityData[0].size} คิว</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </CardWithHead>
            :
            <CardWithHead title="กิจกรรมหลัก">
                <div className="h-16 flex items-center">
                    <p className="text-sm">กรุณาเลือกกิจกรรมหลักที่ต้องการดูแล</p>
                </div>
            </CardWithHead>

    );
}

export default CustomerHome;