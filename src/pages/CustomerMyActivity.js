import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setQueue } from '../actions/queueActions'

import { Navbar } from '../components/Navbar';
import { BlockMobile } from '../components/Block';
import { MobileList } from '../components/Table';

import MyActivityData from '../fakeData/MyActivityData';

function CustomerMyActivity() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handlerClick(activityData) {
        dispatch(setQueue(activityData))
        navigate(`/customer-myactivity/${activityData.id}`)
    }

    return (
        <div>
            <Navbar />
            <BlockMobile>
                <div className="flex justify-between items-end my-2">
                <p className="">รายการคิวทั้งหมดของคุณ</p>
                <p className="text-sm">กิจกรรมที่จอง 4/5</p>
                </div>
                <div className="overflow-hidden overflow-y-auto">
                    {MyActivityData.map((data) => {
                        return (
                            <MobileList MyActivity={data} click={handlerClick}/>
                        );
                    })}
                </div>
            </BlockMobile>
        </div>
    );
}

export default CustomerMyActivity;