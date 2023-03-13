import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

function Html5QrcodePlugin({ handlerScanner, open, noti={error:false} }) {

    const [loading, setLoading] = useState(true);

    const html5Qrcode = useRef();

    useEffect(() => {
        if (noti.error) {
            setTimeout(() => {
                startScanner();
            }, 500);
        }
    }, [noti])

    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        handlerScanner(decodedText)
        clearScanner();
    };

    const qrCodeErrorCallback = () => { };

    const startScanner = () => {
        const config = { fps: 10 };
        html5Qrcode.current?.start(
            { facingMode: "environment" },
            config,
            qrCodeSuccessCallback,
            qrCodeErrorCallback
        );
    };

    const clearScanner = () => {
        try {
            html5Qrcode.current?.stop();
            html5Qrcode.current?.clear();
        } catch (err) { }
    };

    const init = () => {
        const html5QrCode = new Html5Qrcode("scanner-1");
        html5Qrcode.current = html5QrCode;
        setLoading(false);
    };

    useEffect(() => {
        init();
        return () => {
            clearScanner();
        };
    }, []);

    useEffect(() => {
        if (!loading && open) {
            startScanner();
        }
        if (!open) {
            clearScanner();
        }
    }, [loading, open]);

    return (
        <div id="scanner-1" />
    );
};
export default Html5QrcodePlugin;