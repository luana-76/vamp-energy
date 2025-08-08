import './carrinhoDeCompras.css';
import './responsivoCarrinho.css';

import { Link, useNavigate } from "react-router-dom";
import { ProdutoCarrinho } from './ProdutoCarrinho/ProdutoCarrinho';
import { useEffect, useState } from "react";

export function Carrinho() {

    const [produtos, setProdutos] = useState([]);
    const navigate = useNavigate();

    // Carrega os produtos do carrinho quando o componente é montado
    useEffect(() => {
        const itens = JSON.parse(localStorage.getItem('carrinho')) || [];

        // Adiciona propriedades extras para controle
        const itensComEstado = itens.map(item => ({
            ...item,
            selecionado: false,
            quantidade: 1
        }));

        setProdutos(itensComEstado);
    }, []);

    // Atualiza a quantidade de um produto específico
    function atualizarQuantidade(index, novaQuantidade) {
        const novosProdutos = [...produtos];
        novosProdutos[index].quantidade = novaQuantidade;
        setProdutos(novosProdutos);
    }

    // Alterna o estado de "selecionado" (checkbox) de um produto
    function alternarSelecionado(index) {
        const novosProdutos = [...produtos];
        novosProdutos[index].selecionado = !novosProdutos[index].selecionado;
        setProdutos(novosProdutos);
    }

    // Remove um produto do carrinho
    function excluirProduto(index) {
        const novosProdutos = produtos.filter((_, i) => i !== index);
        setProdutos(novosProdutos);
        localStorage.setItem('carrinho', JSON.stringify(novosProdutos));
    }

    // Calcula o total apenas dos produtos selecionados
    const totalSelecionado = produtos
        .filter(p => p.selecionado)
        .reduce((soma, p) => soma + (parseFloat(p.preco) * parseFloat(p.quantidade)), 0);

    return (
        <main id='mainCarrinho'>

            {/* Botão de voltar */}
            <div id="close" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                <img
                    className='seta'
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANBJREFUSEvtlEEKwjAQRd8/hKB7Bc8ggrcQXAteR1wLHkbBO7hxL3iHaCCFUmsyKcmuXZbhvT+TTETlT5X5jILkhM0jcs5NgZ2kY5LaKjAJAvwKLICDpLNVkhQE+A2YA09gJelVRNCBP4BNDtyH+NuBc24C3ENyD19LeluTN3W9ggD3M19+D3YwvLeDDtwcWFJv2J+f1QU+ctURNTMpJYnuQYmblLto2buQFIQz8e9Q81TsJV2s18skCJIZsJV0ssKjm5wDidWaOxgqHAXJyX0AzWRKGaDSgDcAAAAASUVORK5CYII="
                    alt='setaVoltar'
                />
            </div>

            {/* Cabeçalho do carrinho */}
            <section className='seguraProdutos'>
                <h1>Carrinho De<br /> Compras</h1>
                <div className='separatoriaProduto'>
                    <div className='titulosDoCarrinho'>
                        <ul>
                            <li>Produto</li>
                            <li>Preço</li>
                            <li>Quantidade</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Mensagem se o carrinho estiver vazio */}
            {produtos.length === 0 && (
                <section className='avisoCarrinho'>
                    <p>Seu carrinho está vazio no momento.</p>
                </section>
            )}

            {/* Lista de produtos no carrinho */}
            {produtos.map((produto, index) => (
                <ProdutoCarrinho
                    key={index}
                    nome={produto.nome}
                    preco={produto.preco}
                    imagem={produto.imagem}
                    onExcluir={() => excluirProduto(index)}
                    selecionado={produto.selecionado}
                    onChange={() => alternarSelecionado(index)}
                    quantidade={produto.quantidade}
                    onQuantidadeChange={(novaQtd) => atualizarQuantidade(index, novaQtd)}
                />
            ))}

            {/* Resumo da compra */}
            <section className="resumoFinalizacao">

                {/* Campo para inserir cupom */}
                <form id='caixaDoCupom'>
                    <label htmlFor='cupom'>Código de cupom</label>
                    <input type='text' name='cupom' />
                    <button className='botaoFrete'>Aplicar</button>
                </form>

                {/* Valores de subtotal, descontos e total */}
                <div id='resumo'>
                    <h3>Revisão</h3>
                    <span>Subtotal: R$ {totalSelecionado.toFixed(2)}</span>
                    <span>Cupom: R$ 0</span>
                    <span>Desconto: R$ 10</span>
                    <span id='total'>
                        TOTAL: R$ {(totalSelecionado - (totalSelecionado * 10) / 100).toFixed(2)}
                    </span>
                </div>

                {/* Botões de ação */}
                <div id='botoesCarrinho' className='caixaDeBotoes'>
                    <Link to='/produtos'>
                        <button>Continuar comprando</button>
                    </Link>
                    <button>Finalizar compra</button>
                </div>

            </section>
        </main>
    );
}