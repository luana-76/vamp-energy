import './cadastroStyle.css';
import './responsiveCadastro.css';
import { useState } from "react";
import { Raiz } from "../google/Raiz";
import './autenticacao.js';

export function Cadastro(){
    const [isChecked, setIsChecked] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [showValidation, setShowValidation] = useState(false); // Mostra validação ao clicar
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
    // Função para validar a senha conforme o usuário digita
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
                    <input
                    type="text"
                    placeholder="Nome completo"
                    id='campNome'
                    pattern='^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$'
                    required
            
                    />
                    <input type="date" required placeholder='Data de nascimento'/>
                    <input type="tel" placeholder="Telefone" required />

                    <input
                        type="text"
                        placeholder="Nome da sua empresa"
                        required
                        id='campoEmpresa'
                        disabled={isChecked}
                    />

                    {/* Botão de ligar e desligar */}
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

                    <input type="email" placeholder="Email" required />

                    {/* Campo de senha com validação */}
                    <input
                        type="password"
                        placeholder="Senha"
                        required
                        value={password}
                        onChange={(e) => validatePassword(e.target.value)}
                        onFocus={() => setShowValidation(true)} // Exibe validação ao clicar
                        onBlur={() => !password && setShowValidation(false)} // Esconde se vazio
                        minLength={8}
                        maxLength={20}
                    />

                    {/* Exibição dinâmica das regras */}
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

                    <input
                        type="password"
                        placeholder="Confirme a senha"
                        required
                        value={confirmPassword}
                        onChange={(e) => validateConfirmPassword(e.target.value)}
                    />
                    {/* Mensagem de erro caso as senhas não coincidam */}
                    {!passwordMatch && confirmPassword.length > 0 && (
                        <p style={{ color: "red" }}>As senhas não coincidem!</p>
                    )}

                    <input type="submit" value="Cadastrar" />
                    <Raiz />

                    <span>Já tem uma conta?<a href="#"> Faça login</a></span>
                </form>
            </div>
        </main>
    );
}
