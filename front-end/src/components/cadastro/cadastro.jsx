import './cadastroStyle.css';
import './responsiveCadastro.css';
import { useState } from "react";
import {Raiz} from "../google/Raiz"

export function Cadastro(){

    const [isChecked, setIsChecked] = useState(false);

    return(

        <main id='mainLogin' className='mainCadastro'>

            <div id='caixaForm' className='caixaSegurar'>

                <h1>Cadastro</h1>
                
                <form id='formLogin'>

                    <input type='text' placeholder='Nome completo' required/>
                    <input type='date' required/>
                    <input type='tel' placeholder='Telefone' required/>

                    <input type='text' placeholder='Nome da sua empresa' required/>

                    {/* Botão de ligar e desligar */}
                    <div id='caixaCheckbox'>
                        <input
                            type="checkbox"
                            id="checkCadastro"
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                        />
                        <label htmlFor="switch"></label>

                        <span>Não tenho uma empresa</span>
                    </div>

                    <input type='email' placeholder='Email' required/>
                    <input type='password' placeholder='Senha' required/>

                    <input type='submit' value='Cadastrar'/>
                    <Raiz/>

                    <span>Já tem uma conta?<a href='#'> Faça login</a></span>
                </form>

            </div>

        </main>

    )

}