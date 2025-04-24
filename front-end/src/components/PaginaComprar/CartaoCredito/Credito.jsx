import { useState } from "react";
import hipercard from "../../../assets/produto/hipercard1.png";
import elo from "../../../assets/produto/elo.png";
import './styleCredito.css';
import PropTypes from 'prop-types';
import InputMask from "react-input-mask";

const Credito = ({fechar}) => {
  const [numero, setNumero] = useState("");
  const [bandeira, setBandeira] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const [nomeTitular, setNomeTitular] = useState("");

  const detectarBandeira = (valor) => {
    const numeroLimpo = valor.replace(/\D/g, "");

    if (/^4/.test(numeroLimpo)) return "visa";
    if (/^5[1-5]/.test(numeroLimpo) || /^2(2[2-9]|[3-6]|7[01]|720)/.test(numeroLimpo)) return "mastercard";
    if (/^6362|4389|5041|4514|5090/.test(numeroLimpo)) return "elo";
    if (/^606282|3841/.test(numeroLimpo)) return "hipercard";
    return "";
  };

  const handleChange = (e) => {
    const valor = e.target.value;
    setNumero(valor);
    const detectada = detectarBandeira(valor);
    setBandeira(detectada);
  };

  return (
    <div className="overlay">
      <section className="container-credito">

        <div id="close" onClick={fechar} style={{ cursor: 'pointer' }}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARlJREFUSEvt1M8qxUEYxvHP2SrZEMpCUlyD/Cls5TZkq9yJzsZKuQG5AmSFbP3JmiVX4PfWqF/6nZlx6mRzZjm98zzv8513pmfEqzdifWODIuF/R3SMM7wPaHUFGzgdFCWX4BAneMFmh8kyrjGHfVx0meQM4mAIhNBr6vQnyRJuMYtHbOHrrwZR32UyUSseAjWXPI+rlOQJU8n4vkm4g8/cKNUYxPmFhGsxiWWxtA1rDYJ1MA/2sR6aVNul7msRhfhNQvScEMXeXbO/WzIpJWh3/oY1TLbGs5gkZ9Al/pEQxegGspkSrpzBQTPnfQSWmPPfr3k1JZnGHi6HeQdHOM98FWGyPuxXUfwpawpKl1yjka0ZGxQRjhzRNxi0NBmpupZSAAAAAElFTkSuQmCC" alt="fechar" />
        </div>
        
        <div className="logos">

          {/* Caixa de logos dos cartões */}
          <div className="caixaLogo">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADj0lEQVR4nO1YW0hUQRjet156qdyMMnoJjMgieioKegi6YBFRBJUksWtqQphWKFRqF1MUjUqzRBAJybxl5oOo56zX1NXVvKSta4qb98vuestd849/1p09B3bdBw+4ynzwwzn//DPzf/NfBkYmY2BgYGBg2EjY4q/a7aHgc+VKziRX8uAewpk8FHzBtlvl3i6dlyu5ibV3mHcsCm4SfXRKwHrybuCociUSfI5TAu6VNryzKBhXIOAGDipdCyMgZxHgWQo5xIYpYu+QIohJDoLm/IPQVugDLfkHIOXdNfAMqKCLeAVXwvT8IiAWLEuw714NlGjGwIYzsc3Ebu/dakgu6YfW/mmYnLGAYdYCLX0miMjWipw697IZhDj0oG71Xeh4eCaM1foCqDYRuR4dR8duprTTzQobR4nu19As1aHje0KqoGvQrhMipXRAtFd+w4ho3O9tuzRtNCpXBzCYDkuqzfAqVUH1efX2DS8ltsLOQBWYF5fI/7BhgdiEZnZTm6quKTgfr4GT0Wp4nNMDV5N/0LV87tfSuTYkFvdJQ+DUsybriuNFoCs/TXS7gyth5q81fX6PzsH2AB6OPmoQOYt2T/N6qe59ud6pQwnFfcRmcsYMA+Pz5LusbUIaAjtuq2Bq1kIWne5JIjr/VHv6oJOo83vTRnUZ3B+i843TiE61occIF+I1ovV3BVXCqHGBjKdX6Ek6kvMymaW7iWlxWgxwLLIUChqsm2DY94fVEptoTLVlCAv0eUEvWP6J0yPpWz8dv5Pxk+ox2jF59nUOP6yThkBktpYuqkjrgNnl9PnaZC1elI/VQ9TmclKruBk8aRR1KATWglzJg6bPRP479TPkH+fagJGWhMCJqEa6aPvANP2+InC0Xmtw2QKL1NbIIW68boOzsfbW2TsyB1/UoyT3HUVqVQSwSMdMZtEJ9o/Ng2eA3QYLEIF3A9rjPZBWpiftFvM+8EMnmYPA+wDbbJ6gkzkC1zEpDQEUW97b8KLAWrwo3qE1VI8pYct9R8CL7GJCi6h11msNEJbVTUWtMy4TNZPDkIRAeJa9p2NRogO2MWG3+Vw3THRYK406IzltvKkx9bC3I1lh60RglIR7CckfifguDQF3EhkjoGQRAJZC6/dZhTfInAGf79bcQaUr4T45JYBvj/h8t/ZO8g7FQ8GPb1VwXjKX76MKPgdfwNwnbTgjnrxL5xkYGBgYGGTrDP8B3Ygzc5EqX04AAAAASUVORK5CYII="
              alt="Hipercard"
              className={`logo ${bandeira === "visa" ? "destaque" : ""}`}
            />
          </div>

          <div className="caixaLogo">
          
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACiElEQVR4nO2YT08TQRjGfxy9SDx5heBZQEgKVkIw+gEEAt5NPBlPHDwJxa9gulu+S+3FQLzaHVo0Sjx40HDR8q9FfM2024TYXbrdlxJI5kmeZLPpJM9v3pnpvAtOTk5OTk5O10ACAxWYMLBuoBRA1cB+6Ip9ZyC3DfcixwsDkmdCPNbFpyQ+VfHYD10J3+WkED1eFdzAUgA7BiSJLVwAi3ZsM7jHknjsiI8kdFU8Fu1YVfgyjBj4kDT4//4yyHZjpTm7ktJbssFwqvABPDDwI234b7eQ02nk9D5y9Cw1gIjPnuR52OvMzxloaML/zSIy07J9PtZAeNSlwGyi8FUYDuBn2vCfb7Rmvh2+7dMs0nilrMRb7iTZsKnXvPXhWGf4to8ziORVldg8d2MbWNaE/347Pnzbh8uqKojkWYid/V6OyijXJ7sDNKaaM6mpQiUS4CNMasLvDnYP33b9hboK4x0AAbzRAOwNJwc4eKQE8FiLWv8lDcDB3eQAR1NKAJ9iVAU+aQBOMskBTqbVANWoCtQ0AGf/uLq5+VsdQC2qAr+vEcCvKICda7OEvIij1MC7S9vEmT5sYgO5SztGH6sr8LoDwHZSGoDdmz38kb1UA4zGXSWqGojjiQRXiYzyKuHbuY6RbQP7fZk7eqqe/SexAGEVtjQQh6N9vE77vO/aJ1dgSNvQ/OlXQ1Ng5NzwZzb0rIH6hbaUz1XLpi55ZuhFZchemaa+wBxpFPbHm2khvg5SbqwQqNa8xxAa2Y1dhoXw61vS8NtlmD/zRW4h/PqW+KgUvzX+QmVg3MCagWIIVAttn4sBrAYwFjsZecZtM2KvAiFQrenWc1F8VmUjfryTk5OTk5MTV0z/ALnrNppe6tHoAAAAAElFTkSuQmCC" 
              alt="mastercard"
              className={`logo ${bandeira === "mastercard" ? "destaque" : ""}`}
            />
          </div>

          <div className="caixaLogo">

            <img
              src={hipercard}
              alt="Hipercard"
              className={`logo ${bandeira === "hipercard" ? "destaque" : ""}`}
            />

          </div>

          <div className="caixaLogo">

            <img
              src={elo}
              alt="Elo"
              className={`logo ${bandeira === "elo" ? "destaque" : ""}`}
            />

          </div>
        </div>

        {/*Formulário*/}
        <form className="formularioCartao">

          <InputMask
            mask="9999 9999 9999 9999"
            value={numero}
            onChange={handleChange}
            className="input"
            placeholder="____ ____ ____ ____"
          />

          <input
            type="text"
            placeholder="Nome No Cartão"
            value={nomeTitular}
            onChange={(e) => setNomeTitular(e.target.value)}
          />

          <div className="divisaoCvvData">

            <InputMask
              mask="999"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="cvv"
              placeholder="___"
            />

            <InputMask
              mask="99/99"
              value={validade}
              onChange={(e) => setValidade(e.target.value)}
              className="data"
              placeholder="MM/AA"
            />

          </div>

          <p>Seus dados estarão totalmente seguros com a Vamp.</p>

          <input type='button' value="Confirmar"/>

        </form>

      </section>
    </div>
  );
};

export default Credito;

//Consertando erro de prop
Credito.propTypes = {
    fechar: PropTypes.func.isRequired,
};
