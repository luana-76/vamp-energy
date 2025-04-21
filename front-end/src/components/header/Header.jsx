/* Setando estilos */
import "./styleHeader.css";
import "./responsiveHeader.css";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export function Header() {

  const [activeLink, setActiveLink] = useState("Início");/* Define o link ativo para destacar na navegação */
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);/* Para o dropDown */
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  const location = useLocation();

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // Define se está em modo mobile ou não
      if (window.innerWidth > 1024) {
        setIsDropdownOpen(false); // Fecha o menu dropdown se for desktop
      }
    };

    window.addEventListener("resize", handleResize); // Atualiza os estados 'isMobile' e 'isDropdownOpen' com base no tamanho da janela

    return () => window.removeEventListener("resize", handleResize); // Limpa o listener quando o componente for desmontado

  }, []);

  return (
    <header
      style={
        location.pathname === "/produtos"
          ? {
              background: "linear-gradient(rgba(17, 17, 17) 70%, #00000000)",
              zIndex: "9999",
            }
          : {}
      }
    >
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sombra"
      >

        {/* ========== Ícone e menu dropdown (mobile) ========== */}
       
        {/* Para quando estiver no mobile */}
        {!isMobile && (
          <ul id="listaInterna">
            {["Início", "Informações", "Produtos", "Surgimento", "Rodapé"].map(
              (item, index) => (
                <motion.li
                  key={index}
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                  onClick={() => setActiveLink(item)}
                >
                  <Link
                    to={
                      item === "Início"
                        ? "/"
                        : item === "Informações"
                        ? "/informacoes"
                        : item === "Produtos"
                        ? "/produtos"
                        : item === "Surgimento"
                        ? "/surgimento"
                        : item === "Rodapé"
                        ? "/rodape"
                        : "#"
                    }
                    style={{
                      color: activeLink === item ? "#ff4141" : "#fff",
                    }}
                  >
                    {item}
                  </Link>
                </motion.li>
              )
            )}
          </ul>
        )}
      </motion.nav>

      <motion.nav
        id="log"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
        className="sombra"
      >
        {/* Botão de abrir dropdown */}
        {isMobile && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
            className="login-container"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAWVJREFUSEvFlM8rRFEUxz/fZI2wsJxkZaPYytKGmqLY2NjZWPi1tFFKiaT8CbKRX9n4ByjJQrMiS1JYoJTimJnmTePNe3Nf983k7t6793w+59zOuaLBSw3mk0hgZkPAKtBbSugGWJJ07krQKTCzSWAXqpL5AbKSTmpJagrMrBW4B9piII9At6TPOIlLkAUOHNcwLOnMVzAPrDsEc5I2fQWjwLFDMCLp1FfQAtwBHTGAJ6BH0ruXoBBkZhPAXgSg0EVjkg69uygINLNBYK00B99ADliUdJF6DlwA175z0FwA136swMw6gQWgH+gD2kOwF+AauAQ2JD1HySIFZjaVB24DhS5Ksl6BaUlH4cNVAjObzT8NW0moEWfGJe1X/v8jMLMMcAs0eQo+gEzldYUFO8CMJzwIW5a0EnyEBQ9AV0rBlaSBOMEX0JxS8JZ//MrNEa7AUsKL4ZLK3P8btHpUUqymXqA4zi95YmAZ3ClLGQAAAABJRU5ErkJggg=="
              style={{
                filter: isDropdownOpen
                  ? "drop-shadow(0px 0px 10px #ffffff)"
                  : "none",
              }}
              alt="Ícone de menu"
            />
          </motion.div>
        )}

        {/* Overlay escuro ao abrir dropdown */}
        {isMobile && isDropdownOpen && (
          <div className="overlay" onClick={() => setIsDropdownOpen(false)} />
        )}

        {/* Menu dropdown lateral para mobile */}
        {isMobile && isDropdownOpen && (
          <motion.div
            id="dropdownMenu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            
          >
            {["Início", "Informações", "Produtos", "Surgimento", "Rodapé"].map(
              (item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                  className={item === "Rodapé" ? "bordaSeparatoria" : "padraoLi"}
                >
                  <Link
                    to={
                      item === "Início"
                        ? "/"
                        : item === "Informações"
                        ? "/informacoes"
                        : item === "Produtos"
                        ? "/produtos"
                        : item === "Surgimento"
                        ? "/surgimento"
                        : item === "Rodapé"
                        ? "/rodape"
                        : "#"
                    }
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setActiveLink(item);
                    }}

                  >
                    {item}
                  </Link>
                </motion.div>
              )
            )}

            {/* Login/Cadastro */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.2 }}
            >

              <Link to="/login" onClick={() => setIsDropdownOpen(false)}>
                Entrar
              </Link>

            </motion.div>
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.4 }}
            >

              <Link to="/cadastro" onClick={() => setIsDropdownOpen(false)}>
                Cadastrar
              </Link>

            </motion.div>
            
          </motion.div>
        )}

        {/* ========== Navegação principal (desktop) ========== */}
        {/* ========== Links "Entrar" e "Cadastrar" (desktop) ========== */}

        {!isMobile && (
          <div className="auth-desktop" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>

            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAWVJREFUSEvFlM8rRFEUxz/fZI2wsJxkZaPYytKGmqLY2NjZWPi1tFFKiaT8CbKRX9n4ByjJQrMiS1JYoJTimJnmTePNe3Nf983k7t6793w+59zOuaLBSw3mk0hgZkPAKtBbSugGWJJ07krQKTCzSWAXqpL5AbKSTmpJagrMrBW4B9piII9At6TPOIlLkAUOHNcwLOnMVzAPrDsEc5I2fQWjwLFDMCLp1FfQAtwBHTGAJ6BH0ruXoBBkZhPAXgSg0EVjkg69uygINLNBYK00B99ADliUdJF6DlwA175z0FwA136swMw6gQWgH+gD2kOwF+AauAQ2JD1HySIFZjaVB24DhS5Ksl6BaUlH4cNVAjObzT8NW0moEWfGJe1X/v8jMLMMcAs0eQo+gEzldYUFO8CMJzwIW5a0EnyEBQ9AV0rBlaSBOMEX0JxS8JZ//MrNEa7AUsKL4ZLK3P8btHpUUqymXqA4zi95YmAZ3ClLGQAAAABJRU5ErkJggg=="
              alt="Ícone de menu"
              style={{ width: "30px", height: "30px" }}
            />

            <div className='desktop-links'>

              <Link to="/login">Entrar</Link>
              <Link to="/cadastro">Cadastrar</Link>

            </div>
      
          </div>
        )}

      </motion.nav>
    </header>
  );
}