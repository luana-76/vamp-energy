import "./styleMensagem.css";
import PropTypes from "prop-types";
import { MensagemUsuario } from "../MensagemUsuario/MensagemUsuario";
import { MensagemIa } from "../MensagemIa/MensagemIa";
import { useState, useRef, useEffect } from "react";
import Vampiro from "../../../assets/vamp.png";

export function Mensagem({ onFechar }) {
  const [mensagem, setMensagem] = useState("");
  const [listaMensagens, setListaMensagens] = useState([]);

  const historicoRef = useRef(null); // ref para o histórico de mensagens

  const handleEnviar = async () => {
    if (mensagem.trim() === "") return;

    // adiciona mensagem do usuário
    setListaMensagens((prev) => [...prev, { autor: "usuario", texto: mensagem }]);
    setMensagem("");

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCLuo02ZiVj-NB94pFjahWxEof-7dizTnM",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: mensagem }] }] }),
        }
      );

      const data = await response.json();
      const resposta = data.candidates[0]?.content?.parts[0]?.text || "Sem resposta";

      // adiciona mensagem da IA
      setListaMensagens((prev) => [...prev, { autor: "ia", texto: resposta }]);
    } catch (err) {
      console.error(err);
      setListaMensagens((prev) => [...prev, { autor: "ia", texto: "Erro ao gerar resposta 😢" }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleEnviar();
  };

  // faz scroll para baixo sempre que uma mensagem nova da IA for adicionada
  useEffect(() => {
    if (historicoRef.current) {
      historicoRef.current.scrollTop = historicoRef.current.scrollHeight;
    }
  }, [listaMensagens]); // dispara sempre que listaMensagens mudar

  return (
    <div className="CaixaPrincipalMensagem">
      <div id="cabecalhoMensagem">
        <div className="perfilPersongem">
          <img src={Vampiro} alt="Personagem" />
          Vampirinho
        </div>
        <div className="fecharCaixa" onClick={onFechar}>
          <span>X</span>
        </div>
      </div>

      <div className="historicoDeMensagens" ref={historicoRef}>
        {listaMensagens.map((msg, index) =>
          msg.autor === "usuario" ? (
            <MensagemUsuario key={index} texto={msg.texto} />
          ) : (
            <MensagemIa key={index} texto={msg.texto} />
          )
        )}
      </div>

      <div className="entradaDeDados">
        <input
          type="text"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="O que deseja saber?"
        />
        <button onClick={handleEnviar}>Enviar</button>
      </div>
    </div>
  );
}

Mensagem.propTypes = {
  onFechar: PropTypes.func.isRequired,
};
