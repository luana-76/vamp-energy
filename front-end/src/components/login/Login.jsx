import './styleLogin.css';
import './responsive.css';
import { useState } from "react";

export function Login(){

    const [isChecked, setIsChecked] = useState(false);

    return(

        <main id='mainLogin'>

            <div id='caixaForm'>

                <h1>Entrar</h1>
                
                <form id='formLogin'>

                    <input type='text' placeholder='Email ou telefone' required/>
                    <input type='password' placeholder='Senha' required/>

                    {/* Botão de ligar e desligar */}
                    <div className="toggle-container">
                        <input
                            type="checkbox"
                            id="switch"
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                        />
                        <label htmlFor="switch" className="toggle-label"></label>

                        <span>Logar automatico</span>
                    </div>

                    <input type='submit'/>

                    <span>Não tem uma conta?<a href='#'> Cadastre-se</a></span>
                </form>

            </div>

        </main>

    )


}