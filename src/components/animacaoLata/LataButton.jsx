import "./styleLataButton.css";
import Black from "../../assets/lata.png";
import Yellow from "../../assets/yellow.png";
import Blue from "../../assets/blue.png";
import { useState } from "react";
import { CampText } from "../textMain/campText";
import { motion } from "framer-motion";

export function Main() {
  const [currentImage, setCurrentImage] = useState(Black); // Estado inicial com a imagem preta

  return (
    <main>
      <div id="sepTextButtons">
        <CampText />

        {/* Botões de mudar de cor */}
        <div id="buttons">
          <button
            className="colors"
            id="black"
            onClick={() => setCurrentImage(Black)}
          ></button>
          <button
            className="colors"
            id="blue"
            onClick={() => setCurrentImage(Blue)}
          ></button>
          <button
            className="colors"
            id="yellow"
            onClick={() => setCurrentImage(Yellow)}
          ></button>
        </div>
      </div>

      {/* Parte onde fica a lata */}
      <div className="seguraBorda">
        <motion.img
          id="lata"
          src={currentImage}
          alt="Lata Vamp"
          initial={{ opacity: 0 }} // Começa invisível
          animate={{ opacity: 1 }} // Fica visível
          transition={{ duration: 1.5, ease: "easeOut" }} // Animação suave de 1.5s
        />
        <div className="borda"></div>
      </div>
    </main>
  );
}
