import "./stylePartLata.css";
import "./responsiveMain.css";
import { CampText } from "./TextDoMain/campText";

import Tradicional from "../../assets/tradicional.png";
import Limao from "../../assets/limao.png";
import Misterioso from "../../assets/misterioso.png";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Main() {

  const [currentImage, setCurrentImage] = useState(Tradicional); // Estado inicial com a imagem preta
  const [isMobile, setIsMobile] = useState(false); // Evita erro no SSR

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    handleResize(); // chama uma vez ao montar
    window.addEventListener("resize", handleResize); // atualiza quando redimensiona

    return () => window.removeEventListener("resize", handleResize); // limpa
  }, []);

  return (
    <main id='mainPrincipal'>
      {isMobile ? (
        <div>

          <CampText />

          <div id='vampImagem'>

            <div className='mobileCaixa'>

              <img src={Tradicional} alt='vamp tradicional' className='latasMenores'/>

            </div>

            <div className='mobileCaixa' style={{margin: '0 10px'}}>

              <img src={Limao} className='latasMenores' alt='Vamp Limão'/>

            </div>

            <div className='mobileCaixa'>

              <img src={Misterioso} className='latasMenores' alt='Vamp Mistérioso'/>

            </div>

          </div>

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
                onClick={() => setCurrentImage(Tradicional)}
              ></button>
              <button
                className="colors"
                id="green"
                onClick={() => setCurrentImage(Limao)}
              ></button>
              <button
                className="colors"
                id="white"
                onClick={() => setCurrentImage(Misterioso)}
              ></button>
            </div>
          </div>

          {/* Animação da lata */}
          <div className="seguraBorda">

            <motion.img
              id="lata"
              src={currentImage}
              alt="Lata Vamp"
              initial={{ opacity: 0, scale: 1 }}
              animate={{
                opacity: 1,
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <div className="borda"></div>

          </div>

        </>
      )}
    </main>
  );
}
