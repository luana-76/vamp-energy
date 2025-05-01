import Creatina from '../../assets/produto/teste0.webp'
import './carrinhoDeCompras.css';
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
                            <li>Valor</li>

                        </ul>

                    </div>

                </div>

            </section>

            <section className="resumoProdutos">

                <div className='produtoCarrinho'>

                    <input type='checkbox' className='checkProduto'/>
                    <img src={Creatina} alt='produto'/>
                    <h2>Creatina</h2>

                </div>
                <div className='preco'>

                    <span>R$ 50</span>

                </div>

                <div className='quantidade'>

                    <div className='botaoQuantidade'>
                        <button>+</button>
                        <div>0</div>
                        <button>-</button>
                    </div>

                </div>

                <div className='valor'>

                    <span>R$ 50</span>

                </div>

            </section>

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

            </section>

        </main>

    )

}