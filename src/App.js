import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ApplicationStatus from "./components/ApplicationStatus/ApplicationStatus";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import Home from "./screens/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/basvuru-olustur" replace />} />
        <Route path="/basvuru-olustur" element={<Home />} />
        <Route path="/basvuru-sorgula" element={<ApplicationStatus />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
