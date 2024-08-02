import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useDispatch } from 'react-redux';
import { validateQr } from '../../actions/ownerActions';
import Navbar1 from './navbar1';
import image from "../images/Screenshot 2024-07-12 185824.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckIn = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState('');
    const [isQrReaderActive, setIsQrReaderActive] = useState(true);

    const handleSuccess = () => {
        setIsQrReaderActive(false);
        setTimeout(() => {
            setIsQrReaderActive(true);
        }, 5000);
    };

    if (data) {
        dispatch(validateQr(data, setData, handleSuccess));
    }

    return (
        <div>
            <ToastContainer />
            <Navbar1 />
            <div className='box m-5'>
                <div className='qrContainer '>
                    <div className='row justify-content-center' style={{ height: "100px" }}>
                        <img src={image} alt="" style={{ height: "150px" }} />
                    </div>
                    {isQrReaderActive && (
                        <QrReader
                            onResult={(result, error) => {
                                if (!!result) {
                                    setData(result?.text);
                                }
                                if (!!error) {
                                    console.info(error);
                                }
                            }}
                            className='qrReader'
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckIn;