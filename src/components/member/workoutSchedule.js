import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';
import { Calendar } from 'primereact/calendar';

import { useDispatch } from 'react-redux';
import { addWorkoutShedule, deleteWorkoutShedule } from '../../actions/memberActions';
import axios from '../../utils/axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Premium from './premium';


export default function WorkoutSchedule() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [workout, setWorkout] = useState("");
    const [duration, setDuration] = useState("");
    const [note, setNote] = useState("");
    const [errors, setErrors] = useState({});
    const [exercise, setExercise] = useState([]);
    const [detail,setDetail]=useState({})
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get("/planDetail", {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                });
                setDetail(res.data.plan[0]);
              
            } catch (err) {
                console.log(err);
            }
        };
        fetch();
    }, []);
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get('user/workoutSchedule', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                setExercise(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetch();
    }, [exercise]);

    const dispatch = useDispatch();

  

    const validate = () => {
        const errors = {};

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selected = new Date(selectedDate);
        selected.setHours(0, 0, 0, 0);

        if (selected < today) {
            errors.selectedDate = "You can't select past dates";
        }
        if (!workout.trim()) {
            errors.workout = "Please enter a workout";
        }
        if (!duration.trim() || isNaN(duration) || duration <= 0) {
            errors.duration = "Please enter a valid duration";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const resetForm = () => {
        setWorkout("");
        setDuration("");
        setNote("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const data = {
                date: selectedDate,
                workout: workout,
                duration: duration,
                note: note
            };
            dispatch(addWorkoutShedule(data, resetForm,toast));
        }
    };

    const handleDelete = (id) => {
        dispatch(deleteWorkoutShedule(id));
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);
   
    return (
        <div className='container-fluid'>
           <Link to={"/memberDashBoard"}><button className='btn btn-dark m-3'>Back</button></Link>
                       
            {detail.subscriptionType==="premium"?(<Premium/>):(<> <ToastContainer/>
            <div className="row justify-content-center">
                <div className="row h-5 bg-dark text-light ">
                    <h1 className="font-bold">Gym Workout Schedule</h1>
                </div>
                <div className="row p-0 " style={{ height: "100vh" }}>
              
                    <div className="col-md-5  cal ">
                   
                        
                         <Calendar
                        value={selectedDate}
                            onChange={(e)=>{setSelectedDate(e.target.value)}}
                        
                           showIcon
                       
                    />
                    {exercise.length > 0 ? (
                            <ul className='list-group col'>
                                {exercise.map((ele) => {
                                    const exerciseDate = new Date(ele.date);
                                    exerciseDate.setHours(0, 0, 0, 0);
                                    if (exerciseDate.toLocaleDateString() === selectedDate.toLocaleDateString()) {
                                        return (
                                            <li className='list-group-item shadow p-3 m-1 bg-dark' key={ele._id}>
                                                <h3 className='text-light'>{ele.workout}</h3>
                                                <button onClick={() => { handleDelete(ele._id) }} className='btn btn-primary float-end'>Delete</button>
                                                <p className='text-bold badge text-bg-success'>{ele.duration}min</p>
                                                <p className='text-light'>{ele.note}</p>
                                            </li>
                                        );
                                    }
                                    return null;
                                })}
                            </ul>
                        ) : (
                            <p className='text-light'>No workouts scheduled.</p>
                        )}
                        
                        
                    </div>

                    <div className='col' style={{ backgroundColor: "#B6BBC4" }}>
                        <h2 className="text-xl font-bold mb-4 text-drop">
                            Workouts for {selectedDate.toLocaleDateString()}
                        </h2>
                        <div className="col-7">
                            <h3 className="text-lg font-medium mb-2 text-drop">Add New Workout</h3>
                            <form onSubmit={handleSubmit} className='form-group'>
                                <div className='row p-1'>
                                    <input
                                        placeholder="Workout Name"
                                        value={workout}
                                        onChange={(e) => setWorkout(e.target.value)}
                                        className='form-control col-md-2 m-2'
                                    />
                                    {errors.workout && <p className='text-danger'>{errors.workout}</p>}
                                    <input
                                        placeholder="Duration (minutes)"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        className='form-control col-md m-2'
                                    />
                                    {errors.duration && <p className='text-danger'>{errors.duration}</p>}
                                </div>
                                <textarea
                                    placeholder="Notes"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className='form-control'
                                />
                                <input type='submit' className='btn btn-dark text-light m-2' />
                                {errors.selectedDate && <p className='text-danger'>{errors.selectedDate}</p>}

                            </form>
                        </div>
                    </div>
                </div>
            </div></>)}
           
        </div>
    );
}
