import { useState } from "react";
import hipercard from "../../../assets/produto/hipercard1.png"
import elo from "../../../assets/produto/elo.png"

const Credito = () => {
  const [numero, setNumero] = useState("");
  const [bandeira, setBandeira] = useState("");

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

  const bandeiras = {
    visa: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADj0lEQVR4nO1YW0hUQRjet156qdyMMnoJjMgieioKegi6YBFRBJUksWtqQphWKFRqF1MUjUqzRBAJybxl5oOo56zX1NXVvKSta4qb98vuestd849/1p09B3bdBw+4ynzwwzn//DPzf/NfBkYmY2BgYGBg2EjY4q/a7aHgc+VKziRX8uAewpk8FHzBtlvl3i6dlyu5ibV3mHcsCm4SfXRKwHrybuCociUSfI5TAu6VNryzKBhXIOAGDipdCyMgZxHgWQo5xIYpYu+QIohJDoLm/IPQVugDLfkHIOXdNfAMqKCLeAVXwvT8IiAWLEuw714NlGjGwIYzsc3Ebu/dakgu6YfW/mmYnLGAYdYCLX0miMjWipw697IZhDj0oG71Xeh4eCaM1foCqDYRuR4dR8duprTTzQobR4nu19As1aHje0KqoGvQrhMipXRAtFd+w4ho3O9tuzRtNCpXBzCYDkuqzfAqVUH1efX2DS8ltsLOQBWYF5fI/7BhgdiEZnZTm6quKTgfr4GT0Wp4nNMDV5N/0LV87tfSuTYkFvdJQ+DUsybriuNFoCs/TXS7gyth5q81fX6PzsH2AB6OPmoQOYt2T/N6qe59ud6pQwnFfcRmcsYMA+Pz5LusbUIaAjtuq2Bq1kIWne5JIjr/VHv6oJOo83vTRnUZ3B+i843TiE61occIF+I1ovV3BVXCqHGBjKdX6Ek6kvMymaW7iWlxWgxwLLIUChqsm2DY94fVEptoTLVlCAv0eUEvWP6J0yPpWz8dv5Pxk+ox2jF59nUOP6yThkBktpYuqkjrgNnl9PnaZC1elI/VQ9TmclKruBk8aRR1KATWglzJg6bPRP479TPkH+fagJGWhMCJqEa6aPvANP2+InC0Xmtw2QKL1NbIIW68boOzsfbW2TsyB1/UoyT3HUVqVQSwSMdMZtEJ9o/Ng2eA3QYLEIF3A9rjPZBWpiftFvM+8EMnmYPA+wDbbJ6gkzkC1zEpDQEUW97b8KLAWrwo3qE1VI8pYct9R8CL7GJCi6h11msNEJbVTUWtMy4TNZPDkIRAeJa9p2NRogO2MWG3+Vw3THRYK406IzltvKkx9bC3I1lh60RglIR7CckfifguDQF3EhkjoGQRAJZC6/dZhTfInAGf79bcQaUr4T45JYBvj/h8t/ZO8g7FQ8GPb1VwXjKX76MKPgdfwNwnbTgjnrxL5xkYGBgYGGTrDP8B3Ygzc5EqX04AAAAASUVORK5CYII=",

    mastercard: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACiElEQVR4nO2YT08TQRjGfxy9SDx5heBZQEgKVkIw+gEEAt5NPBlPHDwJxa9gulu+S+3FQLzaHVo0Sjx40HDR8q9FfM2024TYXbrdlxJI5kmeZLPpJM9v3pnpvAtOTk5OTk5O10ACAxWYMLBuoBRA1cB+6Ip9ZyC3DfcixwsDkmdCPNbFpyQ+VfHYD10J3+WkED1eFdzAUgA7BiSJLVwAi3ZsM7jHknjsiI8kdFU8Fu1YVfgyjBj4kDT4//4yyHZjpTm7ktJbssFwqvABPDDwI234b7eQ02nk9D5y9Cw1gIjPnuR52OvMzxloaML/zSIy07J9PtZAeNSlwGyi8FUYDuBn2vCfb7Rmvh2+7dMs0nilrMRb7iTZsKnXvPXhWGf4to8ziORVldg8d2MbWNaE/347Pnzbh8uqKojkWYid/V6OyijXJ7sDNKaaM6mpQiUS4CNMasLvDnYP33b9hboK4x0AAbzRAOwNJwc4eKQE8FiLWv8lDcDB3eQAR1NKAJ9iVAU+aQBOMskBTqbVANWoCtQ0AGf/uLq5+VsdQC2qAr+vEcCvKICda7OEvIij1MC7S9vEmT5sYgO5SztGH6sr8LoDwHZSGoDdmz38kb1UA4zGXSWqGojjiQRXiYzyKuHbuY6RbQP7fZk7eqqe/SexAGEVtjQQh6N9vE77vO/aJ1dgSNvQ/OlXQ1Ng5NzwZzb0rIH6hbaUz1XLpi55ZuhFZchemaa+wBxpFPbHm2khvg5SbqwQqNa8xxAa2Y1dhoXw61vS8NtlmD/zRW4h/PqW+KgUvzX+QmVg3MCagWIIVAttn4sBrAYwFjsZecZtM2KvAiFQrenWc1F8VmUjfryTk5OTk5MTV0z/ALnrNppe6tHoAAAAAElFTkSuQmCC",

    elo: elo,
    hipercard: hipercard,
  };

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: "10px" }}>Digite o número do cartão</h2>
      <input
        type="text"
        value={numero}
        onChange={handleChange}
        placeholder="Ex: 4111 1111 1111 1111"
        style={styles.input}
      />
      {bandeira && (
        <img
          src={bandeiras[bandeira]}
          alt={`Bandeira ${bandeira}`}
          style={styles.logo}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    background: "#1e1e1e",
    padding: "20px",
    borderRadius: "10px",
    color: "#fff",
    fontFamily: "sans-serif",
    textAlign: "center",
    width: "300px",
    margin: "100px auto",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "none",
    width: "100%",
    marginBottom: "20px",
  },
  logo: {
    height: "40px",
    transition: "opacity 0.3s ease",
  },
};

export default Credito;



