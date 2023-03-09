import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Navbar } from '../components/Navbar'
import { BlockMobile } from '../components/Block'
import { CardWithHead } from '../components/Card';
import { ModalUnBookQueue } from '../components/Modal';
import QRcode from '../components/QRcode';

import { getOneQueue, unBookQueue } from '../api/queueAPI';

function CustomerBookQueue() {

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getQueue() {
            const response = await getOneQueue(id);
            setData(response);
        }
        getQueue();
    }, [id])

    const [data, setData] = useState(null);
    const [modal, setModal] = useState(false);

    function handlerUnBook() {
        unBookQueue({ queueId: id, }).then(() => navigate("/customer-myactivity"));
    }

    return (
        <div>
            <Navbar />
            <ModalUnBookQueue state={modal} setState={setModal} click={handlerUnBook} />
            <BlockMobile>
                {data &&
                    <CardWithHead title="กิจกรรม">
                        <div className="flex flex-col items-center relative">
                            <p className="font-bold">{data.activityName[0]}</p>
                            <p>คิวที่ : {data.queueNo}</p>
                            <QRcode data={data} />
                            <div className="mt-2">
                                <p className="">จำนวนผู้เข้าร่วม : <label className="text-accept">{data.size}</label> คน</p>
                                <p>สถานะ : <label className={`${!data.diffRound ? "text-accept" : "text-decline"}`}>{!data.diffRound ? "ถึงคิวของคุณแล้ว" : "ไม่ยังถึงคิวของคุณ"}</label></p>
                                <p className="text-sm mt-6 text-decline">*กรุณายื่น QR-code ให้พนักงานแสกนก่อนเข้าร่วมกิจกรรม*</p>
                            </div>

                            <p className="p-1 text-xs text-decline rounded-md absolute top-0 right-2 border border-decline" onClick={() => setModal(true)}>ยกเลิกการจอง</p>

                        </div>
                    </CardWithHead>
                }
            </BlockMobile>
        </div>
    );
}

export default CustomerBookQueue;