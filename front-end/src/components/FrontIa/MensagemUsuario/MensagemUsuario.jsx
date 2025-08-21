// MensagemUsuario.jsx
import "./enviarMensagem.css";
import PropTypes from "prop-types";

export function MensagemUsuario({ texto }) {
  return (
    <div className="mensagem">
      {texto}
    </div>
  );
}

MensagemUsuario.propTypes = {
  texto: PropTypes.string.isRequired,
};
