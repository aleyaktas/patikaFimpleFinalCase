import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ Component, ...props }) => {
  const { token } = useAuthContext();
  return token ? <Component {...props} /> : <Navigate to="/admin" replace />;
};

export default PrivateRoute;
