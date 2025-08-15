// Mensagem.jsx
import "./styleMensagem.css";
import Vampiro from "../../../assets/vamp.png";
import PropTypes from "prop-types";

export function Mensagem({ onFechar }) {
  return (
    <div className="CaixaPrincipalMensagem">
      {/* Cabeçalho */}
      <div id="cabecalhoMensagem">
        <div className="perfilPersongem">
          <img src={Vampiro} alt="Personagem" />
          Vampirinho
        </div>
        <div className="fecharCaixa" onClick={onFechar}>
          <span>X</span>
        </div>
      </div>

      {/* Caixa de mensagens */}
      <div className="historicoDeMensagens"></div>

      {/* Entrada de dados */}
      <div className="entradaDeDados">
        <input type="text" placeholder="O que deseja saber?" />
      </div>
    </div>
  );
}

Mensagem.propTypes = {
  onFechar: PropTypes.func.isRequired,
};