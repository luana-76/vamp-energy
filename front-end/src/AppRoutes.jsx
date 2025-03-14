import { Routes, Route } from "react-router-dom";
import { Principal } from "./components/Principal";
import { Login } from "./components/login/Login";
import { Cadastro } from "./components/cadastro/cadastro";
import { ErroInputVazio } from "./components/ErroVazio/ErroInpuVazio";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Principal />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro/>} />
      <Route path="/erro" element={<ErroInputVazio/>} />
    </Routes>
  );
}


