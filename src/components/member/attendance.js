import React, { useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import axios from '../../utils/axios';
import { DataScroller } from 'primereact/datascroller';
import { Link } from 'react-router-dom';
import { UilBackspace } from '@iconscout/react-unicons';


export default function AttendanceComponent() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get('/attendance', {
          headers: {
            authorization: localStorage.getItem("token")
          }
        });
       
        setAttendance(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAttendance();
  }, []);

  const formatDate = (time) => {
    const date = new Date(time);
    const formattedDate = date.toDateString().slice(4, 10); 
    const formattedTime = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }); 
    return `${formattedDate} ${formattedTime}`;
  };

  const itemTemplate = (att) => {
    return (
      <div className="col-12">
        <Card className="mb-2 bg-light text-dark rounded-4 shadow-sm" >
          <CardBody className="d-flex justify-content-around align-items-center">
            <div>
              <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#6EACDA",width:"50px" }}>
                <i className="pi pi-clock"></i>
              </div>
              <div>{formatDate(att.checkIn)}</div>
            </div>
            <div className='d-flex flex-column align-items-center'>
              <p className='text-success fw-bold m-2'>COMPLETED</p>
              <p className='m-2'>Workout</p>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  };

  return (
    <div className="bg-light rounded-lg border  w-full">
      <Link to="/memberDashBoard" className='col-1 m-3 btn'><UilBackspace size="40" color="#021526" /></Link>
      <div className="card">
        <DataScroller value={attendance} itemTemplate={itemTemplate} rows={5} buffer={0.4} header="Attendance Records"  />
      </div>
    </div>
  );
}
