import { useState} from "react";
import PropTypes from 'prop-types';

export function ProdutoCarrinho({nome, preco, imagem, onExcluir }){
    
    const [contador, setContador] = useState(0);

    return(

        <section>
            <div className="resumoProdutos">
                <div className='produtoCarrinho'>
        
                    <input type='checkbox' className='checkProduto'/>
                    <img src={imagem} alt='produto'/>
                    <h2>{nome}</h2>
        
                </div>
                <div className='preco'>
        
                    <span>R$ {preco}</span>
        
                </div>
        
                <div className='quantidade'>
        
                    <div className='botaoQuantidade'>
                        
                        {/* Faz o contador somar um */}
                        <button onClick={() => setContador(contador + 1)}>+</button>

                        <div>{contador}</div>

                        {/* Faz o contador diminuir um */}
                        <button
                                
                            onClick={() => {
                                if (contador > 0) {
                                    setContador(contador - 1);
                                }
                            }}
                        >-</button>
                    </div>
        
                </div>
            </div>

            {/* Botão excluir */}
            <div className="botaoExcluir">

                <button onClick={onExcluir}>Excluir Produto</button>

            </div>
        
        </section>

    )

}

// Declaração das props esperadas
ProdutoCarrinho.propTypes = {
    nome: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
    imagem: PropTypes.string.isRequired,
    onExcluir: PropTypes.func.isRequired,
};