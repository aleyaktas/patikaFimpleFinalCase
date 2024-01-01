import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ Component, ...props }) => {
  const { token } = useAuthContext();
  return token ? (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <Component {...props} />
    </Suspense>
  ) : (
    <Navigate to="/admin" replace />
  );
};

PrivateRoute.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
