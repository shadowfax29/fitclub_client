import React, { useEffect, useRef, useState } from 'react';
import axios from '../../utils/axios';
import { Panel } from 'primereact/panel';
import Navbar1 from './navbar1';


const Members = () => {
    const [members, setMembers] = useState([]);
    const ref = useRef(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get("/gymMembers", {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                });
                setMembers(res?.data?.invoiceresult);
            } catch (err) {
                console.log(err);
            }
        };
        fetch();
    }, []);

    const formatDate = (data) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(data).toLocaleDateString('en-CA', options);
    }

    return (
        <div style={{ height: "100vh", backgroundColor: "#2C2C2C", color: "#FFFFFF" }}>
            <Navbar1 />
            <div className="container">
                <div className='row justify-content-around p-2'>
                    {members?.length > 0 ? (
                        members.map((ele, i) => (
                            <div className="col-12 col-md-6 col-lg-4 mb-3" key={i}>
                                <Panel header={ele?.memberId?.userName} style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }} ref={ref} toggleable>
                                    <div className="panel-content">
                                        <p className="mb-2"><strong>Start:</strong> {ele?.start}</p>
                                        <p className="mb-2"><strong>End:</strong> {formatDate(ele?.end)}</p>
                                        <p className="mb-2"><strong>Duration:</strong> {ele?.duration} MONTHS</p>
                                    </div>
                                </Panel>
                            </div>
                        ))
                    ) : (
                        <h1 className="text-center">No members</h1>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Members;
