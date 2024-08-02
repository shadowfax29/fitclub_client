import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoute = ({ permittedRoles, children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (permittedRoles && !permittedRoles.includes(user.role)) {
           navigate("/unauthorized");
    }
  }, [user, navigate, permittedRoles]);

  return user ? children : null;
};

export default PrivateRoute;
