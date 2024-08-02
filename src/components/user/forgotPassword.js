import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {toast,ToastContainer} from "react-toastify"

import { startForgotPassword } from "../../actions/userActions";

const ForgotPassword = () => {
    const serverErrors = useSelector((state) => {
        return state.user.serverErrors
    })
    console.log(serverErrors)



    const dispatch = useDispatch()

    const [email, setEmail] = useState("");


    const [clientError, setClientError] = useState({})
    const errors = {}
    const handleSubmit = (e) => {
        e.preventDefault();
        const resetForm = () => {

            setEmail("")


        }
        validate()
        const formData = {

            email,


        }
        if (Object.keys(errors).length === 0) {
            dispatch(startForgotPassword(formData, resetForm,toast))

            setClientError({})


        }
        else {
            setClientError(errors)
        }

    }
    const validate = () => {


        if (email.trim().length === 0) {
            errors.email = "Email is required"
        }


    }

    return (
<div className="register d-flex justify-content-center align-items-center"style={{height:"100vh"}}>
        <div>
            <form className="form-group p-4 rounded-3 fs-5" style={{backgroundColor:"#161A30",color:"white"}} onSubmit={handleSubmit}>

                <h2 >forgotPassword</h2>
                <label className="form-label" htmlFor="email">Email</label>
                {clientError && <div className="text-danger">{clientError.email}</div>}
                <input type="text" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />


                <input type="submit" className="btn btn-warning m-1" />

                <ul className="list-group text-danger">{serverErrors
                }</ul>

            </form>

        </div>
        <ToastContainer/>
        </div>

    );
}

export default ForgotPassword;
