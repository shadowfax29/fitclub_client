import React, { useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import { UilDumbbell } from '@iconscout/react-unicons';
import { Checkbox } from "primereact/checkbox";

const ExerciseCard = ({ exercise }) => {
    const [checked, setChecked] = useState(false);
   return(
    <Card className="mb-2 bg-dark text-light rounded-4 shadow-sm" style={{width:"300px"}}>
    <CardBody className="d-flex justify-content-around align-items-center">
        <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#B692C2" }}>
            <UilDumbbell className="text-light" style={{ width: '24px', height: '24px' }} />
        </div>
        <div className='d-flex flex-column align-items-center'>
            <h4>{exercise.name}</h4>
            <div >{exercise.sets} sets x {exercise.reps} reps<span className='p-2'><Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
            </span></div>
        </div>
    </CardBody>
</Card>
   )
}

export default ExerciseCard;
