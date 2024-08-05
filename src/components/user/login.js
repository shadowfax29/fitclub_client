import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom"
import workoutImage from '../images/workout_3271136.png'
import { Link } from "react-router-dom";
import { startLogin } from "../../actions/userActions";
import Loading from "../../loading";

const Login = () => {
    const serverErrors = useSelector((state) => {
        return state.user.serverErrors
    })
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [clientError, setClientError] = useState({})
    const errors = {}
    const handleSubmit = (e) => {
        e.preventDefault();
        const resetForm = () => {

            setEmail("")
            setPassword("")

        }
        validate()
        const formData = {

            email,
            password,

        }
        if (Object.keys(errors).length === 0) {
            dispatch(startLogin(formData, resetForm, setLoading, navigate))

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
        if (password.trim().length === 0) {
            errors.password = "Password is required"
        }

    }
    if (loading) {
        return (<Loading />)
    }
    
    return (
<div className="register d-flex justify-content-center align-items-center"style={{height:"100vh"}}>

        <div >
            <form onSubmit={handleSubmit}>



            <div className="form-group p-4 rounded-3 fs-5" style={{backgroundColor:"#161A30",color:"white"}}>
                    <h2 >Login<span><img className="m-2" src={workoutImage} width="30px" alt=".." /></span></h2>
                    <label className="form-label" htmlFor="email">Email</label>
                    {clientError && <div className="text-danger">{clientError.email}</div>}
                    <input type="text" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />


                    <label className="form-label" htmlFor="password">Password</label>{clientError && <div className="text-danger">{clientError.password}</div>}
                    <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="submit" className="btn btn-warning m-1" />
                    <p>want to create account? <Link style={{ textDecoration: "none", color: "inherit" }} to={"/"}>Register</Link></p>
                    <Link style={{ textDecoration: "none", color: "inherit" }} to={"/forgotPassword"}>ForgotPassword?</Link>
                    <ul className="list-group text-danger">
                        {serverErrors?.errors?.length ? (
                            serverErrors.errors.map((ele, i) => <li key={i}>{ele.msg}</li>)
                        ) : serverErrors?.error ? (
                            <li>{serverErrors.error}</li>
                        ) : null}
                    </ul>
                </div>
            </form>
        </div>
        </div>
    );
}

export default Login;
