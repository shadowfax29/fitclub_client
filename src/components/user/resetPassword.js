import React, {  useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startResetPassword } from '../../actions/userActions';

const ResetPassword = () => {
 
    const { userId} = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
const dispatch=useDispatch()
const resetForm=()=>{
    setPassword("")
    setConfirmPassword("")
}
    const handleSubmit = (e) => {
        e.preventDefault();
        
const formData={
    password
}
        if (password !== confirmPassword) {
            setError('Passwords do not match');
           
        }
        else{
            dispatch(startResetPassword(formData,resetForm,userId,setLoading,setSuccess,setError,navigate))
        }

        
    };

    return (
       <div className="register d-flex justify-content-center align-items-center"style={{height:"100vh"}}>
                    <form className="form-group p-4 rounded-3 fs-5" style={{backgroundColor:"#161A30",color:"white"}} onSubmit={handleSubmit}>
                       
                            <h2>Reset Password</h2>
                            <label className="form-label" htmlFor="password">New Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label className="form-label" htmlFor="confirmPassword">Confirm New Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            {error && <div className="text-danger">{error}</div>}
                            {success && <div className="text-success">{success}</div>}
                            <button type="submit" className="btn btn-warning m-1" disabled={loading}>
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </button>
                        
                    </form>
                </div>
            
    );
};

export default ResetPassword;
