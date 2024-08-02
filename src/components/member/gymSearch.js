import React, { useEffect, useState, useMemo } from 'react';
import axios from '../../utils/axios';
import { useAuth } from '../../context/authcontext';
import { Link, useNavigate } from 'react-router-dom';
import { UilBackspace } from '@iconscout/react-unicons';
import { Button, Card, CardBody, CardText, CardTitle, Container, Form, FormGroup, Input, Row } from 'reactstrap';
import { DataScroller } from 'primereact/datascroller';

const GymSearch = () => {
    const [query, setQuery] = useState("");
    const [gymList, setGymList] = useState([]);
    const [filteredGyms, setFilteredGyms] = useState([]);
    const { setId } = useAuth();
    const [userLocation, setUserLocation] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGyms = async () => {
            try {
                const response = await axios.get(`/user/gyms`, {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                });
                setGymList(response.data.gyms);
                setFilteredGyms(response.data.gyms);
            } catch (err) {
                console.log(err);
            }
        };
        fetchGyms();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ latitude, longitude });
            },
            (error) => {
                console.error("Error getting user location:", error);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);

        const filtered = gymList.filter(gym =>
            gym.gymName.toLowerCase().includes(value.toLowerCase()) ||
            gym.address.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredGyms(filtered);
    };

    const handleDetail = (id) => {
        setId(id);
        navigate("/gymDetail");
    };

    const toRad = (value) => value * Math.PI / 180;

    const calculateDistance = useMemo(() => {
        if (!userLocation) return () => null;

        return (cords) => {
            const { latitude: lat1, longitude: lon1 } = userLocation;
            const { lat: lat2, lng: lon2 } = cords;

            const R = 6371; // Radius of the Earth in km
            const dLat = toRad(lat2 - lat1);
            const dLon = toRad(lon2 - lon1);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                      Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // Distance in km
        };
    }, [userLocation]);

    const itemTemplate = (gym) => (
        <Card style={{ backgroundColor: "black", color: "white" }} className="m-2">
            <CardBody>
                <CardTitle tag="h5" className="fw-bold">
                    {gym.gymName}
                    <span className='m-2'>
                        <i className="pi pi-verified" style={{ color: 'slateblue' }}></i>
                    </span>
                </CardTitle>
                <CardText>{gym.address}</CardText>
                <CardText>{userLocation ? `${calculateDistance(gym.geoLocation).toFixed(2)} km` : "Calculating distance..."}</CardText>
                <Button style={{ backgroundColor: "#005B41" }} onClick={() => handleDetail(gym._id)}>More Details</Button>
            </CardBody>
        </Card>
    );

    return (
        <Container fluid className="work p-3" style={{height:"inherit"}}>
            <Link to="/memberDashBoard" className='col-1 m-3 btn'><UilBackspace size="40" color="#F6F1EE" /></Link>
            <Row className="justify-content-center">
                <h1 className='row justify-content-center text-light'>FIND GYM NEAR YOU</h1>
                <Form className='justify-content-center form-group d-flex flex-wrap'>
                    <FormGroup>
                        <Input
                            className="form-control me-2"
                            type="search"
                            placeholder="Enter your area/gym name"
                            aria-label="Search"
                            value={query}
                            onChange={handleSearch}
                        />
                    </FormGroup>
                </Form>
            </Row>


            <DataScroller value={query ? filteredGyms : gymList} itemTemplate={itemTemplate} rows={5} buffer={0.4}  className="transparent-background" />


        </Container>
    );
};

export default GymSearch;
