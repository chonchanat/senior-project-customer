import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
    const dispatch = useDispatch();

    const scanRef = useRef();
    const [open, setOpen] = useState(false);

    function handlerClick(activityData) {
        dispatch(setQueue(activityData))
        navigate(`/customer-myactivity/${activityData.id}`)
    }
    function handlerCard(link) {
        navigate(link);
    }
    function handlerScanner(data) {
        const code = data.split("/").pop();
        navigate(`/customer-scan/${code}`);
    }

    const estimateTime = Math.ceil(MyActivityData[0].queue / MyActivityData[0].size) * MyActivityData[0].duration;
    const ready = Math.ceil(MyActivityData[0].queue / MyActivityData[0].size);

    return (
        <div>
            <Navbar />
            <Scanner open={open} setOpen={setOpen} handlerScanner={handlerScanner}/>
            <BlockMobile>
                {
                    MyActivityData.length &&
                    <CardWithHead title={"คิวที่กำลังจะถึง"}>
                        <div className="grid grid-cols-2 gap-4 px-2" onClick={() => handlerClick(MyActivityData[0])}>
                            <div>
                                <img src={MyActivityData[0].image} alt="img of activity" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <div>
                                    <p className="text-xl font-bold">{MyActivityData[0].name}</p>
                                    <p className="text-xs">{MyActivityData[0].member} คน</p>
                                    {ready && <p className="text-accept">รอบต่อไป</p>}
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-xs">เวลารอคิว</p>
                                        <p className="text-sm">{estimateTime} นาที</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-right">จำนวนคิว</p>
                                        <p className="text-sm text-right">{MyActivityData[0].queue}/{MyActivityData[0].size} คิว</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardWithHead>
                }
                <div className="flex flex-wrap justify-between">
                    <Card title="จองคิว" bgColor="#DFD1C6" icon={<TbQrcode size="72px" className="text-[#DFD1C6] bg-white rounded-xl" />} click={() => setOpen(true)} />
                    <Card title="รายการคิว" bgColor="#BBF38F" icon={<GoListUnordered size="72px" className="text-[#BBF38F] bg-white rounded-xl" />} click={() => handlerCard("/customer-myactivity")} />
                    <Card title="แผนที่" bgColor="#E38181" icon={<BiMapPin size="72px" className="text-[#E38181] bg-white rounded-xl" />} click={() => handlerCard("/customer-map")} />
                    <Card title="กิจกรรมทั้งหมด" bgColor="#F7EB84" icon={<BiBookContent size="72px" className="text-[#F7EB84] bg-white rounded-xl" />} click={() => handlerCard("/customer-activity")} />
                </div>
                <CardComment icon={<BiBookContent size="72px" className="text-[#F7EB84] bg-white rounded-xl" />} click={() => handlerCard("/customer-comment")}>
                    <BiCommentDetail className="text-white text-xl"/>
                    <p className="text-white font-bold ml-2">รีวิวกิจกรรม</p>
                </CardComment>

                <input type="file" accept="image/*" capture="environment" ref={scanRef} className="hidden" />
            </BlockMobile>
        </div>
    );
}

export default CustomerHome;