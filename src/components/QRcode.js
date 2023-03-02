import { QRCodeSVG } from 'qrcode.react';

function QRcode({ data }) {
    return (
        <QRCodeSVG
            value={JSON.stringify(data._id)}
            size={224}
            bgColor={"#FFFFFF"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={true}
        />
    );
}

export default QRcode;