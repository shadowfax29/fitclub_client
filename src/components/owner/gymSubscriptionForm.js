import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { editSubscription, removeSubscription, startAddSubscription, startEditSubscription } from '../../actions/ownerActions';
import Loading from '../../loading';
import { UilTrashAlt } from '@iconscout/react-unicons';
import useFetch from './useFetch';
import { useOwner } from './useOwner';
import Navbar1 from './navbar1';
import { Badge } from 'primereact/badge';
import { ToastContainer } from 'react-toastify';

const GymSubscriptionForm = () => {
    const { detail, trigger } = useOwner();
    const dispatch = useDispatch();
    const result = useSelector((state) => state.owner.subscription);
    const { data } = useFetch();
    const [loading, setLoading] = useState(false);
    const [duration, setDuration] = useState('');
    const [amount, setAmount] = useState('');
    const [subscriptionType, setSubscriptionType] = useState('basic');
    const [clientError, setClientError] = useState({});
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const serverErrors = useSelector((state) => state.owner.serverErrors);
    const [benefits, setBenefits] = useState([]);
    const [newBenefit, setNewBenefit] = useState('');

    const handleAddBenefit = (e) => {
        e.preventDefault();
        if (newBenefit.trim() !== "") {
            setBenefits([...benefits, newBenefit.trim()]);
            setNewBenefit('');
        }
    };

    const handleRemoveBenefit = (index) => {
        const updatedBenefits = [...benefits];
        updatedBenefits.splice(index, 1);
        setBenefits(updatedBenefits);
    };

    const resetForm = () => {
        setDuration('');
        setAmount('');
        setSubscriptionType('basic');
        setBenefits([]);
        setEdit(false);
        setEditId(null);
    };

    const validate = () => {
        const errors = {};
        if (duration.trim().length === 0) {
            errors.duration = 'Duration is required';
        }
        if (amount <= 0) {
            errors.amount = 'Amount must be greater than zero';
        }
        if (benefits.length === 0) {
            errors.benefits = 'Benefits are required';
        }
        setClientError(errors);
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = validate();

        if (Object.keys(err).length === 0) {
            const formData = {
                duration,
                amount,
                subscriptionType,
                benefits
            };
            if (edit) {
                dispatch(startEditSubscription(formData, editId, setLoading, resetForm, data._id, trigger));
            } else {
                dispatch(startAddSubscription(formData, setLoading, resetForm, data._id, trigger));
            }
        }
    };

    if (loading) {
        return <Loading />;
    }

    const handleRemoveSub = (i) => {
        dispatch(removeSubscription(data._id, i, trigger));
    };

    const handleEditSub = (subscription) => {
        setEdit(true);
        setEditId(subscription._id);
        setDuration(subscription.duration);
        setAmount(subscription.amount);
        setSubscriptionType(subscription.subscriptionType);
        setBenefits(subscription.benefits);
    };

    return (
        <div className='sub'>
            <ToastContainer />
            <Navbar1 />
            <div className="container">
                <Link to={'/ownerDashBoard'}>
                    <button className="btn btn-secondary m-2">Back</button>
                </Link>
                <h1>{edit ? 'Edit Subscription' : 'Add Subscription'}</h1>
                <p>Enter the details of your subscription</p>
                <form className="form-group p-5 shadow-lg p-3 mb-5 bg-body-tertiary rounded" onSubmit={handleSubmit}>
                    <label className="form-label" htmlFor="duration">
                        Duration
                    </label>
                    {clientError.duration && <div className="text-danger">{clientError.duration}</div>}
                    <input
                        type="text"
                        id="duration"
                        placeholder='enter number of months'
                        className="form-control"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />

                    <label className="form-label" htmlFor="amount">
                        Amount
                    </label>
                    {clientError.amount && <div className="text-danger">{clientError.amount}</div>}
                    <input
                        type="number"
                        id="amount"
                        placeholder='amount for the subscription'
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    <label className="form-label" htmlFor="subscriptionType">
                        Subscription Type
                    </label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="basic"
                                checked={subscriptionType === 'basic'}
                                onChange={(e) => setSubscriptionType(e.target.value)}
                            /> Basic
                        </label><br />

                        <label>
                            <input
                                type="radio"
                                value="classic"
                                checked={subscriptionType === 'classic'}
                                onChange={(e) => setSubscriptionType(e.target.value)}
                            /> Classic
                        </label><br />
                        <label>
                            <input
                                type="radio"
                                value="premium"
                                checked={subscriptionType === 'premium'}
                                onChange={(e) => setSubscriptionType(e.target.value)}
                            /> Premium
                        </label>
                    </div>

                    <label className="form-label" htmlFor="benefits">
                        Benefits
                    </label>
                    {clientError.benefits && <div className="text-danger">{clientError.benefits}</div>}
                    <input
                        className='form-control'
                        type="text"
                        value={newBenefit}
                        onChange={(e) => setNewBenefit(e.target.value)}
                        placeholder="Enter a new benefit"
                    />
                    <button
                        className='btn m-1'
                        style={{ backgroundColor: "#2E236C", color: "white" }}
                        onClick={handleAddBenefit}
                    >
                        Add Benefit
                    </button>

                    <ul>
                        {benefits.map((benefit, index) => (
                            <li key={index}>
                                {benefit}
                                <button
                                    className='btn m-1'
                                    style={{ backgroundColor: "#E68369", color: "white" }}
                                    onClick={() => handleRemoveBenefit(index)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>

                    <input
                        type="submit"
                        className='btn'
                        style={{ backgroundColor: "#B1AFFF" }}
                    />
                </form>
                <ul className="list-group">
                    {serverErrors?.errors?.length ? (
                        serverErrors.errors.map((ele, i) => (
                            <li className="list-group-item text-danger" key={i}>
                                {ele.msg}
                            </li>
                        ))
                    ) : serverErrors?.error ? (
                        <li className="list-group-item text-danger">{serverErrors.error}</li>
                    ) : null}
                </ul>

                <div className="d-flex flex-wrap justify-content-around">
                    {result && result.length > 0 ? (
                        result.map((ele, i) => (
                            <div key={i} className="card p-2" style={{ width: '200px', backgroundColor: "#1A2130", color: "whitesmoke" }}>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <div className='d-flex flex-column'>
                                        <h1 className="fw-bold text-2xl mb-0 " style={{ color: "#91DDCF" }}>{ele.duration}</h1>
                                        <p>months</p>
                                        <Badge value={ele.subscriptionType} severity="success"></Badge>
                                    </div>
                                    <h4 className='m-2'>&#x20b9;{ele.amount}</h4>
                                </div>
                                <div className="card-body">
                                    <ul>
                                        {ele.benefits.map((el, i) => (
                                            <li key={i}>{el}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className='row justify-content-around'>
                                    <button onClick={() => handleEditSub(ele)} className=' col-4 btn btn-primary'>
                                        Edit
                                    </button>
                                    <button onClick={() => handleRemoveSub(ele._id)} className='col-4 btn btn-danger'>
                                        <UilTrashAlt />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        detail.gym?.subscription?.map((ele, i) => (
                            <div key={i} className="card p-2" style={{ width: '200px', backgroundColor: "#1A2130", color: "whitesmoke" }}>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <div className='d-flex flex-column'>
                                        <h1 className="fw-bold text-2xl mb-0 " style={{ color: "#91DDCF" }}>{ele.duration}</h1>
                                        <p>months</p>
                                        <Badge value={ele.subscriptionType} severity="success"></Badge>
                                    </div>
                                    <h4 className='m-2'>&#x20b9;{ele.amount}</h4>
                                </div>
                                <div className="card-body">
                                    <ul>
                                        {ele.benefits.map((el, i) => (
                                            <li key={i}>{el}</li>
                                        ))}
                                    </ul>
                                </div>
                            
                                <div className='row justify-content-around'>
                                    <button onClick={() => handleEditSub(ele)} className=' col-4 btn btn-primary'>
                                        Edit
                                    </button>
                                    <button onClick={() => handleRemoveSub(ele._id)} className='col-4 btn btn-danger'>
                                        <UilTrashAlt />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default GymSubscriptionForm;
