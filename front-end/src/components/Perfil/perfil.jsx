import { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";

import './pagPerfil.css';
import { Form } from "../cadastro/caixaForm/Form";

export function Perfil(){
 
          //Muda o header, essa linha define se o usuário está logado ou não
          const [usuarioLogado, setUsuarioLogado] = useState(false);
          const [nomeUsuario, setNomeUsuario] = useState('');
          const [fotoUsuario, setFotoUsuario] = useState('');
          const [dataNascimento, setDataNascimento] = useState('');
          const [email, setEmail] = useState('');
          const [senha, setSenha] = useState('');
          const [telefone, setTelefone] = useState('');
          const [nomeEmpresa, setNomeEmpresa] = useState('');

          const navigate = useNavigate();
    
          useEffect(() => {
            const idUsuario = localStorage.getItem("idUsuario");
            if (!idUsuario) return;

            fetch(`http://localhost:3000/perfil/${idUsuario}`)
              .then(res => res.json())
              .then(data => {
                console.log("Dados do usuário completo:", data);
                setNomeUsuario(data.nome);
                setFotoUsuario(data.foto);
                setDataNascimento(data.data_nascimento)
                setEmail(data.email)
                setSenha(data.senha)
                setTelefone(data.telefone)
                setNomeEmpresa(data.nome_empresa)
                
              })
              .catch(err => console.error("Erro ao carregar perfil:", err));
          }, []);


       return(
        <main id='perfilMain'>

            <div className='caixaPerfil'>
              <div className='fotoPerfil'>

                  <Link to='/perfil'>
                      {/*O src verifica se o usuário adicionou uma foto*/}
                      <img src={fotoUsuario != 'null'? fotoUsuario : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAWVJREFUSEvFlM8rRFEUxz/fZI2wsJxkZaPYytKGmqLY2NjZWPi1tFFKiaT8CbKRX9n4ByjJQrMiS1JYoJTimJnmTePNe3Nf983k7t6793w+59zOuaLBSw3mk0hgZkPAKtBbSugGWJJ07krQKTCzSWAXqpL5AbKSTmpJagrMrBW4B9piII9At6TPOIlLkAUOHNcwLOnMVzAPrDsEc5I2fQWjwLFDMCLp1FfQAtwBHTGAJ6BH0ruXoBBkZhPAXgSg0EVjkg69uygINLNBYK00B99ADliUdJF6DlwA175z0FwA136swMw6gQWgH+gD2kOwF+AauAQ2JD1HySIFZjaVB24DhS5Ksl6BaUlH4cNVAjObzT8NW0moEWfGJe1X/v8jMLMMcAs0eQo+gEzldYUFO8CMJzwIW5a0EnyEBQ9AV0rBlaSBOMEX0JxS8JZ//MrNEa7AUsKL4ZLK3P8btHpUUqymXqA4zi95YmAZ3ClLGQAAAABJRU5ErkJggg=="}
                      alt="foto de perfil"
                      id='imagemPerfil'/>
                  </Link>

                  <div className="logadoUsu">

                    <span id='pagNomePerfil' style={{ color: "#fff" }}>{nomeUsuario.split(" ")[0]}</span>

                  </div>

              </div>

              <div className='caixaTempo'>

                <h3>Ultima atualização:</h3>
                <span>00/00/0000</span>

              </div>

              <div id="close" onClick={() => navigate(-1)} style={{ cursor: 'pointer'}}>

                    <img className='seta' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANBJREFUSEvtlEEKwjAQRd8/hKB7Bc8ggrcQXAteR1wLHkbBO7hxL3iHaCCFUmsyKcmuXZbhvT+TTETlT5X5jILkhM0jcs5NgZ2kY5LaKjAJAvwKLICDpLNVkhQE+A2YA09gJelVRNCBP4BNDtyH+NuBc24C3ENyD19LeluTN3W9ggD3M19+D3YwvLeDDtwcWFJv2J+f1QU+ctURNTMpJYnuQYmblLto2buQFIQz8e9Q81TsJV2s18skCJIZsJV0ssKjm5wDidWaOxgqHAXJyX0AzWRKGaDSgDcAAAAASUVORK5CYII=" alt='setaVoltar'/>
                    <span>Voltar</span>

              </div>
            </div>

            <Form
              nome={nomeUsuario}
              foto={fotoUsuario}
              dataNascimento={dataNascimento}
              email={email}
              senha={senha}
              nomeEmpresa={nomeEmpresa}
              telefone={telefone}
            />

        </main>

       )

}