import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useAuth } from "../../context/authcontext";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import home from "../images/home-button.png"
import 'leaflet/dist/leaflet.css';
import { Link } from "react-router-dom";
import { UilBackspace } from '@iconscout/react-unicons';
import DateRange from "./daterange";
import { toast, ToastContainer } from "react-toastify";

const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
   
});



L.Marker.prototype.options.icon = DefaultIcon;

const GymDetail = () => {
    const { id } = useAuth();
    const [detail, setDetail] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState(null);
    const [myLoc, setMyLoc] = useState({ lat: 0, lng: 0 });

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`/user/gymDetail/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                setDetail(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetch();

        // Get user's current location
        navigator.geolocation.getCurrentPosition(position => {
            setMyLoc({ lat: position.coords.latitude, lng: position.coords.longitude });
        });
    }, [id]);

    const handleCheckOut = (subId, ele) => {
        if(localStorage.getItem("session")){
            toast.warning("already plan exists")
        }
        else{

            setSelectedSubscription({ subId, ele });
            setModalOpen(true);
        }
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <Container fluid>
            <ToastContainer/>
            <Row style={{ backgroundColor: "#9290C3" }} className="text-white text-center py-5">
                <Col>
                    <Link to={"/gymSearch"} className='col-1 m-3 btn float-start'><UilBackspace size="40" color="#492E87" /></Link>
                    <h1>{detail?.gymName?.toUpperCase()}</h1>
                    <p>Experience the ultimate workout at our state-of-the-art gym.</p>
                </Col>
            </Row>
            <Row className="bg-light text-center py-5">
                <Col md={6}>
                    <h3 className="text-dark">Location <span><svg width="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></span></h3>
                    <p>{detail?.address}</p>
                </Col>
                <Col md={6}>
                    <h3 className="text-dark">Hours <span><svg fill="#000000" width="20px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M14.6,21.3c-.3.226-.619.464-.89.7H16a1,1,0,0,1,0,2H12a1,1,0,0,1-1-1c0-1.5,1.275-2.456,2.4-3.3.75-.562,1.6-1.2,1.6-1.7a1,1,0,0,0-2,0,1,1,0,0,1-2,0,3,3,0,0,1,6,0C17,19.5,15.725,20.456,14.6,21.3ZM23,15a1,1,0,0,0-1,1v3H21a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v2a3,3,0,0,0,3,3h1v2a1,1,0,0,0,2,0V16A1,1,0,0,0,23,15ZM13,12V7a1,1,0,0,0-2,0v4H8a1,1,0,0,0,0,2h4A1,1,0,0,0,13,12ZM23,2a1,1,0,0,0-1,1V5.374A12,12,0,1,0,7.636,23.182,1.015,1.015,0,0,0,8,23.25a1,1,0,0,0,.364-1.932A10,10,0,1,1,20.636,7H18a1,1,0,0,0,0,2h3a3,3,0,0,0,3-3V3A1,1,0,0,0,23,2Z"></path></g></svg></span></h3>
                    <p>Monday - Friday: {detail?.timing?.mon_fri}</p>
                    <p>Saturday - Sunday: {detail?.timing?.sat_sun}</p>
                </Col>
            </Row>
            <Row className="py-5">
                <Col md={12}>
                    {detail && detail.geoLocation && (
                        <MapContainer center={[detail?.geoLocation?.lat, detail?.geoLocation?.lng]} zoom={13} style={{ height: "400px", width: "100%" }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[detail?.geoLocation?.lat, detail?.geoLocation?.lng]}>
                                <Popup>Here is the gym</Popup>
                            </Marker>
                            <Marker position={[myLoc.lat, myLoc.lng]} >
                                <Popup>This is my location</Popup>
                            </Marker>
                        </MapContainer>
                    )}
                </Col>
            </Row>
            <Row className="text-center">
                <Col>
                    <h2 className="text-dark">Explore Our Gym</h2>
                </Col>
            </Row>
            <Row className="justify-content-center">
                {detail?.images?.map((ele, i) => (
                    <Col md={3} key={i} className="my-3">
                        <Card className="h-100 shadow-lg p-3 mb-5 bg-dark rounded-5">
                            <img src={ele.img} alt="00" className="card-img-top rounded-5" />
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row className="text-center">
                <Col>
                    <h2 className="text-dark">Subscription Plans</h2>
                </Col>
            </Row>
            <Row className="justify-content-center">
                {detail?.subscription?.map((ele, i) => (
                    <Col md={3} key={i} className="my-3">
                        <Card className="h-100 shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                            <CardBody className="d-flex flex-column align-items-center">
                                <div className="d-flex">
                                    <h1 className="fw-bold fs-1 d-flex flex-column" style={{ color: ele.duration == 6 ? '#0B60B0' : ele.duration == 12 ? "#DA7297" : ele.duration == 3 ? "#973131" : "" }}>
                                        {ele.duration}
                                        <span><CardTitle className="fw-bold"> MONTHS</CardTitle></span>
                                    </h1>
                                    <CardText className="fs-2">&#x20b9;{ele.amount}</CardText>
                                </div>
                                <ul className="text-left">
                                    {ele.benefits.map((el, j) => (
                                        <li key={j}>{el}</li>
                                    ))}
                                </ul>
                                <Button style={{ backgroundColor: "#836FFF" }} onClick={() => {
                                    handleCheckOut(ele._id, ele);
                                }} className="mt-auto">Buy Now</Button>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
            <DateRange
                open={modalOpen}
                subId={selectedSubscription?.subId}
                ele={selectedSubscription?.ele}
                detail={detail}
                toggleModal={toggleModal}
            />
        </Container>
    );
};

export default GymDetail;
