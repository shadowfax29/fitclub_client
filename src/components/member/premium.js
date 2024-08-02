import React, { useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import ExerciseCard from "./exercisecard"

const schedule = [
    {
        day: 'sunday',
        warmups: [{ name: 'Jumping Jacks', sets: 1, reps: 30 }],
        mainWorkout: [],
        stretching: [{ name: 'Forward Bend', sets: 1, reps: 10 }]
    },
    {
        day: 'monday',
        warmups: [{ name: 'Push-ups', sets: 1, reps: 15 }],
        mainWorkout: [
            { name: 'Bench Press', sets: 3, reps: 10 },
            { name: 'Incline Dumbbell Press', sets: 3, reps: 12 },
            { name: 'Chest Fly', sets: 3, reps: 15 },
            { name: 'Tricep Dips', sets: 3, reps: 12 },
            { name: 'Tricep Pushdowns', sets: 3, reps: 15 },
            { name: 'Close-Grip Bench Press', sets: 3, reps: 10 },
            { name: 'Cable Crossovers', sets: 3, reps: 12 },
            { name: 'Skull Crushers', sets: 3, reps: 15 },
            { name: 'Overhead Tricep Extension', sets: 3, reps: 12 },
            { name: 'Chest Press Machine', sets: 3, reps: 15 }
        ],
        stretching: [{ name: 'Tricep Stretch', sets: 1, reps: 10 }]
    },
    {
        day: 'tuesday',
        warmups: [{ name: 'Pull-ups', sets: 1, reps: 10 }],
        mainWorkout: [
            { name: 'Deadlift', sets: 3, reps: 8 },
            { name: 'Lat Pulldown', sets: 3, reps: 12 },
            { name: 'Barbell Rows', sets: 3, reps: 10 },
            { name: 'One-Arm Dumbbell Row', sets: 3, reps: 12 },
            { name: 'Seated Cable Rows', sets: 3, reps: 15 },
            { name: 'Bicep Curls', sets: 3, reps: 12 },
            { name: 'Hammer Curls', sets: 3, reps: 15 },
            { name: 'Preacher Curls', sets: 3, reps: 12 },
            { name: 'Concentration Curls', sets: 3, reps: 15 },
            { name: 'Reverse Curls', sets: 3, reps: 12 }
        ],
        stretching: [{ name: 'Arm Circles', sets: 1, reps: 15 }]
    },
    {
        day: 'wednesday',
        warmups: [{ name: 'Bodyweight Squats', sets: 1, reps: 20 }],
        mainWorkout: [
            { name: 'Squats', sets: 3, reps: 10 },
            { name: 'Leg Press', sets: 3, reps: 12 },
            { name: 'Lunges', sets: 3, reps: 15 },
            { name: 'Leg Extensions', sets: 3, reps: 12 },
            { name: 'Leg Curls', sets: 3, reps: 15 },
            { name: 'Calf Raises', sets: 3, reps: 12 },
            { name: 'Shoulder Press', sets: 3, reps: 12 },
            { name: 'Lateral Raises', sets: 3, reps: 15 },
            { name: 'Front Raises', sets: 3, reps: 12 },
            { name: 'Rear Delt Fly', sets: 3, reps: 15 }
        ],
        stretching: [{ name: 'Quad Stretch', sets: 1, reps: 10 }]
    },
    {
        day: 'thursday',
        warmups: [{ name: 'Push-ups', sets: 1, reps: 15 }],
        mainWorkout: [
            { name: 'Incline Bench Press', sets: 3, reps: 10 },
            { name: 'Dumbbell Flyes', sets: 3, reps: 12 },
            { name: 'Cable Crossovers', sets: 3, reps: 15 },
            { name: 'Tricep Pushdowns', sets: 3, reps: 12 },
            { name: 'Skull Crushers', sets: 3, reps: 15 },
            { name: 'Tricep Dips', sets: 3, reps: 12 },
            { name: 'Close-Grip Bench Press', sets: 3, reps: 10 },
            { name: 'Overhead Tricep Extension', sets: 3, reps: 12 },
            { name: 'Pec Deck Machine', sets: 3, reps: 15 },
            { name: 'Chest Press Machine', sets: 3, reps: 12 }
        ],
        stretching: [{ name: 'Chest Stretch', sets: 1, reps: 10 }]
    },
    {
        day: 'friday',
        warmups: [{ name: 'Pull-ups', sets: 1, reps: 10 }],
        mainWorkout: [
            { name: 'Barbell Rows', sets: 3, reps: 10 },
            { name: 'T-Bar Rows', sets: 3, reps: 12 },
            { name: 'Seated Cable Rows', sets: 3, reps: 15 },
            { name: 'Lat Pulldown', sets: 3, reps: 12 },
            { name: 'One-Arm Dumbbell Row', sets: 3, reps: 15 },
            { name: 'Deadlift', sets: 3, reps: 8 },
            { name: 'Bicep Curls', sets: 3, reps: 12 },
            { name: 'Hammer Curls', sets: 3, reps: 15 },
            { name: 'Preacher Curls', sets: 3, reps: 12 },
            { name: 'Concentration Curls', sets: 3, reps: 15 }
        ],
        stretching: [{ name: 'Back Stretch', sets: 1, reps: 10 }]
    },
    {
        day: 'saturday',
        warmups: [{ name: 'Lunges', sets: 1, reps: 15 }],
        mainWorkout: [
            { name: 'Leg Press', sets: 3, reps: 10 },
            { name: 'Squats', sets: 3, reps: 12 },
            { name: 'Leg Extensions', sets: 3, reps: 15 },
            { name: 'Leg Curls', sets: 3, reps: 12 },
            { name: 'Calf Raises', sets: 3, reps: 15 },
            { name: 'Shoulder Press', sets: 3, reps: 12 },
            { name: 'Lateral Raises', sets: 3, reps: 15 },
            { name: 'Front Raises', sets: 3, reps: 12 },
            { name: 'Rear Delt Fly', sets: 3, reps: 15 },
            { name: 'Arnold Press', sets: 3, reps: 12 }
        ],
        stretching: [{ name: 'Hamstring Stretch', sets: 1, reps: 10 }]
    }
];

export default function Premium() {
    const [activeIndex, setActiveIndex] = useState(null);
    const week = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    const getWorkoutDetails = (day) => {
        const daySchedule = schedule.find(sch => sch.day === day);
        if (!daySchedule) return;

        return (
            <div >
                <h3>Warmups</h3>
                {daySchedule.warmups.map((exercise, index) => (
                    <ExerciseCard key={index} exercise={exercise} />
                ))}

                <h3>Main Workout</h3>
                <div className='d-flex flex-wrap justify-content-around'>
                {daySchedule.mainWorkout.map((exercise, index) => (
                    <ExerciseCard key={index} exercise={exercise} />
                ))}
                </div>
                

                <h3>Stretching</h3>
                {daySchedule.stretching.map((exercise, index) => (
                    <ExerciseCard key={index} exercise={exercise} />
                ))}
            </div>
        );
    };

    return (
        <div className="card">
            <div className="d-flex flex-wrap justify-content-around bg-dark">
                {week.map((day, i) => (
                    <Button
                        key={i}
                        outlined={activeIndex !== i}
                        rounded
                        label={day.substring(0, 3).toUpperCase()}
                        onClick={() => setActiveIndex(i)}
                        className="btn btn-dark"
                    />
                ))}
            </div>
            <Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                {week.map((day, i) => (
                    <AccordionTab
                        key={i}
                        header={<span style={{ color: '#000', textDecoration: 'none', cursor: 'default', fontWeight: 'bold', fontSize: '16px' }}>{day.charAt(0).toUpperCase() + day.slice(1)}</span>}
                    >
                        {getWorkoutDetails(day)}
                    </AccordionTab>
                ))}
            </Accordion>
        </div>
    );
}
