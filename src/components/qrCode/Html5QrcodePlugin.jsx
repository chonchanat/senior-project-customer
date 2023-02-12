import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

function Html5QrcodePlugin({handlerScanner}) {

    const [loading, setLoading] = useState(true);
    const [scanResult, setScanResult] = useState("");

    const html5Qrcode = useRef();

    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        setScanResult(decodedText);
        handlerScanner(decodedText);
        clearScanner();
        setTimeout(() => {
            startScanner();
        }, 1000)
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
        if (!loading) {
            startScanner();
        }
    }, [loading]);

    return (
        <div>
            <div className="" id="scanner-1" />
            <p>{scanResult}</p>
        </div>
    );
};
export default Html5QrcodePlugin;