import React, { useState } from 'react';
import { Button, Container, Row, Col, Modal } from 'reactstrap';
import NavBar from "./navbar";
import { UilQrcodeScan, UilDumbbell, UilInvoice, UilUtensilsAlt, UilHeart, UilPresentationCheck } from '@iconscout/react-unicons';
import QrCode from './qrcode';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function MemberDashBoard() {
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);
    const user = useSelector((state) => state.member.data);
    const navigate = useNavigate();

    const handleQr = () => setIsQrModalOpen(true);
    const toggleQrModal = () => setIsQrModalOpen(!isQrModalOpen);

    const handleNavigation = (path) => () => navigate(path);

    return (
        <Container fluid>
            <Row>
                <NavBar />
            </Row>
            <Row className="fitclub" style={{height:"70vh"}}>
            </Row>
                <Row className="justify-content-around bg-dark p-3">
                    <Col className="m-2 p-0 text-center">
                        <Button className="btn btn-dark p-0" onClick={handleQr} >
                            <UilQrcodeScan size="40" color="#03AED2" />
                            <p className="m-0 text-white">Check-In</p>
                        </Button>
                    </Col>
                    <Col className="m-2 p-0 text-center">
                        <Button className="btn btn-dark p-0" onClick={handleNavigation("/workoutSchedule")} >
                            <UilDumbbell size="40" color="#A91D3A" />
                            <p className="m-0 text-white">Schedule</p>
                        </Button>
                    </Col>
                    <Col className="m-2 p-0 text-center">
                        <Button className="btn btn-dark p-0" onClick={handleNavigation("/planDetail")}>
                            <UilInvoice size="40" color="#7AB2B2" />
                            <p className="m-0 text-white">Subscription</p>
                        </Button>
                    </Col>
                    <Col className="m-2 p-0 text-center">
                        <Button className="btn btn-dark p-0" onClick={handleNavigation("/nutrition")} >
                            <UilUtensilsAlt size="40" color="#0A6847" />
                            <p className="m-0 text-white">Diet</p>
                        </Button>
                    </Col>
                    <Col className="m-2 p-0 text-center">
                        <Button className="btn btn-dark p-0" onClick={handleNavigation("/exercise")} >
                            <UilHeart size="40" color="#803D3B" />
                            <p className="m-0 text-white">Exercise</p>
                        </Button>
                    </Col>
                    <Col className="m-2 p-0 text-center">
                        <Button className="btn btn-dark p-0" onClick={handleNavigation("/attendace")}>
                            <UilPresentationCheck size="40" color="#FFD1E3" />
                            <p className="m-0 text-white">Attendance</p>
                        </Button>
                    </Col>
                </Row>
            
            <QrCode isOpen={isQrModalOpen} toggle={toggleQrModal} />
        </Container>
    );
}
