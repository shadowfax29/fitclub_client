import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import workoutImage from '../images/workout_3271136.png';
import { startRegister } from "../../actions/userActions";
import axios from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../loading";
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
    const serverErrors = useSelector((state) => state.user.serverErrors);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [version, setVersion] = useState(0);
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [role, setRole] = useState("");
    const [clientError, setClientError] = useState({});
    const errors = {};

    const handleSubmit = (e) => {
        e.preventDefault();
        const resetForm = () => {
            setUserName("");
            setEmail("");
            setPassword("");
            setMobileNumber("");
            setRole("");
        };
        validate();
        const formData = {
            userName,
            email,
            password,
            mobileNumber,
            role
        };
        if (Object.keys(errors).length === 0) {
            setLoading(true);
            dispatch(startRegister(formData, resetForm, setVersion, setLoading, navigate, toast));
            setClientError({});
        } else {
            setClientError(errors);
        }
    };

    const validate = () => {
        if (userName.trim().length === 0) {
            errors.userName = "User Name is required";
        }
        if (email.trim().length === 0) {
            errors.email = "Email is required";
        }
        if (password.trim().length === 0) {
            errors.password = "Password is required";
        }
        if (mobileNumber.trim().length === 0) {
            errors.mobileNumber = "Mobile Number is required";
        }
        if (role.trim().length === 0) {
            errors.role = "Role is required";
        }
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const count = await axios.get("/userCount");
                setCount(count.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetch();
    }, [version]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="register d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group p-4 rounded-3 fs-5 " style={{ backgroundColor: "#161A30", color: "white" }}>
                        <h2>Register<span><img className="m-2" src={workoutImage} width="30px" alt="img" /></span></h2>
                        <label className="form-label" htmlFor="userName">Username</label>
                        {clientError.userName && <div className="text-danger">{clientError.userName}</div>}
                        <input type="text" id="userName" className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)} />

                        <label className="form-label" htmlFor="email">Email</label>
                        {clientError.email && <div className="text-danger">{clientError.email}</div>}
                        <input type="text" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <div className="form-check">
                            <input type="radio" id="member" name="role" className="form-check-input" value="Member" onChange={(e) => setRole(e.target.value)} />
                            <label className="form-check-label" htmlFor="member">Member</label>
                        </div>
                        <div className="form-check">
                            <input type="radio" id="owner" name="role" className="form-check-input" value="Owner" onChange={(e) => setRole(e.target.value)} />
                            <label className="form-check-label" htmlFor="owner">Owner</label>
                        </div>
                        {count > 0 ? null : (
                            <div className="form-check">
                                <input type="radio" id="admin" name="role" className="form-check-input" value="Admin" onChange={(e) => setRole(e.target.value)} />
                                <label className="form-check-label" htmlFor="admin">Admin</label>
                            </div>
                        )}
                        {clientError.role && <div className="text-danger">{clientError.role}</div>}

                        <label className="form-label" htmlFor="mobileNumber">Mobile Number</label>
                        {clientError.mobileNumber && <div className="text-danger">{clientError.mobileNumber}</div>}
                        <input type="tel" id="mobileNumber" className="form-control" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />

                        <label className="form-label" htmlFor="password">Password</label>
                        {clientError.password && <div className="text-danger">{clientError.password}</div>}
                        <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <button type="submit" className="btn btn-warning m-1">Register</button>
                        <p>
                            Already have an account?{" "}
                            <Link
                                style={{
                                    textDecoration: "none",
                                    color: "blue",
                                    fontSize: "medium"
                                }}
                                to="/login"
                            >
                                Login
                            </Link>
                        </p>
                        {serverErrors.length > 0 && (
                            <ul className="list-group">
                                {serverErrors?.errors?.length ? (
                                    serverErrors.errors.map((ele, i) => <li className="list-group-item text-danger" key={i}>{ele.msg}</li>)
                                ) : serverErrors?.error ? (
                                    <li className="list-group-item text-danger">{serverErrors.error}</li>)
                                    : null}
                            </ul>
                        )}
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
