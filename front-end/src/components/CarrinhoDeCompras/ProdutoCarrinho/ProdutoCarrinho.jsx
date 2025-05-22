import PropTypes from 'prop-types';
import './produtoCarrinho.css';

export function ProdutoCarrinho({
    nome, preco, imagem, quantidade,
    onExcluir, selecionado, onChange, onQuantidadeChange
  }) {

    return (
        <section>
            <div className="resumoProdutos">
                
                <div className='produtoCarrinho'>
                        
                    <div className="checkbox-wrapper-30">
                        <span className="checkbox">
                            <input
                                type="checkbox"
                                onChange={onChange}
                                checked={selecionado}
                            />
                                <svg>
                                <use xlinkHref="#checkbox-30" className="checkbox"></use>
                                </svg>
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>

                                <symbol id="checkbox-30" viewBox="0 0 22 22">
                                <path fill="none" stroke="currentColor" d="M5.5,11.3L9,14.8L20.2,3.3l0,0c-0.5-1-1.5-1.8-2.7-1.8h-13c-1.7,0-3,1.3-3,3v13c0,1.7,1.3,3,3,3h13 c1.7,0,3-1.3,3-3v-13c0-0.4-0.1-0.8-0.3-1.2"/>
                                </symbol>
                            </svg>
                        </div>
                        <div className='produtoETitulo'>

                            <img src={imagem} alt='produto'/>
                            <h2>{nome}</h2>

                        </div>
                
                    </div>
  
                    <div className='preco'>
                      <span>R$ {(parseInt(preco) * parseInt(quantidade)).toFixed(2)}</span>
                    </div>
  
                    <div className='quantidade'>
                        <div className='botaoQuantidade'>
                            <button onClick={() => onQuantidadeChange(parseInt(quantidade) + 1)}>+</button>
                            <div>{parseInt(quantidade)}</div>
                            <button onClick={() => {

                                if (parseInt(quantidade) > 1) {
                                    onQuantidadeChange(parseInt(quantidade) - 1);
                                }
                              
                            }}>-</button>
                        </div>
                    </div>
                </div>
  
              <div className="botaoExcluir">
                  <button onClick={onExcluir}>Excluir Produto</button>
              </div>
          </section>
      );
  }
  
// Declaração das props esperadas
ProdutoCarrinho.propTypes = {

    nome: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
    imagem: PropTypes.string.isRequired,
    onExcluir: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    selecionado: PropTypes.bool.isRequired,
    quantidade: PropTypes.number.isRequired,
    onQuantidadeChange: PropTypes.func.isRequired
    
};