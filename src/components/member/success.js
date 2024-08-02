import React, { useEffect } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'; 
import axios from '../../utils/axios';
import { useAuth } from '../../context/authcontext';

export default function Success() {
 const id=localStorage.getItem("session")
  useEffect(()=>{
   
    const post=async()=>{
      try{
        const response=await axios.put(`/paymentDetail/${id}`,{status:"Success"},{
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
    <div className="d-flex min-vh-100 flex-column align-items-center justify-content-center bg-light px-4 py-12 sm-px-6 lg-px-8">
      <Container className="text-center">
        <Row className="justify-content-center">
          <Col md="auto">
            <CircleCheckIcon className="mx-auto mb-4" />
            <h1 className="mb-4 h3 font-weight-bold">Payment Successful!</h1>
            <p className="mb-4 text-muted">
              Your payment was processed successfully. Thank you for your business.
            </p>
            <Link to="/memberDashBoard">
              <Button color="primary" className="px-4 py-2">
                go back
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-success"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
