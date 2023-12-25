import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home/Home";
import ApplicationStatus from "./screens/ApplicationStatus/ApplicationStatus";
import AdminLogin from "./screens/AdminLogin/AdminLogin";
import AdminDashboard from "./screens/AdminDashboard/AdminDashboard";
import AdminApplicationList from "./screens/AdminApplicationList/AdminApplicationList";
import AdminApplicationDetails from "./screens/AdminApplicationDetails/AdminApplicationDetails";
import ApplicationDetails from "./screens/ApplicationDetails/ApplicationDetails";
import ApplicationSuccessful from "./screens/ApplicationSuccessful/ApplicationSuccessful";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/basvuru-olustur" replace />} />
        <Route path="/basvuru-olustur" element={<Home />} />
        <Route path="/basvuru-sorgula" element={<ApplicationStatus />} />
        <Route path="/basvuru-sorgula/:id" element={<ApplicationDetails />} />
        <Route path="/basvuru-basarili" element={<ApplicationSuccessful />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/panel" element={<AdminDashboard />} />
        <Route
          path="/admin/basvuru-listesi"
          element={<AdminApplicationList />}
        />
        <Route
          path="/admin/basvuru-listesi/:id"
          element={<AdminApplicationDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
