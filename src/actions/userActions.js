import axios from "../utils/axios";

export const startRegister = (formData, resetForm, setVersion, setLoading, navigate,toast) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("user/register", formData);
      console.log(res.data);
      dispatch({ type: "REGISTER", payload: res.data });
      resetForm();
      dispatch(setErrors([]));
      setLoading(false);
      toast.success("succesfully registered")
      setVersion((prevVersion) => prevVersion + 1);
      navigate("/login");
    } catch (err) {
      setLoading(false)
      dispatch(setErrors(err.response.data.errors));
      toast.error("Registration failed. Please check your input!")
    }
  };
};

export const startLogin = (formData, setLoading, resetForm,navigate) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const res = await axios.post("user/login", formData);
      const {token,user } = res.data;
    
      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", JSON.stringify(user));
      
      dispatch({ type: "LOGIN",payload:user });
      setLoading(false);
      resetForm();
      dispatch(setErrors([]));

      if (user.role === "Member") {
        navigate("/memberDashBoard");
      } else if (user.role === "Owner") {
        navigate("/ownerDashBoard");
      } else if (user.role === "Admin") {
        navigate("/adminPanel");
      }
      
    } catch (err) {
      dispatch(setErrors(err.response?.data));
      setLoading(false);
      console.log(err);
    }
  };
};

export const startForgotPassword = (formData, resetForm,toast) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("user/forgotPassword", formData);
      resetForm();
      dispatch(setErrors([]));
      toast.success("Password reset link sent to your email")
    } catch (err) {
      console.log(err);
      dispatch(setErrors(err.response.data));
    }
  };
};

export const startResetPassword = (
  formData,
  resetForm,
  userId,
  setLoading,
  setSuccess,
  setError,
  navigate
) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      const res = await axios.put(`user/resetPassword/${userId}`, formData);
      setLoading(false);
      setSuccess(res?.data?.message);
      resetForm();
      setError("");
      dispatch(setErrors([]));
      navigate("/login"); 
        } catch (err) {
      setLoading(false);
      const errorMessage = err.response?.data?.error || "Something went wrong";
      dispatch(setErrors(errorMessage));
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
 
    dispatch({ type: "LOGOUT" });
  };
};

const setErrors = (error) => {
  return { type: "SET_ERRORS", payload: error };
};
