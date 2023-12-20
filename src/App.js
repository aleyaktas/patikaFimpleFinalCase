import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home/Home";
import ApplicationStatus from "./screens/ApplicationStatus/ApplicationStatus";
import AdminLogin from "./screens/AdminLogin/AdminLogin";
import AdminDashboard from "./screens/AdminDashboard/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/basvuru-olustur" replace />} />
        <Route path="/basvuru-olustur" element={<Home />} />
        <Route path="/basvuru-sorgula" element={<ApplicationStatus />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-panel" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
