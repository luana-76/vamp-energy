// Estilos e dependências
import "./styleHeader.css";
import "./responsiveHeader.css";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";

export function Header() {

  const [activeLink, setActiveLink] = useState("Início"); // Link ativo da navegação
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado do menu dropdown
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024); // Define se está em modo mobile

  //Muda o header, essa linha define se o usuário está logado ou não
  const [usuarioLogado, setUsuarioLogado] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [fotoUsuario, setFotoUsuario] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  // Atualiza o estado de mobile e fecha dropdown ao redimensionar a tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [cor, setCor] = useState("transparent");

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.scrollY === 0) {
        setCor("transparent");
      } else {
        setCor("linear-gradient(rgba(17, 17, 17) 70%, #00000000)");
      }
    }, 1000);

    // Limpa o intervalo quando desmontar
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {

  const estaLogado = localStorage.getItem("usuarioLogado") === "true";
  setUsuarioLogado(estaLogado);

  if (estaLogado) {

    const nome = localStorage.getItem("nomeUsuario") || "";
    const foto = (localStorage.getItem("fotoUsuario") || "").trim();

    setNomeUsuario(nome);
    setFotoUsuario(foto);

  } else {

    setNomeUsuario('');
    setFotoUsuario('');

  }
}, [location.pathname]);
  
 useEffect(() => {
  const usuarioId = localStorage.getItem("idUsuario");

  if (usuarioId) {
    fetch(`http://localhost:3000/perfil/${usuarioId}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          console.log(data)
          localStorage.setItem("fotoUsuario", data.foto)
          localStorage.setItem("nomeUsuario", data.nome)
        }
      })
      .catch(err => console.error("Erro ao buscar usuário:", err));
  }
}, []);

  return (
    <header
      style={
        ["/produtos", "/comprar", "/carrinho", "/informacoes", "/login", "/cadastro", "/"].includes(location.pathname)
          ? { background: cor, zIndex: "9999"}
          : {}
      }
    >

      {/* Navegação principal com animação */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sombra"
      >
        {/* Links de navegação (visível apenas em desktop) */}
        {!isMobile && (
          <ul id="listaInterna">
            {["Início", "Informações", "Produtos"].map((item, index) => (
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
                      : "#"
                  }
                  style={{ color: activeLink === item ? "#ff4141" : "#fff" }}
                >
                  {item}
                </Link>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.nav>

      {/* Área de login/carrinho/menu com animação */}
      <motion.nav
        id="log"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
        className="sombra"
      >
        {/* Ícone menu e carrinho (apenas mobile) */}
        {isMobile && (
          <>

            {usuarioLogado ? (

              //Parte do perfil
              <div id='perfilMobile'>

                <Link to='/perfil'>
                  {/*O src verifica se o usuário adicionou uma foto*/}
                  <img src={fotoUsuario != 'null'? fotoUsuario : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAWVJREFUSEvFlM8rRFEUxz/fZI2wsJxkZaPYytKGmqLY2NjZWPi1tFFKiaT8CbKRX9n4ByjJQrMiS1JYoJTimJnmTePNe3Nf983k7t6793w+59zOuaLBSw3mk0hgZkPAKtBbSugGWJJ07krQKTCzSWAXqpL5AbKSTmpJagrMrBW4B9piII9At6TPOIlLkAUOHNcwLOnMVzAPrDsEc5I2fQWjwLFDMCLp1FfQAtwBHTGAJ6BH0ruXoBBkZhPAXgSg0EVjkg69uygINLNBYK00B99ADliUdJF6DlwA175z0FwA136swMw6gQWgH+gD2kOwF+AauAQ2JD1HySIFZjaVB24DhS5Ksl6BaUlH4cNVAjObzT8NW0moEWfGJe1X/v8jMLMMcAs0eQo+gEzldYUFO8CMJzwIW5a0EnyEBQ9AV0rBlaSBOMEX0JxS8JZ//MrNEa7AUsKL4ZLK3P8btHpUUqymXqA4zi95YmAZ3ClLGQAAAABJRU5ErkJggg=="}
                  alt="foto de perfil"
                  id='imagemPerfil'/>
                </Link>

                <div className="logadoUsu">

                  <span style={{ color: "#fff" }}>Olá, {nomeUsuario.split(" ")[0]}!</span>
                  <button
                    onClick={() => {
                      localStorage.removeItem("usuarioLogado");
                      localStorage.removeItem("nomeUsuario"); 
                      window.location.reload();
                      navigate('/');
                    }}
                    style={{ color: "#ff4141", background: "transparent", border: "none", cursor: "pointer" }}
                  >
                    Sair
                  </button>

                </div>

              </div>


            ):(null)}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
              className="login-container"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAGtJREFUSEvtkjEOgDAMA22J/3+YwYiKdukQg0iHKpmd2vWFSB4mv48yCBteX5Ek3bFINnNJJ4AjjPoI+l7XTz9IN3CTurr1DNxkrs5h0KC78wXyvwZuUldXkKemCrJ7PEO34RW97iBYSK/oAuJmMBkWf0aJAAAAAElFTkSuQmCC"
                alt="Ícone de menu"
                style={{
                  filter: isDropdownOpen ? "drop-shadow(0px 0px 10px #ffffff)" : "none",
                }}
              />
            </motion.div>

            <div id="carrinhoHeader">
              <Link to="/carrinho">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAATFJREFUSEvNlCFPA0EQhb8XgsGSEBxBww+oQmEQOEQNmgAGRfgLeCAVKAypwCEwCBTBg0BjSDAYFAmP3aQlV+jd7XU5wpgVOzPfzL6ZFS2bWs7P3wFse9DNG3Aqae83uvvqoAAY5l2VdJ0L+fFEtveBQ+BS0nobgFngGZgCFiQ95UDGimz7DNjMSNyX1I3xZYAOcJsBeJC0XAqIF7bvgaUJIQeSoo7le2B7C+hNAPgIcfOSXuoAM0B0imcTu5K0Ngyo3GTbRwGy2yQ70JXUTwVEDaIWqfYKzEl6TwIMxL4BVhIJPUnbRd/az852nOfzREAnvP9dU8A08Ags1kAuJG1896ntILHyUrckgO1jYCcIeBLme2Sqqu4q96BYUvErlzRSVNVdE0C7HeTokKTBvwZ8Ao9FZRk8/+9qAAAAAElFTkSuQmCC"
                  alt="carrinho"
                />
              </Link>
            </div>
          </>
        )}

        {/* Overlay escuro para fechar menu ao clicar fora (mobile) */}
        {isMobile && isDropdownOpen && (
          <div className="overlay" onClick={() => setIsDropdownOpen(false)} />
        )}

        {/* Menu lateral dropdown (mobile) */}
        {isMobile && isDropdownOpen && (
          <motion.div
            id="dropdownMenu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {["Início", "Informações", "Produtos"].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                className="padraoLi"
              >
                <Link
                  to={
                    item === "Início"
                      ? "/"
                      : item === "Informações"
                      ? "/informacoes"
                      : item === "Produtos"
                      ? "/produtos"
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
            ))}


            {!usuarioLogado ? (
              <>
                {/* Entrar / Cadastrar (mobile) */}
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 2.2 }}
                  style={{ borderTop: "3px solid #fff" }}
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
              </>
            ) : (

              null

            )}

          </motion.div>
        )}

        {/* Entrar / Cadastrar e carrinho (desktop) */}
        {!isMobile && (
          <div className="auth-desktop" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>

            {usuarioLogado ? (

              <Link to='/perfil'>
                {/*O src verifica se o usuário adicionou uma foto*/}
                <img src={fotoUsuario != 'null'? fotoUsuario : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAWVJREFUSEvFlM8rRFEUxz/fZI2wsJxkZaPYytKGmqLY2NjZWPi1tFFKiaT8CbKRX9n4ByjJQrMiS1JYoJTimJnmTePNe3Nf983k7t6793w+59zOuaLBSw3mk0hgZkPAKtBbSugGWJJ07krQKTCzSWAXqpL5AbKSTmpJagrMrBW4B9piII9At6TPOIlLkAUOHNcwLOnMVzAPrDsEc5I2fQWjwLFDMCLp1FfQAtwBHTGAJ6BH0ruXoBBkZhPAXgSg0EVjkg69uygINLNBYK00B99ADliUdJF6DlwA175z0FwA136swMw6gQWgH+gD2kOwF+AauAQ2JD1HySIFZjaVB24DhS5Ksl6BaUlH4cNVAjObzT8NW0moEWfGJe1X/v8jMLMMcAs0eQo+gEzldYUFO8CMJzwIW5a0EnyEBQ9AV0rBlaSBOMEX0JxS8JZ//MrNEa7AUsKL4ZLK3P8btHpUUqymXqA4zi95YmAZ3ClLGQAAAABJRU5ErkJggg=="}
                alt="foto de perfil"
                id='imagemPerfil'/>
              </Link>
              
            ) : (
              
              <Link to=''>

                 <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAWVJREFUSEvFlM8rRFEUxz/fZI2wsJxkZaPYytKGmqLY2NjZWPi1tFFKiaT8CbKRX9n4ByjJQrMiS1JYoJTimJnmTePNe3Nf983k7t6793w+59zOuaLBSw3mk0hgZkPAKtBbSugGWJJ07krQKTCzSWAXqpL5AbKSTmpJagrMrBW4B9piII9At6TPOIlLkAUOHNcwLOnMVzAPrDsEc5I2fQWjwLFDMCLp1FfQAtwBHTGAJ6BH0ruXoBBkZhPAXgSg0EVjkg69uygINLNBYK00B99ADliUdJF6DlwA175z0FwA136swMw6gQWgH+gD2kOwF+AauAQ2JD1HySIFZjaVB24DhS5Ksl6BaUlH4cNVAjObzT8NW0moEWfGJe1X/v8jMLMMcAs0eQo+gEzldYUFO8CMJzwIW5a0EnyEBQ9AV0rBlaSBOMEX0JxS8JZ//MrNEa7AUsKL4ZLK3P8btHpUUqymXqA4zi95YmAZ3ClLGQAAAABJRU5ErkJggg=="
                  alt="ícone"
                  style={{ width: "30px", height: "30px" }}
                />

              </Link>

            )}

            <div className="desktop-links">
              {usuarioLogado ? (
                <div className="logadoUsu">

                  <span style={{ color: "#fff" }}>Olá, {nomeUsuario.split(" ")[0]}!</span>
                  <button
                    onClick={() => {
                      localStorage.removeItem("usuarioLogado");
                      localStorage.removeItem("nomeUsuario"); 
                      {location.pathname === "/perfil" ? navigate('/'): ""}
                      localStorage.clear();
                      window.location.reload()
    
                    }}
                    style={{ color: "#ff4141", background: "transparent", border: "none", cursor: "pointer" }}
                  >
                    Sair
                  </button>

                </div>
              ) : (
                <>
                  <Link to="/login">Entrar</Link>
                  <Link to="/cadastro">Cadastrar</Link>
                </>
                  
              )}
            </div>


            <div id="carrinhoHeader">
              <Link to="/carrinho">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAATFJREFUSEvNlCFPA0EQhb8XgsGSEBxBww+oQmEQOEQNmgAGRfgLeCAVKAypwCEwCBTBg0BjSDAYFAmP3aQlV+jd7XU5wpgVOzPfzL6ZFS2bWs7P3wFse9DNG3Aqae83uvvqoAAY5l2VdJ0L+fFEtveBQ+BS0nobgFngGZgCFiQ95UDGimz7DNjMSNyX1I3xZYAOcJsBeJC0XAqIF7bvgaUJIQeSoo7le2B7C+hNAPgIcfOSXuoAM0B0imcTu5K0Ngyo3GTbRwGy2yQ70JXUTwVEDaIWqfYKzEl6TwIMxL4BVhIJPUnbRd/az852nOfzREAnvP9dU8A08Ags1kAuJG1896ntILHyUrckgO1jYCcIeBLme2Sqqu4q96BYUvErlzRSVNVdE0C7HeTokKTBvwZ8Ao9FZRk8/+9qAAAAAElFTkSuQmCC"
                  alt="carrinho"
                />
              </Link>
            </div>
          </div>
        )}
      </motion.nav>
    </header>
  );
}