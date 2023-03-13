import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Navbar } from '../components/Navbar';
import { BlockMobile } from '../components/Block';
import { ListQueue } from '../components/List';
import Divider from '../components/Divider';

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

    function compare(a, b) {
        const timeA = a.diffRound * a.duration;
        const timeB = b.diffRound * b.duration;
        if (timeA < timeB) {
            return -1;
        }
        if (timeA > timeB) {
            return 1;
        }
        return 0;
    }

    function handlerClick(data) {
        navigate(`/customer-myactivity/${data._id}`)
    }

    return (
        <div>
            <Navbar />
            <BlockMobile>
                <p className="my-2">รายการคิวทั้งหมดของคุณ</p>
                <div className="overflow-hidden overflow-y-auto">
                    {queueData ?
                        queueData
                            .sort(compare)
                            .map((data) => {
                                return (
                                    <div>
                                        <ListQueue data={data} click={handlerClick} />
                                        <Divider />
                                    </div>
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