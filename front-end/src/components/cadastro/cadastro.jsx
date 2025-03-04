import './cadastroStyle.css';
import './responsiveCadastro.css';
import { useState } from "react";
import {Raiz} from "../google/Raiz"

export function Cadastro(){

    const [isChecked, setIsChecked] = useState(false);

    return(

        <main id='mainLogin'>

            <div id='caixaForm'>

                <h1>Cadastro</h1>
                
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
                    <Raiz/>

                    <span>Não tem uma conta?<a href='#'> Cadastre-se</a></span>
                </form>

            </div>

        </main>

    )

}