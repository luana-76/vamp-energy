import { useState} from "react";
import { useLocation } from 'react-router-dom';

export function ProdutoCarrinho(){

    
    const [contador, setContador] = useState(0);

    const location = useLocation();
    const { nome, preco, imagem } = location.state || {};

    return(

        <section className="resumoProdutos">
        
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
                                <button onClick={
        
                                    () => setContador(contador + 1)
        
                                }>+</button>
                                <div>{contador}</div>
                                <button
                                
                                onClick={() => {
                                    if (contador > 0) {
                                        setContador(contador - 1);
                                    }
                                }}
                                >-</button>
                            </div>
        
                        </div>
        
                    </section>

    )

}