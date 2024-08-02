import axios from "../utils/axios"

export const addMemberProfile = (data, setEdit, edit, toast,setLoading) => {

    return async (dispatch) => {
        try {
            setLoading(true)
            const res = await axios.post("user/memberprofile", data, {

                headers: {
                    authorization: localStorage.getItem("token")
                },
                'Content-Type': 'multipart/form-data',
            })
            setLoading(false)
            toast.success("profile created successfully")
            const newEdit = !edit;
            setEdit(newEdit);
            localStorage.setItem("editMode", JSON.stringify(newEdit));
            dispatch(setMemberProfile(res.data))
            dispatch({ type: "SET_ERRORS", payload: [] })

        }
        catch (err) {
            console.log(err)
            setLoading(false)
            dispatch(setErrors(err.response.data))
        }
    }
}
export const editMemberProfile = (data, id, toast,setLoading) => {

    return async (dispatch) => {
        try {
            setLoading(true)

            const res = await axios.put(`user/memberprofile/${id}`, data, {
                headers: {
                    Authorization: localStorage.getItem("token"),

                    "Content-Type": 'multipart/form-data',
                }
            })
            setLoading(false)
            toast.success("profile updated successfully")
            dispatch({ type: "UPDATE_MEMBER_PROFILE", payload: res.data })
            dispatch({ type: "SET_ERRORS", payload: [] })

        }
        catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

}
export const addWorkoutShedule = (data, resetForm, toast) => {
    return async (dispatch) => {
        try {
            const res = await axios.post("user/workoutSchedule", data, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            toast.success("workout schedule added successfully")
            dispatch({ type: "ADD_WORKOUT_SCHEDULE", payload: res.data })
            dispatch({ type: "SET_ERRORS", payload: [] })
            resetForm()
        }
        catch (err) {
            console.log(err)
            dispatch({ type: "SET_ERRORS", payload: err.response.data })
        }
    }
}
export const deleteWorkoutShedule = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`user/workoutSchedule/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
            )
            dispatch(setErrors([]))
            dispatch({ type: "SET_DELETE_WORKOUT", payload: id })

        }
        catch (err) {
            dispatch(setErrors(err.response.data))
        }
    }
}
const setMemberProfile = (data) => {
    return ({ type: "ADD_MEMBER_PROFILE", payload: data })
}
const setErrors = (data) => {
    return ({ type: "SET_ERRORS", payload: data })
}