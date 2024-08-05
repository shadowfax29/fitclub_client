import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats, Html5QrcodeScanType } from 'html5-qrcode';
import { useDispatch } from 'react-redux';
import { validateQr } from '../../actions/ownerActions';
import Navbar1 from './navbar1';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckIn = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState('');
    const [isQrReaderActive, setIsQrReaderActive] = useState(true);
    const qrCodeRegionId = "html5qr-code-region";

    const handleSuccess = () => {
        setIsQrReaderActive(false);
        setTimeout(() => {
            setIsQrReaderActive(true);
        }, 5000);
    };

    useEffect(() => {
        if (isQrReaderActive) {
            const config = {
                fps: 10,
                qrbox: { width: 400, height: 400 },
                rememberLastUsedCamera: true,
                supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
                formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE]
            };

            const html5QrCodeScanner = new Html5QrcodeScanner(qrCodeRegionId, config, false);

            const onScanSuccess = (decodedText, decodedResult) => {
                setData(decodedText);
                console.log(`Code matched = ${decodedText}`, decodedResult);
            };

            const onScanFailure = (error) => {
                console.warn(`QR code scan error: ${error}`);
                
            };

            html5QrCodeScanner.render(onScanSuccess, onScanFailure);

            return () => {
                html5QrCodeScanner.clear().catch(error => {
                    console.error('Failed to clear QR code scanner:', error);
                });
            };
        }
    }, [isQrReaderActive]);

    useEffect(() => {
        if (data) {
            dispatch(validateQr(data, setData, handleSuccess));
        }
    }, [data, dispatch]);

    return (
        <div>
            <ToastContainer />
            <Navbar1 />
            {isQrReaderActive && (
                <div id={qrCodeRegionId} className='qrReader'></div>
            )}
        </div>
    );
};

export default CheckIn;
