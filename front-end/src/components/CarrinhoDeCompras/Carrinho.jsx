import './carrinhoDeCompras.css';

import { Link } from "react-router-dom";
import { ProdutoCarrinho } from './ProdutoCarrinho/ProdutoCarrinho';
import { useEffect, useState } from "react";

export function Carrinho(){

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {

        // Recupera os itens salvos no localStorage com a chave 'carrinho'
        const itens = JSON.parse(localStorage.getItem('carrinho')) || [];

        // Adiciona a propriedade 'selecionado: false' a cada item (para controle do checkbox)
        const itensComSelecionado = itens.map(item => ({ ...item, selecionado: false }));

        // Define o estado com os itens atualizados
        setProdutos(itensComSelecionado);

    }, []);

    // Função para alternar o valor do checkbox de um produto específico
    function alternarSelecionado(index) {

        // Cria uma cópia dos produtos atuais
        const novosProdutos = [...produtos];

         // Inverte o valor de 'selecionado' no produto com o índice fornecido
        novosProdutos[index].selecionado = !novosProdutos[index].selecionado;

        // Atualiza o estado com os novos valores
        setProdutos(novosProdutos);
    }

    // Calcula o total dos produtos que estão selecionados (checkbox marcado)
    const totalSelecionado = produtos
    .filter(p => p.selecionado)// Filtra só os produtos marcados
    .reduce((soma, p) => soma + parseFloat(p.preco), 0);// Soma os preços desses produtos

    
    /* Botão de excluir */
    function excluirProduto(index) {
        const novosProdutos = produtos.filter((_, i) => i !== index);
        setProdutos(novosProdutos);
        localStorage.setItem('carrinho', JSON.stringify(novosProdutos));
    }

    return(

        <main id='mainCarrinho'>

            <section className='seguraProdutos'>

                <h1>Carrinho De Compras</h1>

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

            {produtos.length === 0 && (
                <section className='avisoCarrinho'>
                    <p>Seu carrinho está vazio no momento.</p>
                </section>
            )}


            {produtos.map((produto, index) => (
                <ProdutoCarrinho
                    key={index}
                    nome={produto.nome}
                    preco={produto.preco}
                    imagem={produto.imagem}
                    onExcluir={() => excluirProduto(index)}
                    selecionado={produto.selecionado}
                    onChange={() => alternarSelecionado(index)}
                />
            ))}

            <section className="resumoFinalizacao">

                <form id='caixaDoCupom'>

                    <label htmlFor='cupom'>Código de cupom</label>
                    <input type='text' name='cupom'/>
                    <button>Aplicar</button>

                </form>

                <div id='resumo'>
                    
                    <h3>Revisão</h3>
                    <span>Subtotal: R$ {totalSelecionado.toFixed(2)}</span>
                    <span>Cupom: R$ 0</span>
                    <span>Desconto: R$ 10</span>
                    <span id='total'>TOTAL: R$ {(totalSelecionado - (totalSelecionado * 10) / 100).toFixed(2)}</span>

                </div>

                <div id='botoesCarrinho'>

                    <Link to='/produtos'><button>Continuar comprando</button></Link>
                    <button>Finalizar  compra</button>

                </div>

            </section>

        </main>

    )

}