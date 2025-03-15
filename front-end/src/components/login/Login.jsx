import './styleLogin.css';
import './responsive.css';
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

                    <Raiz/>
                    <span>Não tem uma conta?<Link to='/cadastro'> Cadastre-se</Link></span>
                </form>
            </div>
        </main>
    )
}
