import { Suspense } from "react";
import { Navigate } from "react-router-dom";
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

export default PrivateRoute;
