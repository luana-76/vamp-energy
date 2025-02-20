import "./styleHeader.css";
import "./responsiveHeader.css";
import Dentadura from "../../assets/logoDentadura.png";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function Header() {
  const [activeLink, setActiveLink] = useState("Início");//Decoração de links
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);//DropDown responsivo
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);//Verificando se é mobile

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) {
        setIsDropdownOpen(false); // Fecha dropdown quando voltar para desktop
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //Decoração de link
  const handleClick = (item) => {
    setActiveLink(item);
  };

  return (
    <header>
      {/* Nav principal */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sombra"
      >
        <motion.img
          src={Dentadura}
          id="logoHeader"
          alt="logo dentadura"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        />

        <ul id="listaInterna">
          {["Início", "Informações", "Protótipo", "Surgimento", "Rodapé"].map(
            (item, index) => (
              <motion.li
                key={index}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                onClick={() => handleClick(item)}
              >
                <a
                  style={{ color: activeLink === item ? "#ff4141" : "#fff" }}
                >
                  {item}
                </a>
              </motion.li>
            )
          )}
        </ul>
      </motion.nav>

      {/* Nav Login */}
      <motion.nav
        id="log"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
        className="sombra"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          className="login-container"
          onClick={() => isMobile && setIsDropdownOpen(!isDropdownOpen)}
        >
          <img 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAWVJREFUSEvFlM8rRFEUxz/fZI2wsJxkZaPYytKGmqLY2NjZWPi1tFFKiaT8CbKRX9n4ByjJQrMiS1JYoJTimJnmTePNe3Nf983k7t6793w+59zOuaLBSw3mk0hgZkPAKtBbSugGWJJ07krQKTCzSWAXqpL5AbKSTmpJagrMrBW4B9piII9At6TPOIlLkAUOHNcwLOnMVzAPrDsEc5I2fQWjwLFDMCLp1FfQAtwBHTGAJ6BH0ruXoBBkZhPAXgSg0EVjkg69uygINLNBYK00B99ADliUdJF6DlwA175z0FwA136swMw6gQWgH+gD2kOwF+AauAQ2JD1HySIFZjaVB24DhS5Ksl6BaUlH4cNVAjObzT8NW0moEWfGJe1X/v8jMLMMcAs0eQo+gEzldYUFO8CMJzwIW5a0EnyEBQ9AV0rBlaSBOMEX0JxS8JZ//MrNEa7AUsKL4ZLK3P8btHpUUqymXqA4zi95YmAZ3ClLGQAAAABJRU5ErkJggg=="
          />
        </motion.div>

        {/* Dropdown no mobile */}
        {isMobile ? (
          isDropdownOpen && (
            <motion.div 
              id="dropdownMenu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.a
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
              >
                Entrar
              </motion.a>
              <motion.a
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
              >
                Cadastrar
              </motion.a>
            </motion.div>
          )
        ) : (
          /* Links normais no desktop */
          <div className="desktop-links">
            <a href="#">Entrar</a>
            <a href="#">Cadastrar</a>
          </div>
        )}
      </motion.nav>
    </header>
  );
}
