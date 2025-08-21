import "./MensagemIa.css";
import PropTypes from "prop-types";

export function MensagemIa({ texto }) {
  return (
    <div className="mensagemIa mensagem">
      {texto}
    </div>
  );
}

MensagemIa.propTypes = {
  texto: PropTypes.string.isRequired,
};
