import { useSelector } from 'react-redux';

import { Navbar } from '../components/Navbar'
import { BlockMobile } from '../components/Block';
import { Card, CardWithHead } from '../components/Card';

import MyActivityData from '../fakeData/MyActivityData';

import { TbQrcode } from 'react-icons/tb';
import { GoListUnordered } from 'react-icons/go';
import { BiBookContent, BiMapPin } from 'react-icons/bi';

function CustomerHome() {

    const authReducer = useSelector(state => state.authReducer)
    console.log(authReducer)
    const estimateTime = Math.ceil(MyActivityData[0].queue / MyActivityData[0].size) * MyActivityData[0].duration;

    return (
        <div>
            <Navbar />
            <BlockMobile>
                {
                    MyActivityData.length &&
                    <CardWithHead title={"คิวที่กำลังจะถึง"}>
                        <div className="grid grid-cols-2 gap-4 px-2">
                            <div>
                                <img src={MyActivityData[0].image} alt="img of activity" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <div>
                                    <p className="text-xl font-bold">{MyActivityData[0].name}</p>
                                    <p className="text-xs">จำนวนผู้เข้าร่วม {MyActivityData[0].member} คน</p>
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-xs">เวลารอคิว</p>
                                        <p className="text-sm">{estimateTime} นาที</p>
                                    </div>
                                    <div>
                                        <p className="text-xs">จำนวนคิว</p>
                                        <p className="text-sm text-right">{MyActivityData[0].queue} คิว</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardWithHead>
                }
                <div className="flex flex-wrap justify-between">
                    <Card title="จองคิว" bgColor="#DFD1C6" link="/customer-scan" icon={<TbQrcode size="72px" className="text-[#DFD1C6] bg-white rounded-xl" />} />
                    <Card title="รายการคิว" bgColor="#BBF38F" link="/customer-myactivity" icon={<GoListUnordered size="72px" className="text-[#BBF38F] bg-white rounded-xl" />} />
                    <Card title="แผนที่" bgColor="#E38181" link="/customer-map" icon={<BiMapPin size="72px" className="text-[#E38181] bg-white rounded-xl" />} />
                    <Card title="กิจกรรมทั้งหมด" bgColor="#F7EB84" link="/customer-activity" icon={<BiBookContent size="72px" className="text-[#F7EB84] bg-white rounded-xl" />} />
                </div>
                {/* <input type="file" accept="image/*" capture="environment"></input> */}
            </BlockMobile>
        </div>
    );
}

export default CustomerHome;