import { Routes, Route } from "react-router-dom";
import { Principal } from "./components/Principal";
import { Login } from "./components/login/Login";
import { Cadastro } from "./components/cadastro/cadastro";
import { ErroInputVazio } from "./components/ErroVazio/ErroInpuVazio";
import { MainProduto } from "./components/paginaProduto/MainProduto";
import { VisualizacaoProduto } from "./components/paginaProduto/SecaoProdutos/produto/VisualizacaoProduto/visualizacaoProduto";
import { ComprarProduto } from "./components/PaginaComprar/ComprarProduto";
import { PagamentoQr } from "./components/PaginaComprar/Qr/PagamentoQr";
import Credito from "./components/PaginaComprar/CartaoCredito/Credito";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Principal />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro/>} />
      <Route path="/erro" element={<ErroInputVazio/>} />
      <Route path='/produtos' element={<MainProduto/>} />
      <Route path='/secaoProduto' element={<VisualizacaoProduto/>} />
      <Route path='/comprar' element={<ComprarProduto/>} />
      <Route path='/qrTeste' element={<PagamentoQr/>} />
      <Route path='/credito' element={<Credito/>} />
    </Routes>
  );
}


