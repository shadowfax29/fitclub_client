import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Container, Row, Col } from 'reactstrap';
import axios from '../../utils/axios';
import Navbar1 from './navbar1';
import {toast,ToastContainer} from 'react-toastify'
const AnnouncementForm = () => {
    const [title,setTitle]=useState("")
    const [content,setContent]=useState("")
    const resetForm=()=>{
      setTitle("")
                setContent("")
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(title.trim()!=""&&content.trim()!=""){
            const data={title,content}
            try{
                const res=await axios.post("/announcement",data,{
                    headers: {
                        Authorization:localStorage.getItem("token")
                    }
                })
                resetForm()
                toast.success("Announcement sent")
            }
            catch(err){
                console.log(err)
                resetForm()
                toast.error("Something went wrong")
            }

        }
        else{
            alert("Please fill all the fields")
        }
    }
  return (
    <section className="w-100 ">
        <Navbar1/>
      <Container className="max-w-2xl px-4">
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <div className="mb-4">
              <h2 className="font-weight-bold">Make an Announcement</h2>
              <p className="text-muted">Share important updates with your team or community.</p>
            </div>
            <Form onSubmit={handleSubmit} className="space-y-4">
              <FormGroup>
                <Label for="title" className="sr-only">Announcement Title</Label>
                <Input type="text" value={title}name="title" id="title" placeholder="Announcement Title" className="w-100" onChange={(e)=>(setTitle(e.target.value))}/>
              </FormGroup>
              <FormGroup>
                <Label for="content" className="sr-only">Announcement Content</Label>
                <Input type="textarea" name="content" value={content} id="content" placeholder="Announcement Content" onChange={(e)=>(setContent(e.target.value))} className="w-100"  />
              </FormGroup>
              <Button style={{backgroundColor:"#088395"}} type="submit" className="w-100">
                Submit Announcement
              </Button>
            </Form>
          </Col>
        </Row>
        <ToastContainer/>
      </Container>
    </section>
  );
};

export default AnnouncementForm;
