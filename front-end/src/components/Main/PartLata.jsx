import "./stylePartLata.css";
import "./responsiveLata.css";
import Black from "../../assets/lata.png";
import Yellow from "../../assets/yellow.png";
import Blue from "../../assets/blue.png";
import VampLogo from "../../assets/mobile.png";
import { useState, useEffect } from "react";
import { CampText } from "./TextDoMain/campText";
import { motion } from "framer-motion";

export function Main() {
  const [currentImage, setCurrentImage] = useState(Black); // Estado inicial com a imagem preta
  const [isMobile, setIsMobile] = useState(false); // Evita erro no SSR

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768); // Define o valor correto no client-side

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main>
      {isMobile ? (
        <div>

          <div id='vampImagem'>

            <img src={VampLogo} alt='vampiro vamp'/>

          </div>
          <CampText />
        </div>
        
      ) : (
        <>
          <div id="sepTextButtons">
            <CampText />

            {/* Botões para mudar a lata de cor */}
            <div id="buttons" className="sombra">
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

          {/* Animação da lata */}
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
        </>
      )}
    </main>
  );
}
