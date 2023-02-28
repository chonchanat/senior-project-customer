import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Navbar } from '../components/Navbar'
import { BlockMobile } from '../components/Block'

import QRcode from '../components/QRcode';

import { getOneQueue } from '../api/queueAPI';

function CustomerBookQueue() {

    const { id } = useParams();

    const queueReducer = useSelector(state => state.queueReducer);

    useEffect(() => {
        async function getQueue() {
            const response = await getOneQueue(id);
            setQueueData(response);
        }
        getQueue();
    }, [])

    const [ queueData, setQueueData] = useState(null);

    return (
        <div>
            <Navbar />
            <BlockMobile>
                <QRcode data={queueData} />
            </BlockMobile>
        </div>
    );
}

export default CustomerBookQueue;