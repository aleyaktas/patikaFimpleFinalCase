import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const PrivateRoute = ({ Component, ...props }) => {
  const { token } = useAuthContext();
  return token ? <Component {...props} /> : <Navigate to="/admin" replace />;
};

export default PrivateRoute;
