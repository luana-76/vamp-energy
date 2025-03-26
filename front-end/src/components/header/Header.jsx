import "./styleHeader.css";
import "./responsiveHeader.css";
import Dentadura from "../../assets/logoDentadura.png";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const [activeLink, setActiveLink] = useState("Início");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768);
  
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      setIsTablet(window.innerWidth >= 768);

      if (window.innerWidth > 1024) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Se estiver na página de login ou cadastro, exibe apenas a logo
  if (location.pathname === "/login" || location.pathname === "/cadastro") {
    return (
      <header>
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="sombra"
        >
          <Link to="/produtos">
            <motion.img
              src={Dentadura}
              id="logoHeader"
              alt="logo dentadura"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            />
          </Link>
        </motion.nav>
      </header>
    );
  }

  return (
    <header>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sombra"
      >
        <Link to="/produtos">
          <motion.img
            src={Dentadura}
            id="logoHeader"
            alt="logo dentadura"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          />
        </Link>

        <ul id="listaInterna">
          {["Início", "Informações", "Protótipo", "Surgimento", "Rodapé"].map(
            (item, index) => (
              <motion.li
                key={index}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                onClick={() => setActiveLink(item)}
              >
                <a style={{ color: activeLink === item ? "#ff4141" : "#fff" }}>
                  {item}
                </a>
              </motion.li>
            )
          )}
        </ul>
      </motion.nav>

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
          onClick={() => (isMobile || isTablet) && setIsDropdownOpen(!isDropdownOpen)}
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAWVJREFUSEvFlM8rRFEUxz/fZI2wsJxkZaPYytKGmqLY2NjZWPi1tFFKiaT8CbKRX9n4ByjJQrMiS1JYoJTimJnmTePNe3Nf983k7t6793w+59zOuaLBSw3mk0hgZkPAKtBbSugGWJJ07krQKTCzSWAXqpL5AbKSTmpJagrMrBW4B9piII9At6TPOIlLkAUOHNcwLOnMVzAPrDsEc5I2fQWjwLFDMCLp1FfQAtwBHTGAJ6BH0ruXoBBkZhPAXgSg0EVjkg69uygINLNBYK00B99ADliUdJF6DlwA175z0FwA136swMw6gQWgH+gD2kOwF+AauAQ2JD1HySIFZjaVB24DhS5Ksl6BaUlH4cNVAjObzT8NW0moEWfGJe1X/v8jMLMMcAs0eQo+gEzldYUFO8CMJzwIW5a0EnyEBQ9AV0rBlaSBOMEX0JxS8JZ//MrNEa7AUsKL4ZLK3P8btHpUUqymXqA4zi95YmAZ3ClLGQAAAABJRU5ErkJggg=="
            style={{ filter: isDropdownOpen ? "drop-shadow(0px 0px 10px #ffffff)" : "none" }}
          />
        </motion.div>

        {(isMobile || isTablet) && isDropdownOpen && (
          <div className="overlay" onClick={() => setIsDropdownOpen(false)} />
        )}

        {isMobile ? (
          isDropdownOpen && (
            <motion.div
              id="dropdownMenu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 1 }}>
                <Link to="/login">Entrar</Link>
              </motion.div>
              <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 1.3 }}>
                <Link to="/cadastro">Cadastrar</Link>
              </motion.div>
            </motion.div>
          )
        ) : (
          <div className="desktop-links">
            <Link to="/login">Entrar</Link>
            <Link to="/cadastro">Cadastrar</Link>
          </div>
        )}
      </motion.nav>
    </header>
  );
}
