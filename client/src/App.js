import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Home from "./screens/Home/Home";
import ApplicationStatus from "./screens/ApplicationStatus/ApplicationStatus";
import AdminLogin from "./screens/AdminLogin/AdminLogin";
import AdminApplicationList from "./screens/AdminApplicationList/AdminApplicationList";
import AdminApplicationDetails from "./screens/AdminApplicationDetails/AdminApplicationDetails";
import ApplicationDetails from "./screens/ApplicationDetails/ApplicationDetails";
import ApplicationSuccessful from "./screens/ApplicationSuccessful/ApplicationSuccessful";
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
      element: <CustomSuspenseWrapper />,
    },
    {
      path: "/admin/basvuru-listesi",
      element: <AdminApplicationList />,
    },
    {
      path: "/admin/basvuru-listesi/:id",
      element: <AdminApplicationDetails />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
