import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';

const QRCodeDisplay = () => {
    const [qrCode, setQrCode] = useState('');
    const [error, setError] = useState("")
    const fetchQRCode = async () => {
        try {
            const res = await axios.get('user/generateQr', {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            });
            setQrCode(res?.data?.qrCode);
        } catch (err) {
            console.error('Failed to fetch QR code', err);
            setError(err?.response?.data?.error)
        }
    };

    useEffect(() => {
        fetchQRCode();
        const interval = setInterval(fetchQRCode, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {qrCode ? <img src={qrCode} alt="QR Code" /> : <p>{error}</p>}
        </div>
    );
};

export default QRCodeDisplay;
