
import { toast } from "react-toastify"
import axios from "../utils/axios"
export const startAddGym = (formData, setLoading, resetForm) => {
    console.log(formData)
    return async (dispatch) => {
        try {
            const res = await axios.post("/gym/addGym", formData, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
            localStorage.setItem("count", 1)
            toast.success("gym added")
            dispatch({ type: "ADD_GYM", payload: res.data })
            setLoading(false)
            resetForm()
            dispatch(setErrors([]))
            localStorage.setItem("editMode", true)
            const res1 = await axios.post("/user/ownerProfile", formData, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
        }
        catch (err) {
            console.log(err)
            dispatch(setErrors(err.response.data))
            setLoading(false)
            resetForm()
        }
    }
}
// export const addProfilePhoto = (imageData) => {
//     return async (dispatch) => {
//         try {

//             const response = await axios.post('/user/ownerProfile', imageData,{
//                 headers: {
//                     authorization: localStorage.getItem("token")
//                 }
//             });


//             dispatch({
//                 type: 'ADD_PROFILE_PHOTO',
//                 payload: response.data.ProfilePhoto
//             });
//         } catch (error) {
//             console.error('Error uploading profile photo:', error);

//         }
//     };
// };
export const startAddImages = (formData, resetImage, setLoading, data, trigger, toast) => {

    return async (dispatch) => {
        try {
            const res = await axios.post(`/gym/addImage/${data._id}`, formData, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
            localStorage.setItem("imageEdit", true)
            trigger()
            dispatch({ type: "ADD_IMAGES", payload: res.data.images })
            dispatch(setErrors([]))
            toast.success("images added")
            setLoading(false)
            resetImage()

        }
        catch (err) {
            console.log(err)
            dispatch(setErrors(err.response.data))
            setLoading(false)
            resetImage()
        }
    }

}
export const deleteGymImage = (gymId, trigger) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/gym/deleteImage/${gymId}`, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
            dispatch({ type: "DELETE_IMAGE", payload: res.data })
            trigger()
            toast.danger("images deleted")
            localStorage.removeItem("imageEdit")

        }
        catch (err) {
            console.log(err)
        }
    }
}
export const updateGymImage = (gymId, imgId, formData, trigger) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`/gym/updateImage/${gymId}/${imgId}`, formData, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
            trigger()
            dispatch({ type: "UPDAT_IMAGE", payload: { imgId, result: res.data } })
            toast.success("image updated")
        }
        catch (err) {
            console.log(err)
        }
    }
}
export const updateGym = (gymId, formData, setLoading) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`/gym/updateGymDetail/${gymId}`, formData, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
            setLoading(false)
            dispatch(setErrors([]))
            dispatch({ type: "UPDATE_GYM", payload: res.data })
        }
        catch (err) {
            console.log(err)
            setLoading(false)
            dispatch(setErrors(err.response.data))
        }
    }
}
export const startAddSubscription = (subscriptionData, setLoading, resetForm, gymId, trigger) => async (dispatch) => {
    try {
        setLoading(true);
        const response = await axios.post(`/gym/addSubscription/${gymId}`, subscriptionData, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        });
        dispatch({
            type: 'ADD_SUBSCRIPTION',
            payload: response.data,
        });
        resetForm();
        trigger()
        toast.success("subscription added")

    } catch (error) {
        console.log(error);
        dispatch({
            type: 'ERROR',
            payload: error.response.data,
        });
    } finally {
        setLoading(false);
    }
};

export const startEditSubscription = (formData, subId, setLoading, resetForm, gymId, trigger) => {
    return (dispatch) => {
        setLoading(true);
        axios.put(`/gym/updateSubscription/${gymId}/${subId}`, formData, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        })
            .then((response) => {
                dispatch(editSubscription(response.data));
                setLoading(false);
                resetForm();
                trigger();
                toast.success("subscription updated")
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };
};

export const editSubscription = (subscription) => ({
    type: 'EDIT_SUBSCRIPTION',
    payload:subscription
});

export const removeSubscription = (gymId, subId, trigger) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/gym/deleteSubscription/${gymId}/${subId}`, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
            dispatch({ type: "REMOVE_SUBSCRIPTION", payload: subId })
            trigger()
            toast.danger("subscription deleted")
        }
        catch (err) {
            console.log(err)
        }
    }
}
export const validateQr = (data, setData, handleSuccess) => {
    return async (dispatch) => {
        try {
            const res = await axios.post("/validate-qr", { token: data }, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            });
            if (res.data) {
                toast.success("Check-in successful");
                handleSuccess();
            } else {
                toast.error("Check-in failed");
            }
            setData("");
        } catch (err) {
            toast.warning(err.response?.data?.error || "An error occurred");
            console.log(err);
        }
    }
};
export const setErrors = (err) => {
    return ({ type: "ERROR", payload: err })
}