import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NLogadoFoto from "../../assets/fotoPerfil.png"

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
  const [idCadastro, setIdCadastro] = useState('');
  const [temEmpresa, setTemEmpresa] = useState(0);

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

        setIdCadastro(data.id)
       
      })
        .catch(err => console.error("Erro ao carregar perfil:", err));
      }, [id]);
  

      //Modificando campos
      const handleChangeNome = (novoNome) => {
        setNomeUsuario(novoNome);
      };
      const handleChangeData = (novaData) => {
        setDataNascimento(novaData);
      };
      
      const handleChangeEmail = (novoEmail) => {
        setEmail(novoEmail);
      };
      const handleChangeSenha = (novoSenha) => {
        setSenha(novoSenha);
      };
      const handleChangeTelefone = (novoTelefone) => {
        setTelefone(novoTelefone);
      };
      const handleChangeNomeEmpresa = (novoNomeEmpresa) => {
        setNomeEmpresa(novoNomeEmpresa);
      };

      const handleChangeTemEmpresa = (temEmpresa) => {
        setTemEmpresa(temEmpresa);
      };
      
      const [arquivoFoto, setArquivoFoto] = useState(null);

      const handleChangeFoto = (file) => {

        setArquivoFoto(file);
        if (file) setFotoUsuario(URL.createObjectURL(file));
        
      };

      function handleSalvar(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("nome", nomeUsuario);
        formData.append("data_nascimento", dataNascimento.split('T')[0]);
        formData.append("email", email);
        if (arquivoFoto) formData.append("foto", arquivoFoto);
        formData.append("senha", senha);
        formData.append("telefone", telefone);
        formData.append("nome_empresa", nomeEmpresa);
        formData.append("tem_empresa", temEmpresa ? '0' : '1');
        
        console.log(nomeEmpresa)

        console.log(idCadastro)
        fetch(`http://localhost:3000/perfil/${idCadastro}`, {
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
              src={fotoUsuario !== null ? fotoUsuario : NLogadoFoto}
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
        setNomeUsuario = {handleChangeNome}
        dataNascimento={dataNascimento}
        setDataNascimento={handleChangeData}
        email={email}
        setEmail={handleChangeEmail}
        senha={senha}
        setSenha={handleChangeSenha}
        nomeEmpresa={nomeEmpresa}
        setNomeEmpresa={handleChangeNomeEmpresa}
        telefone={telefone}
        setTelefone={handleChangeTelefone}
        onSubmit={handleSalvar}
        setFoto={handleChangeFoto}
        temEmpresa={temEmpresa}
        setTemEmpresa={handleChangeTemEmpresa}
      />
    </main>
  );
}
