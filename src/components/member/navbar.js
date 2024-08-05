import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logOut } from "../../actions/userActions";
import gym from "../images/Screenshot_2024-07-12_185824-removebg-preview.png";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { UimSlack } from '@iconscout/react-unicons-monochrome';
import MemberProfile from "./memberProfile";
import { Avatar } from 'primereact/avatar';
import { driver } from "driver.js";

export default function NavBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const letter = user.userName.toUpperCase().split("")[0];

    const handleLogOut = () => {
        dispatch(logOut());
        navigate('/login');
    };

    const handleSearch = () => {
        navigate('/gymSearch');
    };

    useEffect(() => {
        const tourShown = localStorage.getItem('tourShown');
        if (!tourShown) {
            const driverObj = driver({
                showProgress: true,
                allowClose: false,
                steps: [
                    { element: '#avatar', popover: { title: 'Profile', description: 'First, create your profile.', side: "left", align: 'start' }},
                    { element: '#gym-search', popover: { title: 'Gym Search', description: 'Use this search to find gyms.', side: "bottom", align: 'start' }},
                    { popover: { title: 'Thank You', description: 'Now you are ready to go.' } }
                ],
            });
            driverObj.drive();
            localStorage.setItem('tourShown', 'true');
        }
    }, []);

    return (
        <>
            <div className="offcanvas offcanvas-start bg-dark" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header">
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="letter-ring">{letter}</div>
                    <MemberProfile />
                    <hr className='bg-light text-light' />
                    <button onClick={handleLogOut} className="btn p-0 text-white" type="submit">Logout</button>
                </div>
            </div>
            <nav className="navbar bg-dark">
                <div className="container-fluid">
                    <Avatar id="avatar" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" icon="pi pi-user" size="large" style={{ backgroundColor: '#0F67B1', color: '#ffffff' }} shape="circle" />
                    <img src={gym} alt="gym" width="100px" />
                    <button id="gym-search" className="btn p-0" onClick={handleSearch}>
                        <UimSlack size="40" color="#912BBC" />
                        <p className="m-0 text-light">Search Gym</p>
                    </button>
                </div>
            </nav>
        </>
    );
}
