import { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home/Home";
import ApplicationStatus from "./screens/ApplicationStatus/ApplicationStatus";
import AdminLogin from "./screens/AdminLogin/AdminLogin";
import ApplicationDetails from "./screens/ApplicationDetails/ApplicationDetails";
import ApplicationSuccessful from "./screens/ApplicationSuccessful/ApplicationSuccessful";
import { AuthProvider } from "./contexts/AuthContext";
import { LoadingProvider } from "./contexts/Loading";
import PrivateRoute from "./routes/PrivateRoute";
import "./App.css";
import PublicRoute from "./routes/PublicRoute";
import { ToastContainer } from "react-toastify";

const AdminDashboard = lazy(() =>
  import("./screens/AdminDashboard/AdminDashboard")
);
const AdminApplicationList = lazy(() =>
  import("./screens/AdminApplicationList/AdminApplicationList")
);
const AdminApplicationDetails = lazy(() =>
  import("./screens/AdminApplicationDetails/AdminApplicationDetails")
);

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute Component={Home} />,
    },
    {
      path: "/basvuru-sorgula",
      element: <PublicRoute Component={ApplicationStatus} />,
    },
    {
      path: "/basvuru-sorgula/:code",
      element: <PublicRoute Component={ApplicationDetails} />,
    },
    {
      path: "/basvuru-basarili",
      element: <PublicRoute Component={ApplicationSuccessful} />,
    },
    {
      path: "/admin",
      element: <PublicRoute Component={AdminLogin} />,
    },
    {
      path: "/admin/panel",
      element: <PrivateRoute Component={AdminDashboard} />,
    },
    {
      path: "/admin/basvuru-listesi",
      element: <PrivateRoute Component={AdminApplicationList} />,
    },
    {
      path: "/admin/basvuru-listesi/:code",
      element: <PrivateRoute Component={AdminApplicationDetails} />,
    },
    {
      path: "*",
      element: <PublicRoute Component={Home} />,
    },
    {
      path: "/admin/*",
      element: <PrivateRoute Component={AdminDashboard} />,
    },
  ]);

  return (
    <AuthProvider>
      <LoadingProvider>
        <ToastContainer newestOnTop={true} />
        <RouterProvider router={router} />
      </LoadingProvider>
    </AuthProvider>
  );
}

export default App;
