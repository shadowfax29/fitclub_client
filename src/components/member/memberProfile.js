import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { addMemberProfile, editMemberProfile } from "../../actions/memberActions";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../../loading";

export default function MemberProfile() {
    const [id, setId] = useState("");
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(() => {
        const storedEdit = localStorage.getItem("editMode");
        return storedEdit ? storedEdit : false;
    });
    useEffect(() => {
        if (user) {
            setId(user._id);
        }
    }, [user]);
  const [loading, setLoading] = useState(false);
    const [gender, setGender] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [update,setUpdate]=useState(false)
    const mem = useSelector((state) => state.member.data);

    useEffect(() => {
        if (user) {
            setId(user._id);
        }
    }, [user]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`user/memberProfile/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                setProfilePhoto(res.data.profilePhoto || null);
                setGender(res.data.gender || "");
                setWeight(res.data.weight || "");
                setHeight(res.data.height || "");
            } catch (err) {
                console.log(err);
            }
        };

        if (id) {
            fetchProfile();
        }
    }, [id]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            gender,
            weight,
            height,
            profilePhoto,
        };
        if (validate(data)) {
            const formData = new FormData();
            formData.append("profilePhoto", profilePhoto);
            formData.append("weight", weight);
            formData.append("height", height);
            formData.append("gender", gender);
            
            if (update) {
                dispatch(editMemberProfile(formData, id, toast,setLoading));
            } else {
                dispatch(addMemberProfile(formData, setEdit, edit, toast,setLoading));
            }
            setValidationErrors({});
        }
    };

    const validate = (data) => {
        let errors = {};
        if (!data.gender.trim()) {
            errors.gender = "Gender is required";
        }
        if (!data.weight.trim()) {
            errors.weight = "Weight is required";
        }
        if (!data.height.trim()) {
            errors.height = "Height is required";
        }
        if (!data.profilePhoto) {
            errors.profilePhoto = "Profile Photo is required";
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleFileChange = (e) => {
        setProfilePhoto(e.target.files[0]);
    };

    const toggleEdit = () => {
        const newEdit = !edit;
        setEdit(newEdit);
        setUpdate(!update)
        // localStorage.setItem("editMode", JSON.stringify(newEdit));
    };
if(loading){
    return <Loading/>
}
    return (
        <>
            <div className="row justify-content-center">
                <ToastContainer />
                <div className="d-flex justify-content-center mb-4">
                </div>
                <div className="card shadow-lg p-3 mb-5 bg-body-tertiary rounded-4 border-dark" style={{ width: "18rem" }}>
                    <div className="card-body">
                        
                      {localStorage.getItem("editMode")?(<button className="btn btn-primary mb-3" onClick={toggleEdit}>
                        {edit ? "Edit" : "Cancel"}
                        
                    </button>)
                    :("")
                      }
                        {profilePhoto && (
                            <img
                                src={mem.profilePhoto ? mem.profilePhoto : profilePhoto}
                                alt="Profile"
                                className="img-thumbnail"
                            />
                        )}
                        {validationErrors.profilePhoto && (
                            <p className="text-danger">{validationErrors.profilePhoto}</p>
                        )}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="file"
                                className="form-control"
                                id="inputGroupFile02"
                                onChange={handleFileChange}
                                disabled={edit}
                            />
                            <input
                                value={user ? user.userName : ""}
                                className="form-control bg-secondary m-1 text-light rounded"
                                readOnly
                            />
                            <select
                                disabled={edit}
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="form-select"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {validationErrors.gender && (
                                <p className="text-danger">{validationErrors.gender}</p>
                            )}
                            <input
                                disabled={edit}
                                type="text"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="form-control m-1 border border-0"
                                placeholder="Weight in kg"
                            />
                            {validationErrors.weight && (
                                <p className="text-danger">{validationErrors.weight}</p>
                            )}
                            <input
                                disabled={edit}
                                type="text"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className="form-control m-1 border border-0"
                                placeholder="Height in ft"
                            />
                            {validationErrors.height && (
                                <p className="text-danger">{validationErrors.height}</p>
                            )}
                            {!edit? (
                                <button className="btn btn-outline-info" type="submit">
                                    submit
                                </button>
                            ):("")}
                           
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
