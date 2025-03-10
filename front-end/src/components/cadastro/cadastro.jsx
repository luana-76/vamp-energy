import './cadastroStyle.css';
import './responsiveCadastro.css';
import { useState } from "react";
import { Raiz } from "../google/Raiz";
import { Autenticacao } from './autenticacao.js';

export function Cadastro() {

    const validacao = new Autenticacao();//Importando as válidações

    const [nome, setNome] = useState("");
    const [isNomeValido, setIsNomeValido] = useState(true);
    const handleNomeChange = (e) => {

        const value = e.target.value;
        setNome(value);
        setIsNomeValido(validacao.padraoString(value)); // Chama a função da classe `Autenticacao`
        if(!isNomeValido){e.target.style.marginBottom = "0px";}

    };

    const [data, setData] = useState("");
    const [isDataValido, setIsDataValido] = useState(true);
    const handleDataChange = (e) => {
        const value = e.target.value;
        setData(value);
        setIsDataValido(validacao.padraoData(value)); // Chama a função da classe `Autenticacao`
        if(!isDataValido){e.target.style.marginBottom = "0px";}
    };

    const [tel, setTel] = useState("");
    const [isTelefoneValido, setIsTelefoneValido] = useState(true);

    const handleTelefoneChange = (e) => {
        const value = e.target.value;
        setTel(value);
        setIsTelefoneValido(validacao.padraoTelefone(value));
        if(!isTelefoneValido){e.target.style.marginBottom = "0px";}
    };

    const [isChecked, setIsChecked] = useState(false);//Check do nome da empresa
    const [empresa, setEmpresa] = useState("");
    const [isEmpresaValido, setIsEmpresaValido] = useState(true);
    const handleEmpresaChange = (e) => {
        const value = e.target.value;
        setEmpresa(value);
        setIsEmpresaValido(validacao.padraoString(value)); // Chama a função da classe `Autenticacao`
        if(!isEmpresaValido){e.target.style.marginBottom = "0px";}

    };

    const [email, setEmail] = useState("");
    const [isEmailValido, setIsEmailValido] = useState(true);
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setIsEmailValido(validacao.padraoEmail(value)); // Chama a função da classe `Autenticacao`
        if(!isEmailValido){e.target.style.marginBottom = "0px";}
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

    return (
        <main id="mainLogin" className="mainCadastro">
            <div id="caixaForm" className="caixaSegurar">
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
                        <p className='error'>Apenas letras e espaços são permitidos(0-100).</p>
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
                        value={empresa}
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

                    <input type="submit" value="Cadastrar" />
                    <Raiz />

                    <span>Já tem uma conta?<a href="#"> Faça login</a></span>
                </form>
            </div>
        </main>
    );
}

