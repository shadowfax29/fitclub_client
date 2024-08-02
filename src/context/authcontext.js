import { createContext, useContext, useState } from "react";
import axios from "../utils/axios";

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [list, setList] = useState([]);
    const [trig, setTrig] = useState("false")
    const [id, setId] = useState("")
 
    const handleList = (data) => {
        setList(data);
    };

    const handleApprove = async (gymId) => {

        try {
            const res = await axios.put(`/admin/approval/${gymId}`, {}, {
                headers: {
                    authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json"
                }
            });
            setTrig(!trig)
        } catch (err) {
            console.log(err)
        }
    };
    const handleReject = async (gymId) => {

        try {
            const res = await axios.put(`/admin/reject/${gymId}`, {}, {
                headers: {
                    authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json"
                }
            });
            setTrig(!trig)
        } catch (err) {
            console.log(err)
        }
    };


    return (
        <AuthContext.Provider value={{ handleList, list, handleApprove, handleReject, trig, setId, id}}>
            {children}
        </AuthContext.Provider>
    );
};
