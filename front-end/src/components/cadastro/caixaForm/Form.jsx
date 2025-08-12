// Importações necessárias
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Autenticacao } from '../autenticacao.js';
import { Raiz } from "../../google/Raiz";

export function Form(prop) {

    // Hook para obter informações sobre a rota atual
    const location = useLocation();

    // Instância da classe de validação
    const validacao = new Autenticacao();

    // Hook para navegação programática
    const navigate = useNavigate();

    // ---------- Estado e lógica para o campo Nome ----------
    const [nome, setNome] = useState("");
    const [isNomeValido, setIsNomeValido] = useState(true);
    const handleNomeChange = (e) => {
        const value = e.target.value;
        setNome(value);
        // Atualiza o nome do usuário no perfil, se estiver nessa rota
        {location.pathname === "/perfil" ? prop.setNomeUsuario(value) : null}
        setIsNomeValido(validacao.padraoString(value));
    };

    // ---------- Estado e lógica para o campo Data de Nascimento ----------
    const [data, setData] = useState("");
    const [isDataValido, setIsDataValido] = useState(true);
    const handleDataChange = (e) => {
        const value = e.target.value;
        setData(value);
        {location.pathname === "/perfil" ? prop.setDataNascimento(value) : null}
        setIsDataValido(validacao.padraoData(value));
    };

    // ---------- Estado e lógica para o campo Telefone ----------
    const [tel, setTel] = useState("");
    const [isTelefoneValido, setIsTelefoneValido] = useState(true);
    const handleTelefoneChange = (e) => {
        // Remove caracteres não numéricos
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) {
            value = value.slice(0, 11);
        }

        // Aplica máscara de telefone
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

        // Ajusta formatação ao apagar
        if (e.nativeEvent.inputType === "deleteContentBackward") {
            setTel(e.target.value);
        } else {
            setTel(formatted);
        }

        // Valida o número
        setIsTelefoneValido(validacao.padraoTelefone(value));
        {location.pathname === "/perfil" ? prop.setTelefone(value) : null}
    };

    // ---------- Estado e lógica para Empresa ----------
    const [isChecked, setIsChecked] = useState(false);
    const [empresa, setEmpresa] = useState("");
    const [isEmpresaValido, setIsEmpresaValido] = useState(true);
    const handleEmpresaChange = (e) => {
        const value = e.target.value;
        setEmpresa(value);
        {location.pathname === "/perfil" ? prop.setNomeEmpresa(value) : null}
        setIsEmpresaValido(validacao.padraoString(value));
    };

    // Limpa o campo empresa se a opção "Não tenho empresa" for marcada
    useEffect(() => {
        if (isChecked) {
            setEmpresa("");
            {location.pathname === "/perfil" ? prop.setNomeEmpresa("") : null}
        }
    }, [isChecked]);

    // ---------- Estado e lógica para Email ----------
    const [email, setEmail] = useState("");
    const [isEmailValido, setIsEmailValido] = useState(true);
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        {location.pathname === "/perfil" ? prop.setEmail(value) : null}
        setIsEmailValido(validacao.padraoEmail(value));
    };

    // ---------- Estado e lógica para Foto ----------
    const [foto, setFoto] = useState("");
    const handleChangeFoto = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFoto(file);
            {location.pathname === "/perfil" ? prop.setFoto(file) : null}
        }
    };

    // ---------- Estado e lógica para Senha ----------
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [showValidation, setShowValidation] = useState(false);

    // Regras de validação da senha
    const [validation, setValidation] = useState({
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
        hasValidLength: false,
    });

    // Valida confirmação de senha
    const validateConfirmPassword = (value) => {
        setConfirmPassword(value);
        setPasswordMatch(value === password);
    };

    // Valida senha principal
    const validatePassword = (value) => {
        setPassword(value);
        {location.pathname === "/perfil" ? prop.setSenha(value) : null}
        setValidation({
            hasUpperCase: /[A-Z]/.test(value),
            hasLowerCase: /[a-z]/.test(value),
            hasNumber: /[0-9]/.test(value),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
            hasValidLength: value.length >= 8 && value.length <= 20,
        });
    };

    // ---------- Função para envio dos dados ----------
    const enviarDados = async (e) => {
        e.preventDefault();

        // Valida campos obrigatórios
        if (
            nome === '' || data === '' ||
            tel === '' || email === '' ||
            (!isChecked && empresa === '') ||
            password === '' || confirmPassword === ''
        ) 

        // Valida senha
        if (!passwordMatch) {
            alert('As senhas não coincidem!');
            return;
        }

        // Monta dados para envio
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('data_nascimento', data);
        formData.append('telefone', tel);
        formData.append('nome_empresa', empresa);
        formData.append('tem_empresa', isChecked ? '1' : '0');
        formData.append('email', email);
        formData.append('senha', password);
        if (foto) {
            formData.append('foto', foto);
            localStorage.setItem("foto", foto);
        }

        // Envia para o backend
        try {
            const response = await fetch('http://localhost:3000/cadastrandoUsuarios', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Usuário cadastrado com sucesso!');
                // Reseta os campos
                setNome('');
                setData('');
                setTel('');
                setEmpresa('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setIsChecked('');
                setFoto('');
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
    
    // ---------- Preenche os campos quando está na tela de edição de perfil ----------
    useEffect(() => {
        if (location.pathname !== "/cadastro") {
            setNome(prop.nome || "");
            setData(prop.dataNascimento ? prop.dataNascimento.slice(0,10) : "");
            setTel(prop.telefone || "");
            setEmpresa(prop.nomeEmpresa || "");
            setEmail(prop.email || "");
            setPassword(prop.senha || "");
            setConfirmPassword(prop.senha || "");
            setIsChecked(!prop.nomeEmpresa);
        }
    }, [location.pathname, prop.nome, prop.dataNascimento, prop.telefone, prop.nomeEmpresa, prop.email, prop.senha]);

    // Renderização do formulário
    return (
        <div id="caixaForm" className="caixaSegurar formCadastro perfilForm">
            {/* Título dinâmico */}
            <h1>{location.pathname === "/cadastro" ? "Cadastro" : "Dados do Usuário"}</h1>

            {/* Mensagem no modo perfil */}
            <span className='msgEditar'>{location.pathname === "/cadastro" ? null : "Edite seu perfil e se mantenha atualizado"}</span>

            {/* Formulário */}
            <form id="formLogin" onSubmit={location.pathname === "/cadastro" ? enviarDados : prop.onSubmit}>
                {/* Campo Nome */}
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

                {/* Campo Data de nascimento */}
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

                {/* Campo Telefone */}
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

                {/* Campo Empresa */}
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

                {/* Checkbox "Não tenho empresa" */}
                <div id="caixaCheckbox" className='loginCheck'>
                    <input
                        type="checkbox"
                        id="checkCadastro"
                        checked={!empresa}
                        onChange={(e) => {
                            const checked = e.target.checked;
                            setIsChecked(checked);
                            if (location.pathname === "/perfil") {
                                prop.setTemEmpresa(checked);
                            }
                            if (checked) {
                                setEmpresa("");
                                if (location.pathname === "/perfil") {
                                    prop.setNomeEmpresa("");
                                }
                            }
                        }}
                    />
                    <label htmlFor="switch"></label>
                    <span>Não tenho uma empresa</span>
                </div>

                {/* Upload de foto */}
                <input
                    type='file' 
                    onChange={handleChangeFoto}
                />

                {/* Campo Email */}
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

                {/* Campo Senha */}
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

                {/* Lista de validação da senha */}
                {showValidation && (
                    <ul className="password-validation">
                        <li style={{ color: validation.hasUpperCase ? "#ffffff5e" : "white" }}>
                            {validation.hasUpperCase ? "✔" : "✖"} Pelo menos uma letra maiúscula
                        </li>
                        <li style={{ color: validation.hasLowerCase ? "#ffffff5e" : "white" }}>
                            {validation.hasLowerCase ? "✔" : "✖"} Pelo menos uma letra minúscula
                        </li>
                        <li style={{ color: validation.hasNumber ? "#ffffff5e" : "white" }}>
                            {validation.hasNumber ? "✔" : "✖"} Pelo menos um número
                        </li>
                        <li style={{ color: validation.hasSpecialChar ? "#ffffff5e" : "white" }}>
                            {validation.hasSpecialChar ? "✔" : "✖"} Pelo menos um caractere especial
                        </li>
                        <li style={{ color: validation.hasValidLength ? "#ffffff5e" : "white" }}>
                            {validation.hasValidLength ? "✔" : "✖"} Entre 8 e 20 caracteres
                        </li>
                    </ul>
                )}

                {/* Campo Confirmação de senha (apenas no cadastro) */}
                {location.pathname === "/cadastro" ? <input
                    type="password"
                    placeholder="Confirme a senha"
                    required
                    value={confirmPassword}
                    onChange={(e) => validateConfirmPassword(e.target.value)}
                /> : null}

                {!passwordMatch && confirmPassword.length > 0 && (
                    <p className='error'>As senhas não coincidem!</p>
                )}

                {/* Botão de envio */}
                <input
                    type="submit"
                    value={location.pathname === "/cadastro" ? "Cadastrar" : "Redefinir"}
                    onClick={location.pathname === "/cadastro" ? () => navigate('/login') : undefined}
                />

                {/* Elementos extras para cadastro */}
                {location.pathname === "/cadastro" ? <Raiz /> : null}
                {location.pathname === "/cadastro" ? <span>Já tem uma conta? <Link to='/login'>Faça login</Link></span> : null}
            </form>
        </div>
    );
}
