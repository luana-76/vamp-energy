import "./styleHeader.css";
import Dentadura from "../../assets/logoDentadura.png";
import { motion } from "framer-motion";

export function Header() {
  return (
    <header>
      {/* Nav principal */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
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
              >
                <a href="" style={item === "Início" ? { color: "#D51919" } : {}}>
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
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
        >
          <box-icon name="user"></box-icon>
        </motion.div>
        <motion.a
          href=""
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
        >
          Entrar
        </motion.a>
        <motion.a
          href=""
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6, ease: "easeOut" }}
        >
          Cadastrar
        </motion.a>
      </motion.nav>
    </header>
  );
}
