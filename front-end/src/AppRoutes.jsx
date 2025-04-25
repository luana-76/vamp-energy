import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import { Principal } from "./components/Principal";
import { Login } from "./components/login/Login";
import { Cadastro } from "./components/cadastro/cadastro";
import { ErroInputVazio } from "./components/ErroVazio/ErroInpuVazio";
import { MainProduto } from "./components/paginaProduto/MainProduto";
import { VisualizacaoProduto } from "./components/paginaProduto/SecaoProdutos/produto/VisualizacaoProduto/visualizacaoProduto";
import { ComprarProduto } from "./components/PaginaComprar/ComprarProduto";
import { PagamentoQr } from "./components/PaginaComprar/Qr/PagamentoQr";
import Credito from "./components/PaginaComprar/CartaoCredito/Credito";
import { Confirmacao } from "./components/ConfimacaoCompra/Confirmacao";

export default function AppRoutes() {

  const [isLoading, setIsLoading] = useState(true);
  
      useEffect(() => {
          const images = document.querySelectorAll("img");
          let loadedCount = 0;
  
          images.forEach((img) => {
              if (img.complete) {
                  loadedCount++;
              } else {
                  img.addEventListener("load", () => {
                      loadedCount++;
                      if (loadedCount === images.length) {
                          setIsLoading(false);
                      }
                  });
              }
          });
  
          // Caso todas já estejam carregadas
          if (loadedCount === images.length) {
              setIsLoading(false);
          }
      }, []);
  
      if (isLoading) {
          return (
              <div className="loader">
                  <div className="spinner"></div>
                  <p>Carregando...</p>
              </div>
          );
      }

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
      <Route path='/confirmando' element={<Confirmacao/>} />
    </Routes>
  );
}


