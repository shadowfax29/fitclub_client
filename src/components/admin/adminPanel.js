import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useAuth } from "../../context/authcontext";
import { useDispatch } from "react-redux";
import { logOut } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { Input, Pagination, PaginationItem, PaginationLink } from "reactstrap";

const GymRequests = () => {
    const { handleList, handleApprove, list, handleReject, trig } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`/admin/gymList?search=${searchQuery}&sort=${sortOrder}&page=${currentPage}`, {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                });
                handleList(res.data.gyms);
                setTotalPages(res.data.totalPages);
            } catch (err) {
                console.log(err);
            }
        };
        fetch();
    }, [trig, searchQuery, sortOrder, currentPage]);

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/login');
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to the first page on new search
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container">
            <div className="row ">
                <h1 className="col">Gym Requests</h1>
                <button className="col-2 btn m-2" onClick={handleLogout}>Logout</button>
            </div>
            <div className="row m-3">
               <div className="col">
               <Input 
                    type="text" 
                    placeholder="Search gyms..." 
                    value={searchQuery} 
                    onChange={handleSearchChange} 
                />
               </div>
                <div className="col-2">
                <select  class="form-select" onChange={handleSortChange} value={sortOrder}>
                    <option value="asc">Sort by Name: Ascending</option>
                    <option value="desc">Sort by Name: Descending</option>
                </select>
                </div>
            </div>
            <div className="d-flex">
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Gym Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Gym Owner</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list?.length > 0 ? (
                            list.map((gym) => (
                                <tr key={gym._id}>
                                    <td>{gym.gymName}</td>
                                    <td>{gym.address}</td>
                                    <td>{gym.gymOwner.userName}</td>
                                    <td>{gym.isVerified ? "Verified" : "Not Verified"}</td>
                                    <td>
                                        {gym.isVerified ? null : (
                                            <button onClick={() => handleApprove(gym._id)} className="btn btn-success m-2">Approve</button>
                                        )}
                                        <button onClick={() => handleReject(gym._id)} className="btn btn-danger m-2">Reject</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No gym requests found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination>
                <PaginationItem disabled={currentPage <= 1}>
                    <PaginationLink
                        onClick={() => handlePageChange(currentPage - 1)}
                        previous
                        href="#"
                    />
                </PaginationItem>
                {[...Array(totalPages)].map((page, i) => (
                    <PaginationItem active={i + 1 === currentPage} key={i}>
                        <PaginationLink onClick={() => handlePageChange(i + 1)} href="#">
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem disabled={currentPage >= totalPages}>
                    <PaginationLink
                        onClick={() => handlePageChange(currentPage + 1)}
                        next
                        href="#"
                    />
                </PaginationItem>
            </Pagination>
        </div>
    );
};

export default GymRequests;
