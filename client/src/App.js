import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home/Home";
import ApplicationStatus from "./screens/ApplicationStatus/ApplicationStatus";
import AdminLogin from "./screens/AdminLogin/AdminLogin";
import AdminApplicationList from "./screens/AdminApplicationList/AdminApplicationList";
import AdminApplicationDetails from "./screens/AdminApplicationDetails/AdminApplicationDetails";
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

function App() {
  const CustomSuspenseWrapper = () => {
    return (
      <Suspense fallback={<p>Bekleniyor...</p>}>
        <AdminDashboard />
      </Suspense>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/basvuru-olustur",
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
      element: <PrivateRoute Component={CustomSuspenseWrapper} />,
    },
    {
      path: "/admin/basvuru-listesi",
      element: <PrivateRoute Component={AdminApplicationList} />,
    },
    {
      path: "/admin/basvuru-listesi/:code",
      element: <PrivateRoute Component={AdminApplicationDetails} />,
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
