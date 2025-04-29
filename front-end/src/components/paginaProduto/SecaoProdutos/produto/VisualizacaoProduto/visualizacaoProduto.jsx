import './visualizacaoProduto.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function VisualizacaoProduto() {
    const navigate = useNavigate();
    const location = useLocation();

    const { nome, imagem, descricao, preco } = location.state || {};

    const [cep, setCep] = useState('');
    const [frete, setFrete] = useState(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    function calcularFrete() {
        // Simulação de regra de frete por faixa de CEP
        if (cep.startsWith("01")) setFrete(10); // SP
        else if (cep.startsWith("20")) setFrete(25); // RJ
        else if (cep.startsWith("70")) setFrete(15); // DF
        else if (cep.startsWith("53")) setFrete(5);
        else if (cep.length === 8) setFrete(30); // outros válidos
        else setFrete('CEP inválido');
    }

    return (
        <div id='caixaPrincipal'>
            <div className='caixaImagemProduto'>
                <img src={imagem} alt='produto' />
            </div>

            <div className='conteudoProduto'>
                <div id='close' onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANBJREFUSEvtlEEKwjAQRd8/hKB7Bc8ggrcQXAteR1wLHkbBO7hxL3iHaCCFUmsyKcmuXZbhvT+TTETlT5X5jILkhM0jcs5NgZ2kY5LaKjAJAvwKLICDpLNVkhQE+A2YA09gJelVRNCBP4BNDtyH+NuBc24C3ENyD19LeluTN3W9ggD3M19+D3YwvLeDDtwcWFJv2J+f1QU+ctURNTMpJYnuQYmblLto2buQFIQz8e9Q81TsJV2s18skCJIZsJV0ssKjm5wDidWaOxgqHAXJyX0AzWRKGaDSgDcAAAAASUVORK5CYII=" alt='seta' className="seta" />
                </div>

                <div className='caixaDeTitulo'>
                    <h1>{nome}</h1>
                    <div>
                        <div className='desconto'>Desconto de 10%</div>
                        <div className='frete'>Frete Grátis na primeira compra</div>
                    </div>
                </div>

                <div className='caixaDescricao'>
                    <p>{descricao}</p>
                    <span className='visualizacaoPreco'>R$ {preco}</span>
                </div>

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
                            <button type='button' className='botaoFrete' onClick={calcularFrete}>Calcular</button>
                        </div>

                        {frete !== null && (
                            <div className='freteResultado'>
                                {typeof frete === 'number'
                                    ? `Frete estimado: R$ ${frete},00`
                                    : frete}
                            </div>
                        )}

                        <div className='caixaDeBotoes'>
                            <Link to='/comprar'
                                state={{
                                    nome: nome,
                                    imagem: imagem,
                                    preco: preco
                                }}
                            >
                                <button>Comprar</button>
                            </Link>

                            <img className='botaoCarrinho' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAATFJREFUSEvNlCFPA0EQhb8XgsGSEBxBww+oQmEQOEQNmgAGRfgLeCAVKAypwCEwCBTBg0BjSDAYFAmP3aQlV+jd7XU5wpgVOzPfzL6ZFS2bWs7P3wFse9DNG3Aqae83uvvqoAAY5l2VdJ0L+fFEtveBQ+BS0nobgFngGZgCFiQ95UDGimz7DNjMSNyX1I3xZYAOcJsBeJC0XAqIF7bvgaUJIQeSoo7le2B7C+hNAPgIcfOSXuoAM0B0imcTu5K0Ngyo3GTbRwGy2yQ70JXUTwVEDaIWqfYKzEl6TwIMxL4BVhIJPUnbRd/az852nOfzREAnvP9dU8A08Ags1kAuJG1896ntILHyUrckgO1jYCcIeBLme2Sqqu4q96BYUvErlzRSVNVdE0C7HeTokKTBvwZ8Ao9FZRk8/+9qAAAAAElFTkSuQmCC" alt='carrinho de compras' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}