import './carrinhoDeCompras.css';

import { Link } from "react-router-dom";
import { ProdutoCarrinho } from './ProdutoCarrinho/ProdutoCarrinho';
import { useEffect, useState } from "react";

export function Carrinho(){

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const itens = JSON.parse(localStorage.getItem('carrinho')) || [];
        setProdutos(itens);
    }, []);

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
                    <span>Subtotal: R$ 50</span>
                    <span>Cupom: R$ 0</span>
                    <span>Desconto: R$ 10</span>
                    <span id='total'>TOTAL: R$ 20</span>

                </div>

                <div id='botoesCarrinho'>

                    <Link to='/produtos'><button>Continuar comprando</button></Link>
                    <button>Finalizar  compra</button>

                </div>

            </section>

        </main>

    )

}