import './cadastroStyle.css';
import './responsiveCadastro.css';
import { useState, useEffect } from "react";
import { Raiz } from "../google/Raiz";
import { Autenticacao } from './autenticacao.js';
import { Link } from "react-router-dom";
import { ErroInputVazio } from '../ErroVazio/ErroInpuVazio.jsx';

import videoFundo from '../../assets/login.mp4';

export function Cadastro() {

    const validacao = new Autenticacao();//Importando as válidações

    const [nome, setNome] = useState("");
    const [isNomeValido, setIsNomeValido] = useState(true);
    const handleNomeChange = (e) => {

        const value = e.target.value;
        setNome(value);
        setIsNomeValido(validacao.padraoString(value)); // Chama a função da classe `Autenticacao`

    };

    const [data, setData] = useState("");
    const [isDataValido, setIsDataValido] = useState(true);
    const handleDataChange = (e) => {
        const value = e.target.value;
        setData(value);
        setIsDataValido(validacao.padraoData(value)); // Chama a função da classe `Autenticacao`
        
    };

    const [tel, setTel] = useState("");
    const [isTelefoneValido, setIsTelefoneValido] = useState(true);

    const handleTelefoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
    
        if (value.length > 11) {
            value = value.slice(0, 11); // Garante que não tenha mais de 11 números
        }
    
        let formatted = "";
    
        if (value.length > 0) {
            formatted = `(${value.substring(0, 2)}`;
        }
        if (value.length >= 3) {
            formatted += `) ${value.substring(2, 3)}`;
        }
        if (value.length >= 4) {
            formatted += ` ${value.substring(3, 7)}`;
        }
        if (value.length >= 8) {
            formatted += `-${value.substring(7, 11)}`;
        }
    
        // Permite apagar tudo sem travar
        // Esse e.nativeEvent.inputType indica a ação realizada pelo usuário, no caso a que queremos é "deleteContentBackward".
        if (e.nativeEvent.inputType === "deleteContentBackward") {
            setTel(e.target.value);
        } else {
            setTel(formatted);
        }
    
        setIsTelefoneValido(validacao.padraoTelefone(value));
    };
    
    const [isChecked, setIsChecked] = useState(false);//Check do nome da empresa
    const [empresa, setEmpresa] = useState("");
    const [isEmpresaValido, setIsEmpresaValido] = useState(true);
    const handleEmpresaChange = (e) => {
        const value = e.target.value;
        setEmpresa(value);
        setIsEmpresaValido(validacao.padraoString(value)); // Chama a função da classe `Autenticacao`

    };
    /* Quando o usuário clica no checkbox ele apaga o input */
    /* Renderização fora de useState ou useEffect, não funciona */
    useEffect(() => {
        if (isChecked) {
            setEmpresa("");
        }
    }, [isChecked]);

    const [email, setEmail] = useState("");
    const [isEmailValido, setIsEmailValido] = useState(true);
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setIsEmailValido(validacao.padraoEmail(value)); // Chama a função da classe `Autenticacao`
        
    };

    //Senha

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [showValidation, setShowValidation] = useState(false);
    const [validation, setValidation] = useState({
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
        hasValidLength: false,
    });

    const validateConfirmPassword = (value) => {
        setConfirmPassword(value);
        setPasswordMatch(value === password);
    };

    const validatePassword = (value) => {
        setPassword(value);
        setValidation({
            hasUpperCase: /[A-Z]/.test(value),
            hasLowerCase: /[a-z]/.test(value),
            hasNumber: /[0-9]/.test(value),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
            hasValidLength: value.length >= 8 && value.length <= 20,
        });
    };

    /* Botão de enviar */

    const [erro, setErro] = useState(false);
    const enviar = (e)=>{

        if(
        nome == '' || data == '' ||
        tel == '' || email == '' ||
        empresa == '' || password == '' || confirmPassword == ''){

            e.preventDefault();
            setErro(true);

            setTimeout(() => {//Faz o erro desaparecer em 2s

                setErro(false);

            }, 2000)

        }

    }
    return (
        <main id="mainLogin" className="mainCadastro">

            <video id='fundoVideo' autoPlay loop muted>
                <source src={videoFundo} type="video/mp4"/>
                Seu navegador não suporta a tag de vídeo.
            </video>    
            <div id="caixaForm" className="caixaSegurar formCadastro">
                <h1>Cadastro</h1>

                <form id="formLogin">

                    {/* Parte do nome */}
                    <input
                        type="text"
                        placeholder="Nome completo"
                        id='campNome'
                        required
                        value={nome}
                        onChange={handleNomeChange} // Corrigido para chamar a função
                    />

                    {!isNomeValido && nome.length > 0 && (
                        <p className='error'>Apenas letras e espaços são permitidos.</p>
                    )}
                    
                    {/* Parte da data */}
                    <input
                        type="date"
                        required
                        placeholder='Data de nascimento'
                        value={data}
                        onChange={handleDataChange}
                    />

                    {!isDataValido && data.length > 0 && (
                        <p className='error'>Apenas maiores de 18 anos.</p>
                    )}

                    {/* Parte do telefone */}
                    <input
                        type="tel"
                        placeholder="Telefone"
                        required
                        value={tel}
                        onChange={handleTelefoneChange}
                     />
                    {!isTelefoneValido && tel.length > 0 && (
                        <p className='error'>Digite um telefone válido.</p>
                    )}

                    {/* Parte do nome da empresa*/}
                    <input
                        type="text"
                        placeholder="Nome da sua empresa"
                        required
                        id='campoEmpresa'
                        disabled={isChecked}
                        value={isChecked ? "" : empresa}
                        onChange={handleEmpresaChange}
                    />
                    {!isEmpresaValido && empresa.length > 0 && (
                        <p className='error'>Digite um nome de empresa válido.</p>
                    )}

                    {/* Parte do checkbox se é uma empresa ou não */}
                    <div id="caixaCheckbox" className='loginCheck'>
                        <input
                            type="checkbox"
                            id="checkCadastro"
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                        />
                        <label htmlFor="switch"></label>
                        <span>Não tenho uma empresa</span>
                    </div>

                    {/* Parte do email*/}
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={handleEmailChange}
                    />

                    {!isEmailValido && email.length > 0 && (
                            <p className='error'>Digite um email válido.</p>
                    )}

                    {/* Parte da senha */}
                    <input
                        type="password"
                        placeholder="Senha"
                        required
                        value={password}
                        onChange={(e) => validatePassword(e.target.value)}
                        onFocus={() => setShowValidation(true)}
                        onBlur={() => !password && setShowValidation(false)}
                        minLength={8}
                        maxLength={20}
                    />

                    {showValidation && (
                        <ul className="password-validation">
                            <li style={{ color: validation.hasUpperCase ? "green" : "red" }}>
                                {validation.hasUpperCase ? "✔" : "✖"} Pelo menos uma letra maiúscula
                            </li>
                            <li style={{ color: validation.hasLowerCase ? "green" : "red" }}>
                                {validation.hasLowerCase ? "✔" : "✖"} Pelo menos uma letra minúscula
                            </li>
                            <li style={{ color: validation.hasNumber ? "green" : "red" }}>
                                {validation.hasNumber ? "✔" : "✖"} Pelo menos um número
                            </li>
                            <li style={{ color: validation.hasSpecialChar ? "green" : "red" }}>
                                {validation.hasSpecialChar ? "✔" : "✖"} Pelo menos um caractere especial
                            </li>
                            <li style={{ color: validation.hasValidLength ? "green" : "red" }}>
                                {validation.hasValidLength ? "✔" : "✖"} Entre 8 e 20 caracteres
                            </li>
                        </ul>
                    )}

                    {/* Parte da validação de senha */}
                    <input
                        type="password"
                        placeholder="Confirme a senha"
                        required
                        value={confirmPassword}
                        onChange={(e) => validateConfirmPassword(e.target.value)}
                    />
                    {!passwordMatch && confirmPassword.length > 0 && (
                        <p className='error'>As senhas não coincidem!</p>
                    )}

                    <input
                    type="submit"
                    value="Cadastrar"
                    onClick={enviar}/>
                    
                    {erro && <ErroInputVazio />}

                    <Raiz />

                    <span>Já tem uma conta? <Link to='/login'>Faça login</Link></span>
                </form>
            </div>
        </main>
    );
}
