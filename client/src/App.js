import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Home from "./screens/Home/Home";
import ApplicationStatus from "./screens/ApplicationStatus/ApplicationStatus";
import AdminLogin from "./screens/AdminLogin/AdminLogin";
import AdminApplicationList from "./screens/AdminApplicationList/AdminApplicationList";
import AdminApplicationDetails from "./screens/AdminApplicationDetails/AdminApplicationDetails";
import ApplicationDetails from "./screens/ApplicationDetails/ApplicationDetails";
import ApplicationSuccessful from "./screens/ApplicationSuccessful/ApplicationSuccessful";
import { AuthProvider } from "./context/AuthContext";
import { LoadingProvider } from "./context/Loading";
import PrivateRoute from "./routes/PrivateRoute";
import "./App.css";

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
      element: <Home />,
    },
    {
      path: "/basvuru-sorgula",
      element: <ApplicationStatus />,
    },
    {
      path: "/basvuru-sorgula/:code",
      element: <ApplicationDetails />,
    },
    {
      path: "/basvuru-basarili",
      element: <ApplicationSuccessful />,
    },
    {
      path: "/admin",
      element: <AdminLogin />,
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
      path: "/admin/basvuru-listesi/:id",
      element: <PrivateRoute Component={AdminApplicationDetails} />,
    },
  ]);

  return (
    <AuthProvider>
      <LoadingProvider>
        <RouterProvider router={router} />
      </LoadingProvider>
    </AuthProvider>
  );
}

export default App;
