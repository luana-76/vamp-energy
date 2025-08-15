import { useState } from "react";
import Logo from "../../assets/logo.png";
import "./styleIa.css";
import { Mensagem } from "./BoxMensagem/Mensagem";


export function FrontIa() {
  const [mostrarMensagem, setMostrarMensagem] = useState(false);

  return (
    <>
      {!mostrarMensagem && (
        <div
          className="vampBall"
          onClick={() => setMostrarMensagem(true)}
        >
          <img src={Logo} alt="logo vamp" />
        </div>
      )}

      {mostrarMensagem && (
        <Mensagem onFechar={() => setMostrarMensagem(false)} />
      )}
    </>
  );
}
