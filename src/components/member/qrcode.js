import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import QRCodeDisplay from './generateQr';

function QrCode({ isOpen, toggle }) {
    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader >QR Code Check-In</ModalHeader>
                <ModalBody className='m-auto'>
                   
                   
                    <QRCodeDisplay/>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" className='m-auto' onClick={toggle}>
                        OK
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default QrCode;
