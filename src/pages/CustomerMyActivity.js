import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Navbar } from '../components/Navbar';
import { BlockMobile } from '../components/Block';
import { ListQueue } from '../components/List';

import { getAllQueue } from '../api/queueAPI';

function CustomerMyActivity() {
    const navigate = useNavigate();
    const authReducer = useSelector(state => state.authReducer);

    useEffect(() => {
        async function getQueue() {
            const response = await getAllQueue(authReducer.username);
            setQueueData(response);
        }
        getQueue();
    }, [authReducer])

    const [queueData, setQueueData] = useState([]);

    function handlerClick(data) {
        navigate(`/customer-myactivity/${data._id}`)
    }

    return (
        <div>
            <Navbar />
            <BlockMobile>
                <div className="flex justify-between items-end my-2">
                    <p className="">รายการคิวทั้งหมดของคุณ</p>
                    <p className="text-sm">กิจกรรมที่จอง <label>{queueData.length}</label>/5</p>
                </div>
                <div className="overflow-hidden overflow-y-auto">
                    {queueData.length ?
                        queueData.map((data) => {
                            return (
                                <ListQueue data={data} click={handlerClick} />
                            );
                        })
                        :
                        <p className="my-8 text-slate-400 text-center">คุณยังไม่มีรายการจองในขณะนี้</p>
                    }
                </div>
            </BlockMobile>
        </div>
    );
}

export default CustomerMyActivity;