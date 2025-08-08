// Estilos
import './visualizacaoProduto.css';
import './responsiveVisualizacao.css';

// Dependências
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function VisualizacaoProduto() {
    const navigate = useNavigate();
    const location = useLocation();

    //Dados recebidos da página anterior (via navigate)
    const { nome, imagem, descricao, preco } = location.state || {};

    // Estados
    const [cep, setCep] = useState('');              // CEP digitado pelo usuário
    const [frete, setFrete] = useState(null);        // Valor ou mensagem de frete
    const [modalAberto, setModalAberto] = useState(false); // Controle do modal de imagem

    // Garante que a página comece no topo ao carregar
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    //Calcula o frete com base no prefixo do CEP
    function calcularFrete() {
        if (cep.startsWith("01")) setFrete(10);        // São Paulo
        else if (cep.startsWith("20")) setFrete(25);   // Rio de Janeiro
        else if (cep.startsWith("70")) setFrete(15);   // Distrito Federal
        else if (cep.startsWith("53")) setFrete(5);    // Pernambuco
        else if (cep.length === 8) setFrete(30);       // Outros CEPs válidos
        else setFrete('CEP inválido');                 // CEP inválido
    }

    //Abre modal com imagem ampliada
    function abrirModal() {
        setModalAberto(true);
    }

    //Fecha modal de imagem
    function fecharModal() {
        setModalAberto(false);
    }

    //Adiciona produto ao carrinho no localStorage (sem duplicar)
    function adicionarAoCarrinho() {
        const novoProduto = { nome, preco, imagem };
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

        const jaExiste = carrinho.some(item => item.nome === novoProduto.nome);
        if (!jaExiste) {
            carrinho.push(novoProduto);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
        }
    }

    return (
        <div id='caixaPrincipal'>

            {/*Imagem principal do produto */}
            <div className='caixaImagemProduto'>
                <img src={imagem} onClick={abrirModal} alt='produto' />
            </div>

            {/*Modal de imagem ampliada */}
            {modalAberto && (
                <div className='modalImagem' onClick={fecharModal}>
                    <div className='modalConteudo'>
                        <img src={imagem} alt='imagem ampliada' />
                    </div>
                </div>
            )}

            {/*Detalhes do produto */}
            <div className='conteudoProduto'>

                {/*Botão de voltar */}
                <div id='close' onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                    <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANBJREFUSEvtlEEKwjAQRd8/hKB7Bc8ggrcQXAteR1wLHkbBO7hxL3iHaCCFUmsyKcmuXZbhvT+TTETlT5X5jILkhM0jcs5NgZ2kY5LaKjAJAvwKLICDpLNVkhQE+A2YA09gJelVRNCBP4BNDtyH+NuBc24C3ENyD19LeluTN3W9ggD3M19+D3YwvLeDDtwcWFJv2J+f1QU+ctURNTMpJYnuQYmblLto2buQFIQz8e9Q81TsJV2s18skCJIZsJV0ssKjm5wDidWaOxgqHAXJyX0AzWRKGaDSgDcAAAAASUVORK5CYII="
                        alt='seta'
                        className="seta"
                    />
                </div>

                {/* Nome, desconto e frete */}
                <div className='caixaDeTitulo'>
                    <h1>{nome}</h1>
                    <div>
                        <div className='desconto'>Desconto de 10%</div>
                        <div className='frete'>Frete Grátis na primeira compra</div>
                    </div>
                </div>

                {/* Descrição e preço */}
                <div className='caixaDescricao'>
                    <p>{descricao}</p>
                    <span className='visualizacaoPreco'>R$ {preco}</span>
                </div>

                {/* Formulário de cálculo de frete */}
                <div className='caixaDoForm'>
                    <form onSubmit={(e) => e.preventDefault()}>

                        <div className='caixaDoCep'>
                            <label htmlFor='cep'>Calcular CEP:</label>
                            <input
                                type='text'
                                placeholder='CEP'
                                name='cep'
                                value={cep}
                                onChange={(e) => setCep(e.target.value)}
                                maxLength={8}
                            />
                            <button
                                type='button'
                                className='botaoFrete'
                                onClick={calcularFrete}
                            >
                                Calcular
                            </button>

                            {/* Exibição do frete calculado */}
                            {frete !== null && (
                                <div className='freteResultado'>
                                    {typeof frete === 'number'
                                        ? `Frete estimado: R$ ${frete},00`
                                        : frete}
                                </div>
                            )}
                        </div>

                        {/* Botões de ação */}
                        <div className='caixaDeBotoes'>

                            {/* Comprar */}
                            <button
                                onClick={() => {
                                    document.getElementById('caixaPrincipal').classList.add('animar-saida');
                                    setTimeout(() => {
                                        navigate('/comprar', { state: { nome, imagem, preco, frete } });
                                    }, 60);
                                }}
                            >
                                Comprar
                            </button>

                            {/* Adicionar ao Carrinho */}
                            <Link
                                to='/carrinho'
                                state={{ nome, preco, imagem }}
                                onClick={adicionarAoCarrinho}
                            >
                                <img
                                    className='botaoCarrinho'
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAATFJREFUSEvNlCFPA0EQhb8XgsGSEBxBww+oQmEQOEQNmgAGRfgLeCAVKAypwCEwCBTBg0BjSDAYFAmP3aQlV+jd7XU5wpgVOzPfzL6ZFS2bWs7P3wFse9DNG3Aqae83uvvqoAAY5l2VdJ0L+fFEtveBQ+BS0nobgFngGZgCFiQ95UDGimz7DNjMSNyX1I3xZYAOcJsBeJC0XAqIF7bvgaUJIQeSoo7le2B7C+hNAPgIcfOSXuoAM0B0imcTu5K0Ngyo3GTbRwGy2yQ70JXUTwVEDaIWqfYKzEl6TwIMxL4BVhIJPUnbRd/az852nOfzREAnvP9dU8A08Ags1kAuJG1896ntILHyUrckgO1jYCcIeBLme2Sqqu4q96BYUvErlzRSVNVdE0C7HeTokKTBvwZ8Ao9FZRk8/+9qAAAAAElFTkSuQmCC"
                                    alt='carrinho de compras'
                                />
                            </Link>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
