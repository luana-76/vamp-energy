import "./styleCampText.css";
import LogoCentral from "../../../assets/l.png";
import { motion } from "framer-motion"; 

export function CampText() {
  return (

    <motion.div
      className="seguraBorda"
      initial={{ x: -300, opacity: 0 }} // Começa fora da tela (esquerda)
      animate={{ x: 0, opacity: 1 }} // Vem para posição normal e fica visível
      transition={{ duration: 1, ease: "easeOut" }} // Tempo e suavidade
    >

      <img id="logoCentral" src={LogoCentral} alt="logo vamp energy" />

      <p>
        Nas luxuosas de uma noite sem fim, onde a energia se esvai e o corpo pede
        por vigor, surge Vamp, uma bebida emprestada que renasce seu espírito.
        Inspirado na força imortal e na resistência dos vampiros, Vamp é sua dose de poder para enfrentar qualquer desafio. Um gole e você sentirá o sangue novo correndo em
        suas veias, pronto para conquistar o impossível.
      </p>

      {/* Parte do botão de Ler Mais */}
      <div className="buttons">
        <button className="blob-btn">
          Ler
          <span className="blob-btn__inner">
            <span className="blob-btn__blobs">
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
            </span>
          </span>
        </button>
        <br />

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                result="goo"
              ></feColorMatrix>
              <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
            </filter>
          </defs>
        </svg>

      </div>

    </motion.div>
    
  );
}
