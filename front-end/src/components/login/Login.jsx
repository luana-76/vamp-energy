import './styleLogin.css';
import './responsive.css';
import videoFundo from '../../assets/login.mp4';
import { useState } from "react";
import { Raiz } from '../google/Raiz';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ErroInputVazio } from '../ErroVazio/ErroInpuVazio';

export function Login(){

    const [isChecked, setIsChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);/* Botão de mostrar senha do usuário */

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState(false);
    const enviar = (e)=>{

        if(login == '' || senha == ''){

            e.preventDefault();
            setErro(true);

            setTimeout(() => {//Faz o erro desaparecer em 2s

                setErro(false);

            }, 2000)

        }

    }

    return(
        <main id='mainLogin'>

            <video id='fundoVideo' autoPlay loop muted>
                <source src={videoFundo} type="video/mp4"/>
                Seu navegador não suporta a tag de vídeo.
            </video>

            <div id='caixaForm'>
                <h1>Entrar</h1>
                <form id='formLogin'>
                    
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

                        <Link to=''>Esqueceu a senha?</Link>

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
                    
                    <input type='submit' onClick={enviar}/>
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
