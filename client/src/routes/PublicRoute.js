import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { showMessage } from "../helpers/showMessage";

const PublicRoute = ({ Component, ...props }) => {
  const { token } = useAuthContext();

  if (token) {
    showMessage(
      "Form oluşturmak ve sorgulama yapmak için kullanıcı olarak devam etmelisiniz"
    );
    return <Navigate to="/admin/panel" replace />;
  }

  return <Component {...props} />;
};

export default PublicRoute;
