import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import axios from '../../utils/axios';

const DateRange = ({ open, subId, ele, detail, toggleModal }) => {
    const [start, setStart] = useState('');
    const [error, setError] = useState('');

    const validateStartDate = (startDate) => {
         if (!startDate.trim()) {
            return "The start date cannot be empty.";
        }
        const today = new Date();
        const selectedDate = new Date(startDate);
        today.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            return "The start date cannot be in the past.";
        }
       
        return "";
    };

    const handleConfirm = async () => {
        const validationError = validateStartDate(start);
        if (validationError) {
            setError(validationError);
            return;
        }

        const checkOut = {
            gymId: detail._id,
            gymName: detail.gymName,
            gymAddress: detail.address,
            gymSubscription: subId,
            gymPrice: ele.amount * 100,
            gymStartDate: start,
            duration: ele.duration,
        };

        toggleModal();
        try {
            const stripe = await loadStripe('pk_test_51PdqKSRpjV6aLjhkgrpEn8gbuy7bCtDE2ZtLmgG1kmW9oxE1uLh5rDH0ABItgvlajfDVZJBAcqedtYEuwPmuY8k700i8i5lfet');
            const res = await axios.post("/checkout", checkOut, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            });

            localStorage.setItem("session", res.data.id);
            const result = stripe.redirectToCheckout({
                sessionId: res.data.id
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <Modal isOpen={open} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Select Date Range</ModalHeader>
                <ModalBody>
                    {error && <p className="text-danger">{error}</p>}
                    Start Date: <input className='form-control' type="date" value={start} onChange={(e) => setStart(e.target.value)} /><br />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleConfirm}>Confirm Selection</Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default DateRange;
