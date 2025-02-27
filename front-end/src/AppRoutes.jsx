import { Routes, Route } from "react-router-dom";
import { Principal } from "./components/Principal";
import { Login } from "./components/login/Login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Principal />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}


