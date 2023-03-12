import { QRCodeSVG } from 'qrcode.react';

function QRcode({ data }) {
    const qrDataObj = {
        activityCode: data.activityCode,
        queueId: data._id,
        size: data.size,
        diffRound: data.diffRound,
        disable: data.disable,
    }
    return (
        <QRCodeSVG
            value={JSON.stringify(qrDataObj)}
            size={224}
            bgColor={"#FFFFFF"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={true}
        />
    );
}

export default QRcode;