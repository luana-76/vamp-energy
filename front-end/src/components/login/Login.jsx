import './styleLogin.css';
import videoFundo from '../../assets/login.mp4';
import { useState } from "react";
import { Raiz } from '../google/Raiz';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ErroInputVazio } from '../ErroVazio/ErroInpuVazio';

import { useNavigate } from "react-router-dom";

export function Login(){

    const [isChecked, setIsChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);/* Botão de mostrar senha do usuário */

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState(false);
    /*const enviar = (e)=>{

        if(login == '' || senha == ''){

            e.preventDefault();
            setErro(true);

            setTimeout(() => {//Faz o erro desaparecer em 2s

                setErro(false);

            }, 2000)

        }

    }*/

    const navigate = useNavigate();
    const enviarDados = async (e) => {
        e.preventDefault();

        if (login === '' || senha === '') {
            setErro(true);
            setTimeout(() => setErro(false), 2000);
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: login, senha })
            });
            
            if (!response.ok) {
                // tratar erro
                const errorData = await response.json();
                alert('Erro: ' + errorData.error);
                return;
            }

            const data = await response.json();
            alert(data.message);

            //Salva os dados se o usuário conseguir logar
            localStorage.setItem("usuarioLogado", "true");
    
            localStorage.setItem("idUsuario", data.usuario.id);
            localStorage.setItem("nomeUsuario", data.usuario.nome);
            localStorage.setItem("fotoUsuario", data.usuario.foto);
 
            navigate("/"); // Redirecionar após login

            setLogin('');
            setSenha('');
            
        } catch (error) {
            alert('Erro ao enviar dados: ' + error.message);
        }
        
    };

    const handleLogin = () => {
        
        navigate('/informacoes'); // Vai pra página inicial
    };

    return(
        <main id='mainLogin'>

            {/*<video id='fundoVideo' autoPlay loop muted>
                <source src={videoFundo} type="video/mp4"/>
                Seu navegador não suporta a tag de vídeo.
            </video>*/}

            <div id='caixaForm'>
                <h1>Entrar</h1>
                <form id='formLogin' onSubmit={enviarDados}>
                    
                    <input
                    type='text'
                    placeholder='Email ou telefone'
                    required
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    />
                    
                    <div className="password-container">

                        <input 
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Senha' 
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />

                        <button 
                            type="button" 
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>

                    </div>

                    <div className='esquecimentoSenha'>

                        <Link to='/redefinicao'>Esqueceu a senha?</Link>

                    </div>
                    
                    {/* Botão de ligar e desligar */}
                    <div className="toggle-container">
                        <input
                            type="checkbox"
                            id="switch"
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                        />
                        <label htmlFor="switch" className="toggle-label"></label>
                        <span>Logar automático</span>
                    </div>
                    
                    <input type='submit'/>
                    {erro && <ErroInputVazio/>}
                    
                    <div className="google-btn-container">
                    
                        <Raiz/>

                    </div>
                    
                    <span>Não tem uma conta?<Link to='/cadastro'> Cadastre-se</Link></span>
                </form>
            </div>
        </main>
    )
}
