import { Link, useLocation} from "react-router-dom";
import { useState, useEffect } from "react";
import { Autenticacao } from '../autenticacao.js';
import { ErroInputVazio } from '../../ErroVazio/ErroInpuVazio.jsx';
import { Raiz } from "../../google/Raiz";

export function Form(prop) {

    const location = useLocation();
    const validacao = new Autenticacao(); // Importando as válidações

    const [nome, setNome] = useState("");
    const [isNomeValido, setIsNomeValido] = useState(true);
    const handleNomeChange = (e) => {
        const value = e.target.value;
        setNome(value);
        prop.setNomeUsuario(value)
        setIsNomeValido(validacao.padraoString(value));
    };

    const [data, setData] = useState("");
    const [isDataValido, setIsDataValido] = useState(true);
    const handleDataChange = (e) => {
        const value = e.target.value;
        setData(value);
        prop.setDataNascimento(value)
        setIsDataValido(validacao.padraoData(value));
    };

    const [tel, setTel] = useState("");
    const [isTelefoneValido, setIsTelefoneValido] = useState(true);
    const handleTelefoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) {
            value = value.slice(0, 11);
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

        if (e.nativeEvent.inputType === "deleteContentBackward") {
            setTel(e.target.value);
        } else {
            setTel(formatted);
        }

        setIsTelefoneValido(validacao.padraoTelefone(value));
        prop.setTelefone(value)
    };

    const [isChecked, setIsChecked] = useState(false);
    const [empresa, setEmpresa] = useState("");
    const [isEmpresaValido, setIsEmpresaValido] = useState(true);
    const handleEmpresaChange = (e) => {
        const value = e.target.value;
        setEmpresa(value);
        prop.setNomeEmpresa(value)
        setIsEmpresaValido(validacao.padraoString(value));
    };

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
        prop.setEmail(value)
        setIsEmailValido(validacao.padraoEmail(value));
    };

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
        prop.setSenha(value)
        setValidation({
            hasUpperCase: /[A-Z]/.test(value),
            hasLowerCase: /[a-z]/.test(value),
            hasNumber: /[0-9]/.test(value),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
            hasValidLength: value.length >= 8 && value.length <= 20,
        });
    };

    const [erro, setErro] = useState(false);
    const enviar = (e) => {
        if (
            nome == '' || data == '' ||
            tel == '' || email == '' ||
            empresa == '' || password == '' || confirmPassword == ''
        ) {
            e.preventDefault();
            setErro(true);
            setTimeout(() => {
                setErro(false);
            }, 2000);
        }
    };

    const [foto, setFoto] = useState(null);
    const enviarDados = async (e) => {
        e.preventDefault();

        if (
            nome === '' || data === '' ||
            tel === '' || email === '' ||
            (!isChecked && empresa === '') ||
            password === '' || confirmPassword === ''
        ) {
            setErro(true);
            setTimeout(() => setErro(false), 2000);
            return;
        }

        if (!passwordMatch) {
            alert('As senhas não coincidem!');
            return;
        }

        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('data_nascimento', data);
        formData.append('telefone', tel);
        formData.append('nome_empresa', empresa);
        formData.append('tem_empresa', !isChecked);
        formData.append('email', email);
        formData.append('senha', password);
        if (foto) {
            formData.append('foto', foto);
        }

        try {
            const response = await fetch('http://localhost:3000/cadastrandoUsuarios', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {

                const resultado = await response.json();
                console.log(resultado);
                alert('Usuário cadastrado com sucesso!');
                setNome('');
                setData('');
                setTel('');
                setEmpresa('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setIsChecked(false);
                setFoto(null);


            } else {
                const erro = await response.json();
                console.error('Erro:', erro);
                alert('Erro ao cadastrar usuário.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro de conexão com o servidor.');
        }
    };

    //Para mudar os valores dos inputs
    useEffect(() => {
        if (location.pathname !== "/cadastro") {
            setNome(prop.nome || "");
            setData(prop.dataNascimento ? prop.dataNascimento.slice(0,10) : "");
            setTel(prop.telefone || "");
            setEmpresa(prop.nomeEmpresa || "");
            setEmail(prop.email || "");
            setPassword(prop.senha || "");
            setConfirmPassword(prop.senha || "");
        }
    }, [location.pathname, prop.nome, prop.dataNascimento, prop.telefone, prop.nomeEmpresa, prop.email, prop.senha]);


    return (
        <div id="caixaForm" className="caixaSegurar formCadastro">

            <h1>{location.pathname === "/cadastro" ? "Cadastro" : "Dados do Usuário"}</h1>

            <span className='msgEditar'>{location.pathname === "/cadastro" ? null : "Edite seu perfil e se mantenha atualizado"}</span>

            <form id="formLogin" onSubmit={location.pathname === "/cadastro" ? enviarDados : prop.onSubmit}>
                <input
                    type="text"
                    placeholder="Nome completo"
                    id='campNome'
                    required
                    value={nome}
                    onChange={handleNomeChange}
                />
                {!isNomeValido && nome.length > 0 && (
                    <p className='error'>Apenas letras e espaços são permitidos.</p>
                )}

                <input
                    type="date"
                    required
                    placeholder='Data de nascimento'
                    value={data.slice(0, 10)}
                    onChange={handleDataChange}
                />
                {!isDataValido && data.length > 0 && (
                    <p className='error'>Apenas maiores de 18 anos.</p>
                )}

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

                <input
                    type="text"
                    placeholder="Nome da sua empresa"
                    required
                    id='campoEmpresa'
                    disabled={isChecked}
                    /*value={isChecked ? "" : empresa}*/
                    value={empresa}
                    onChange={handleEmpresaChange}
                />
                {!isEmpresaValido && empresa.length > 0 && (
                    <p className='error'>Digite um nome de empresa válido.</p>
                )}

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

                <input
                    type='file' 
                    onChange={(e) => setFoto(e.target.files[0])}
                />

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

                {location.pathname === "/cadastro" ? <input
                    type="password"
                    placeholder="Confirme a senha"
                    required
                    value={confirmPassword}
                    onChange={(e) => validateConfirmPassword(e.target.value)}
                />: null}

                {!passwordMatch && confirmPassword.length > 0 && (
                    <p className='error'>As senhas não coincidem!</p>
                )}

                <input
                    type="submit"
                    value={location.pathname === "/cadastro" ? "Cadastrar" : "Redefinir"}
                    /*onClick={location.pathname === "/cadastro" ? {enviar} : prop.onSubmit}*/
                    
                />

                {/*{erro && <ErroInputVazio />}*/}
                {location.pathname === "/cadastro" ? <Raiz /> : null}
                {location.pathname === "/cadastro" ? <span>Já tem uma conta? <Link to='/login'>Faça login</Link></span> : null}
                
            </form>
        </div>
    );
}