import { useSelector } from 'react-redux';

import { Navbar } from '../components/Navbar'
import { BlockMobile } from '../components/Block'

import QRcode from '../components/QRcode';

function CustomerBookQueue() {

    const queueReducer = useSelector(state => state.queueReducer);

    return (
        <div>
            <Navbar />
            <BlockMobile>
                <QRcode data={queueReducer} />
            </BlockMobile>
        </div>
    );
}

export default CustomerBookQueue;