import './styleLogin.css';
import './responsive.css';
import { useState } from "react";
import { Raiz } from '../google/Raiz';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export function Login(){

    const [isChecked, setIsChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);/* Botão de mostrar senha do usuário */

    return(
        <main id='mainLogin'>
            <div id='caixaForm'>
                <h1>Entrar</h1>
                <form id='formLogin'>
                    
                    <input type='text' placeholder='Email ou telefone' required/>
                    
                    <div className="password-container">

                        <input 
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Senha' 
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
                    
                    <input type='submit'/>
                    <Raiz/>
                    <span>Não tem uma conta?<a href='#'> Cadastre-se</a></span>
                </form>
            </div>
        </main>
    )
}
