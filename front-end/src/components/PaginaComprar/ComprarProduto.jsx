import "./comprasStyle.css";
import Boleto from "../../assets/produto/boleto.png";
import CartaoCredito from "../../assets/produto/cartaoCredito.png"
import Pix from "../../assets/produto/pix.png"

import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from "react";
import { PagamentoQr } from "./Qr/PagamentoQr";
import Credito from "./CartaoCredito/Credito";

import { useEffect } from 'react';

export function ComprarProduto() {
    const navigate = useNavigate();
    const location = useLocation();
    const { nome, imagem, preco } = location.state || {};


    const [mostrarPix, setMostrarPix] = useState(false);//Mostrar tela de pix ou não
    const [mostrarCredito, setMostrarCredito] = useState(false);

    //Formação do endereço
    const [enderecos, setEnderecos] = useState([
        {
            rua: "Traversa Bernardo Reis",
            numero: "37 C",
            referencia: "Próximo à farmácia",
            cidade: "Paulista",
            bairro: "Pau Amarelo"
        }
    ]);

    const [formVisivel, setFormVisivel] = useState(false);//Mostrando ou não formulário de endereço
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [referencia, setReferencia] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [editando, setEditando] = useState(null); // Estado para controlar qual endereço está sendo editado

    //Criando endereço novo
    const adicionarEndereco = () => {
        if (!rua || !numero || !referencia || !cidade || !bairro) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
        const novoEndereco = {
            rua,
            numero,
            referencia,
            cidade,
            bairro
        };
        setEnderecos([...enderecos, novoEndereco]);
        limparCampos();
        setFormVisivel(false);
    };

    //Editando endereço
    const editarEndereco = (index) => {
        const enderecoParaEditar = enderecos[index];
        setRua(enderecoParaEditar.rua);
        setNumero(enderecoParaEditar.numero);
        setReferencia(enderecoParaEditar.referencia);
        setCidade(enderecoParaEditar.cidade);
        setBairro(enderecoParaEditar.bairro);
        setEditando(index); // Indica que estamos editando o endereço na posição `index`
        setFormVisivel(true);
    };

    //Salvando
    const salvarEnderecoEditado = () => {
        if (!rua || !numero || !referencia || !cidade || !bairro) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const enderecosAtualizados = [...enderecos];
        enderecosAtualizados[editando] = { rua, numero, referencia, cidade, bairro };
        setEnderecos(enderecosAtualizados);

        limparCampos();
        setEditando(null); // Resetando a edição
        setFormVisivel(false);
    };

    //Excluído
    const excluirEndereco = (index) => {
        const enderecosAtualizados = enderecos.filter((_, i) => i !== index);
        setEnderecos(enderecosAtualizados);
    };

    // Função para limpar os campos do formulário
    const limparCampos = () => {
        setRua("");
        setNumero("");
        setReferencia("");
        setCidade("");
        setBairro("");
    };


    const gerarBoleto = async () => {
        try {
          const res = await fetch('http://localhost:3001/gerar-boleto', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!res.ok) throw new Error('Erro ao gerar boleto');
      
          const blob = await res.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'boleto.pdf'; // Nome do arquivo
          a.click();
          window.URL.revokeObjectURL(url);
        } catch (err) {
          console.error('Erro ao baixar boleto:', err);
        }
      };

    /* Rolando página pro início */
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
      
      
    return (
        <section className="comprar">
            <div id="close" onClick={() => navigate(-1)} style={{ cursor: 'pointer', marginLeft: "45px" }}>
                <img className='seta' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANBJREFUSEvtlEEKwjAQRd8/hKB7Bc8ggrcQXAteR1wLHkbBO7hxL3iHaCCFUmsyKcmuXZbhvT+TTETlT5X5jILkhM0jcs5NgZ2kY5LaKjAJAvwKLICDpLNVkhQE+A2YA09gJelVRNCBP4BNDtyH+NuBc24C3ENyD19LeluTN3W9ggD3M19+D3YwvLeDDtwcWFJv2J+f1QU+ctURNTMpJYnuQYmblLto2buQFIQz8e9Q81TsJV2s18skCJIZsJV0ssKjm5wDidWaOxgqHAXJyX0AzWRKGaDSgDcAAAAASUVORK5CYII="/>
            </div>
            <div className="divisaoSetor">
                <div className="cabecalho">
                    <div className="imagemProduto">
                        <img src={imagem} alt="produto" />
                    </div>
                    <div className="titu">
                        <h1>{nome}</h1>
                        <div className="preco">
                            <span>R$ {preco} - <span style={{ color: "#C8A769" }}>10%</span></span>
                            <span>1x</span>
                        </div>
                    </div>
                </div>

                <div className="pagamento">

                    <h2>Pagamento</h2>

                    <div id="tipoPagamento">

                        <div 
                            
                            className='caixaIcone'
                            onClick={() => gerarBoleto()}>

                            <img src={Boleto} className='icone' alt='boleto'/>

                        </div>

                        <div className='caixaIcone' onClick={() => setMostrarCredito(true)}>

                            <img src={CartaoCredito} className='icone' alt='cartão de credito'/>

                        </div>
                        {/* Mostrando tela do pix */}
                        {mostrarCredito && (
                            <Credito fechar={() => setMostrarCredito(false)} /> 
                        )}

                        <div className='caixaIcone' onClick={() => setMostrarPix(true)}>

                            <img src={Pix} className='icone' alt='pix'/>

                        </div>
                    
                    </div>
                </div>

                {/* Mostrando tela do pix */}
                {mostrarPix && (
                    <PagamentoQr fechar={() => setMostrarPix(false)} />
                )}

                <div className="endereco">
                    <h2>Endereço</h2>
                    {enderecos.map((endereco, index) => (
                        <div key={index} className="enderecoOpc">
                            {Object.keys(endereco).map((key) => (
                                <div key={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${endereco[key]}`}</div>
                            ))}
                            <button onClick={() => editarEndereco(index)} className="editarEndereco">Editar</button>
                            <button onClick={() => excluirEndereco(index)} className="excluirEndereco">Excluir</button>
                        </div>
                    ))}

                    {formVisivel ? (
                        <div className="formularioEndereco">
                            <div className="formularioContainer">
                                <h3>{editando !== null ? "Editar endereço" : "Preencha seu novo endereço"}</h3>
                                <span style={{Color: "gray", marginBottom: '20px'}}>Preencha os dados corretamente</span>
                                <input
                                    type="text"
                                    value={rua}
                                    onChange={(e) => setRua(e.target.value)}
                                    placeholder="Rua"
                                    className="inputEndereco"
                                />
                                <input
                                    type="text"
                                    value={numero}
                                    onChange={(e) => setNumero(e.target.value)}
                                    placeholder="Número"
                                    className="inputEndereco"
                                />
                                <input
                                    type="text"
                                    value={referencia}
                                    onChange={(e) => setReferencia(e.target.value)}
                                    placeholder="Referência"
                                    className="inputEndereco"
                                />
                                <input
                                    type="text"
                                    value={cidade}
                                    onChange={(e) => setCidade(e.target.value)}
                                    placeholder="Cidade"
                                    className="inputEndereco"
                                />
                                <input
                                    type="text"
                                    value={bairro}
                                    onChange={(e) => setBairro(e.target.value)}
                                    placeholder="Bairro"
                                    className="inputEndereco"
                                />
                                <div className="formButtons">
                                    <button onClick={editando !== null ? salvarEnderecoEditado : adicionarEndereco} className="salvarEndereco">
                                        {editando !== null ? "Salvar" : "Salvar"}
                                    </button>
                                    <button onClick={() => setFormVisivel(false)} className="cancelarEndereco">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="adicionar" onClick={() => {
                            setFormVisivel(true);
                            limparCampos(); // Limpa os campos antes de adicionar um novo endereço
                        }}>Adicionar novo endereço  

                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARRJREFUSEvtlLFOwzAURc/9CgaGAoIFhJAYixi7deRz2PmZrmxsFUxILC0SQoJ26NCveMiRE6XBjZ8R3eolSvR8jp99HbHjoR3zcQvM7AB4BAwYS1p7FucSRPgLcBKhX8DQI8kKInwKnAHLKBgAn8BtTtIr6Kx8BdxEwTNwCGQ72SpIwSVVHZhZ6MAlSQr64PXBeiW/BB54iWRDUAL3ShpBJy1h/rGkhSfrZnYEfMfajXRVAjMLzzfgqgZKyka4LTezcAHrMZN0GV7aglfg+p8ET5JGjSC1kr920J2XSlHV6l7QnGU3hnUa9lvUt0Vz4NxzgxM175Iu2t9TMb0DHoDTQskHcC9p0isohGbLi/43WVqi4AcdgqsZWC8YwQAAAABJRU5ErkJggg=="/>
                        </div>
                    )}
                </div>

                <div className="resumo">
                    <h2>Resumo</h2>
                    <div id="extrato">
                        <span><span className="bold">Valor do produto:</span> R$ {preco}</span>
                        <span><span className="bold">Desconto:</span> 10%</span>
                        <span><span className="bold">Frete:</span> R$20,0</span>
                        <h3 className="bold">Total: R${parseInt(preco) - (parseInt(preco) * (10 / 100)) + 20}</h3>
                        <button id="confirmar">Confirmar</button>
                    </div>
                </div>
            </div>

            {formVisivel && <div className="fundoEscurecido"></div>}
        </section>
    );
}