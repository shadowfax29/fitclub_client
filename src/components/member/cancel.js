import React, { useEffect } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'; 
import { useAuth } from '../../context/authcontext';
import axios from '../../utils/axios';

export default function Cancel() {
  const id=localStorage.getItem("session")

  useEffect(()=>{
   
    const post=async()=>{
      try{
        const response=await axios.put(`/paymentDetail/${id}`,{status:"Failed"},{
          headers: {
            Authorization:localStorage.getItem("token")
          }
        })
      }
      catch(err){
      console.log(err)
      }
    }
   post()
  },[])
  return (
    <div className="d-flex min-vh-100 flex-column align-items-center justify-content-center bg-light px-4 py-5 sm-px-6 lg-px-8">
      <Container className="text-center">
        <Row className="justify-content-center">
          <Col md="auto">
            <CircleXIcon className="mx-auto mb-4" />
            <h1 className="mb-4 h3 font-weight-bold">Payment Failed</h1>
            <p className="mb-4 text-muted">
              There was an issue processing your payment. Please try again or contact support for assistance.
            </p>
            <Link to="/gymSearch">
              <Button color="primary" className="px-4 py-2">
                Try Again
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function CircleXIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-danger"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}
