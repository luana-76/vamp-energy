import './estilizacaoStyle.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function VisualizacaoProduto(){

    const navigate = useNavigate();
    const location = useLocation();

    const { nome, imagem, descricao, preco } = location.state || {};

    return(

        <div id='principal'>
            <div className='imagemm'>
                <img src={imagem} alt='' />
            </div>
            <div className='parteTexto'>
                <div id='close' onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>

                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANBJREFUSEvtlEEKwjAQRd8/hKB7Bc8ggrcQXAteR1wLHkbBO7hxL3iHaCCFUmsyKcmuXZbhvT+TTETlT5X5jILkhM0jcs5NgZ2kY5LaKjAJAvwKLICDpLNVkhQE+A2YA09gJelVRNCBP4BNDtyH+NuBc24C3ENyD19LeluTN3W9ggD3M19+D3YwvLeDDtwcWFJv2J+f1QU+ctURNTMpJYnuQYmblLto2buQFIQz8e9Q81TsJV2s18skCJIZsJV0ssKjm5wDidWaOxgqHAXJyX0AzWRKGaDSgDcAAAAASUVORK5CYII="/>

                </div>

                <div className='tituloo'>
                    <h1>{nome}</h1>
                    <div>
                        <div className='desconto'>Descoto de 10%</div>
                        <div className='frete'>Frete Grátis na primeira conta</div>
                    </div>
                </div>

                <div className='texto'>
                    <p>{descricao}</p>
                    <span className='preco'>R$ {preco}</span>
                </div>

                <div className='form'>

                    <form>
                        <div className='cep'>

                            <label htmlFor='cep'>Calcular CEP:</label>
                            <input type='text' placeholder='CEP' name='cep'/>

                        </div>

                        <div className='butoes'>

                            {/*<input type='button' value='Comprar'/>*/}
                            <Link to='/comprar' 
                                state={{ 
                                    nome: nome,
                                    imagem: imagem,
                                    preco: preco
                                }}
                            ><button>Comprar</button></Link>

                            <img className='carro' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAATFJREFUSEvNlCFPA0EQhb8XgsGSEBxBww+oQmEQOEQNmgAGRfgLeCAVKAypwCEwCBTBg0BjSDAYFAmP3aQlV+jd7XU5wpgVOzPfzL6ZFS2bWs7P3wFse9DNG3Aqae83uvvqoAAY5l2VdJ0L+fFEtveBQ+BS0nobgFngGZgCFiQ95UDGimz7DNjMSNyX1I3xZYAOcJsBeJC0XAqIF7bvgaUJIQeSoo7le2B7C+hNAPgIcfOSXuoAM0B0imcTu5K0Ngyo3GTbRwGy2yQ70JXUTwVEDaIWqfYKzEl6TwIMxL4BVhIJPUnbRd/az852nOfzREAnvP9dU8A08Ags1kAuJG1896ntILHyUrckgO1jYCcIeBLme2Sqqu4q96BYUvErlzRSVNVdE0C7HeTokKTBvwZ8Ao9FZRk8/+9qAAAAAElFTkSuQmCC"/>

                        </div>


                    </form>

                </div>

            </div>

        </div>

    )
  
}