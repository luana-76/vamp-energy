import './carrinhoDeCompras.css';

import { Link } from "react-router-dom";
import { ProdutoCarrinho } from './ProdutoCarrinho/ProdutoCarrinho';

export function Carrinho(){


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

            <ProdutoCarrinho/>

            <section className="resumoFinalizacao">

                <form id='caixaDoCupom'>

                    <label htmlFor='cupom'>Código de cupom</label>
                    <input type='text' name='cupom'/>
                    <button>Aplicar</button>

                </form>

                <div id='resumo'>
                    
                    <h3>Revisão</h3>
                    <span>Subtotal: R$ 50</span>
                    <span>Cupom: R$ 10</span>
                    <span>Desconto: R$ 10</span>
                    <span id='total'>TOTAL: R$ 20</span>

                </div>

                <div id='botoesCarrinho'>

                <   Link to='/produtos'><button>Continuar comprando</button></Link>
                    <button>Finalizar  compra</button>

                </div>

            </section>

        </main>

    )

}