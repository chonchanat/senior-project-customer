import { QRCodeSVG } from 'qrcode.react';

import { CardWithHead } from './Card';

function QRcode({ data }) {
    return (
        <div>
            {data &&
            <div>
                <CardWithHead title="กิจกรรม">
                    <p className="font-bold">{data.activityName[0]}</p>
                    <p>คิวที่ : {data.queueNo}</p>
                    <QRCodeSVG
                        value={JSON.stringify(data._id)}
                        size={224}
                        bgColor={"#FFFFFF"}
                        fgColor={"#000000"}
                        level={"L"}
                        includeMargin={true}
                    />
                    <div className="mt-2">
                        <p className="">จำนวนผู้เข้าร่วม : <label className="text-accept">{data.size}</label> คน</p>
                        <p>สถานะ : <label className={`${data.status !== "wait" ? "text-accept" : "text-decline"}`}>{data.status !== "wait" ? "ถึงคิวของคุณแล้ว" : "ไม่ยังถึงคิวของคุณ"}</label></p>
                        <p className="text-sm mt-6 text-decline">*กรุณายื่น QR-code ให้พนักงานแสกนก่อนเข้าร่วมกิจกรรม*</p>
                    </div>
                </CardWithHead>
                </div>
            }
        </div>
    );
}

export default QRcode;