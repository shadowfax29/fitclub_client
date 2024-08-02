import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UilBackspace } from '@iconscout/react-unicons';
import { TieredMenu } from 'primereact/tieredmenu';
import { Button } from 'primereact/button';

export const SearchWorkout = () => {
    const [search, setSearch] = useState("");
    const [workouts, setWorkouts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const buttons = ["back", "cardio", "chest", "lower arms", "lower legs", "neck", "shoulders", "upper arms", "upper legs", "waist"];
    const itemsPerPage = 4;
    const menu = useRef(null);

    useEffect(() => {
        const fetch = async () => {
            const options = {
                method: 'GET',
                url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${search}`,
                headers: {
                    'x-rapidapi-key': '0fc19b4fc2msh5c2062430c1942cp1c33e4jsn05438fc16a84',
                    'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                setCurrentPage(1);
                setWorkouts(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        if (search) {
            fetch();
        }
    }, [search]);

    const totalPages = Math.ceil(workouts.length / itemsPerPage);

    const handleChangePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedWorkouts = workouts.slice(startIndex, startIndex + itemsPerPage);

    const menuItems = buttons.map(button => ({
        label: button,
        command: () => setSearch(button)
    }));

    return (
        <div className="ex m-0 p-0 overflow-auto" style={{ height: "100vh" }}>
            <div className="d-flex flex-wrap justify-content-around">
                <Link className="m-5" to={"/memberDashBoard"} style={{ height: "35px" }}><UilBackspace size="40" color="white" /></Link>
                <Button label="Search Suggestions" icon="pi pi-search" onClick={(e) => menu.current.toggle(e)} className="m-5" />
                <TieredMenu model={menuItems} popup ref={menu} />
            </div>
            
            <div className="row justify-content-around align-items-center">
                <div className="col-4 text-center bg-dark text-light">
                    <h2>Workout Search</h2>
                </div>
                <form className="col-6 text-center form-group" role="search">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
            </div>

            <div className="row justify-content-around">
                {displayedWorkouts.length > 0 ? (
                    displayedWorkouts.map((ele) => (
                        <div className="card m-2 shadow-lg p-3 mb-5 bg-body-tertiary rounded-4" style={{ width: "18rem" }} key={ele.id}>
                            <img src={ele.gifUrl} className="card-img-top" alt={ele.name} />
                            <div className="card-body">
                                <h5 className="card-title">{ele.bodyPart}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{ele.name}</h6>
                                <p className="card-text">{ele.equipment}</p>
                                <p className="text-bg-danger rounded-pill w-25 text-center">3 Sets</p>
                                <ul className="d-flex p-0">
                                    <li key={1} className="flex-fill m-2">12 Reps</li>
                                    <li key={2} className="flex-fill m-2">10 Reps</li>
                                    <li key={3} className="flex-fill m-2">8 Reps</li>
                                </ul>
                            </div>
                        </div>
                    ))
                ) : (null)}
            </div>

            {displayedWorkouts.length > 0 ? (
                <nav aria-label="Page navigation example" className="row justify-content-center">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handleChangePage(currentPage - 1)} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handleChangePage(index + 1)}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handleChangePage(currentPage + 1)} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            ) : ("")}
        </div>
    );
}
