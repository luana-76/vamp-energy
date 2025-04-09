import { useState } from "react";

const Credito = () => {
  const [numero, setNumero] = useState("");
  const [bandeira, setBandeira] = useState("");

  const detectarBandeira = (valor) => {
    const numeroLimpo = valor.replace(/\D/g, "");

    if (/^4/.test(numeroLimpo)) return "visa";
    if (/^5[1-5]/.test(numeroLimpo) || /^2(2[2-9]|[3-6]|7[01]|720)/.test(numeroLimpo)) return "mastercard";
    if (/^(6362|4389|5041|4514|5090)/.test(numeroLimpo)) return "elo";

    return "";
  };

  const handleChange = (e) => {
    const valor = e.target.value;
    setNumero(valor);
    const detectada = detectarBandeira(valor);
    setBandeira(detectada);
    console.log("Número:", valor, "Bandeira detectada:", detectada);
  };

  const bandeiras = {
    visa: "https://img.icons8.com/color/48/000000/visa.png",
    mastercard: "https://img.icons8.com/color/48/000000/mastercard-logo.png",
    elo: "https://logodownload.org/wp-content/uploads/2016/10/elo-logo-6.png",
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
      {bandeira && bandeiras[bandeira] && (
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
