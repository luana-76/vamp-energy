import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import './pagPerfil.css';
import { Form } from "../cadastro/caixaForm/Form";

export function Perfil() {
  const navigate = useNavigate();

  const id = localStorage.getItem("idUsuario");

  const [nomeUsuario, setNomeUsuario] = useState('');
  const [fotoUsuario, setFotoUsuario] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nomeEmpresa, setNomeEmpresa] = useState('');

  useEffect(() => {
    if (!id) {
      console.error("ID não encontrado no localStorage");
      return;
    }

    fetch(`http://localhost:3000/perfil/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Usuário não encontrado");
        return res.json();
      })
      .then(data => {
        console.log("Dados do usuário completo:", data);
        setNomeUsuario(data.nome ? data.nome.charAt(0).toUpperCase() + data.nome.slice(1) : '');
        setFotoUsuario(data.foto);
        setDataNascimento(data.data_nascimento);
        setEmail(data.email);
        setSenha(data.senha);
        setTelefone(data.telefone);
        setNomeEmpresa(data.nome_empresa ? data.nome_empresa.charAt(0).toUpperCase() + data.nome_empresa.slice(1) : '');
      })
        .catch(err => console.error("Erro ao carregar perfil:", err));
      }, [id]);

      function handleSalvar(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("nome", nomeUsuario);
        formData.append("data_nascimento", dataNascimento);
        formData.append("email", email);
        formData.append("senha", senha);
        formData.append("telefone", telefone);
        formData.append("nome_empresa", nomeEmpresa);
        formData.append("tem_empresa", false);


        fetch(`http://localhost:3000/perfil/${id}`, {
          method: "PUT",
          body: formData,
        })
        .then(res => {
          if (!res.ok) throw new Error("Erro ao atualizar");
          return res.json();
        })
        .then(data => alert("Perfil atualizado com sucesso!"))
        .catch(err => {
          console.error(err);
          alert("Erro ao atualizar perfil.");
        });
  }


  return (
    <main id='perfilMain'>
      <div className='caixaPerfil'>
        <div className='fotoPerfil'>
          <Link to='/perfil'>
            <img
              src={fotoUsuario !== 'null' ? fotoUsuario : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAWVJREFUSEvFlM8rRFEUxz/fZI2wsJxkZaPYytKGmqLY2NjZWPi1tFFKiaT8CbKRX9n4ByjJQrMiS1JYoJTimJnmTePNe3Nf983k7t6793w+59zOuaLBSw3mk0hgZkPAKtBbSugGWJJ07krQKTCzSWAXqpL5AbKSTmpJagrMrBW4B9piII9At6TPOIlLkAUOHNcwLOnMVzAPrDsEc5I2fQWjwLFDMCLp1FfQAtwBHTGAJ6BH0ruXoBBkZhPAXgSg0EVjkg69uygINLNBYK00B99ADliUdJF6DlwA175z0FwA136swMw6gQWgH+gD2kOwF+AauAQ2JD1HySIFZjaVB24DhS5Ksl6BaUlH4cNVAjObzT8NW0moEWfGJe1X/v8jMLMMcAs0eQo+gEzldYUFO8CMJzwIW5a0EnyEBQ9AV0rBlaSBOMEX0JxS8JZ//MrNEa7AUsKL4ZLK3P8btHpUUqymXqA4zi95YmAZ3ClLGQAAAABJRU5ErkJggg=="}
              alt="foto de perfil"
              id='imagemPerfil'
            />
          </Link>

          <div className="logadoUsu">
            <span id='pagNomePerfil' style={{ color: "#fff" }}>
              {nomeUsuario.split(" ")[0]}
            </span>
          </div>
        </div>

        <div className='caixaTempo'>
          <h3>Última atualização:</h3>
          <span>00/00/0000</span>
        </div>

        <div id="close" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
          <img className='seta' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANBJREFUSEvtlEEKwjAQRd8/hKB7Bc8ggrcQXAteR1wLHkbBO7hxL3iHaCCFUmsyKcmuXZbhvT+TTETlT5X5jILkhM0jcs5NgZ2kY5LaKjAJAvwKLICDpLNVkhQE+A2YA09gJelVRNCBP4BNDtyH+NuBc24C3ENyD19LeluTN3W9ggD3M19+D3YwvLeDDtwcWFJv2J+f1QU+ctURNTMpJYnuQYmblLto2buQFIQz8e9Q81TsJV2s18skCJIZsJV0ssKjm5wDidWaOxgqHAXJyX0AzWRKGaDSgDcAAAAASUVORK5CYII=" alt='setaVoltar'/>
          <span>Voltar</span>
        </div>
      </div>

      <Form
        id={id}
        nome={nomeUsuario}
        dataNascimento={dataNascimento}
        email={email}
        senha={senha}
        nomeEmpresa={nomeEmpresa}
        telefone={telefone}
        onSubmit={handleSalvar}
      />
    </main>
  );
}
