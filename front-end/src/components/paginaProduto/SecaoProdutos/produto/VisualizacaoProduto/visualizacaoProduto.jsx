import './estilizacaoStyle.css';
import Barra from '../../../../../assets/produto/barra1.webp';
import { useNavigate } from 'react-router-dom';

export function VisualizacaoProduto(){

    const navigate = useNavigate(); 

    return(

        <div id='principal'>

            <div className='imagemm'>

                <img src={Barra} alt=''/>

            </div>
            <div className='parteTexto'>

            <div id='close' onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>

                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAATBJREFUSEvtlLsuRUEYhb/VSkRDkChEJDyDuCRoxWuIVuJNRKOSeAHxBIgK0bpETckLLPuXKTbnnJlxkh3NmXKy91r/+mbNiI6XOtZnZFAk/L+IbB8Cp5Le+o1qewlYk3QyKMrABLb3gSPgGVj/bWJ7EbgCZoBdSef9THIG8WMIhNBLmvQ7ie0F4AaYBh6ADUmffzJIQj0mwFiteGgUD9n2LHCZkjwCEwnLXZNwS9JHrkpFg5RkLuGaT2JZLG3DWoNgHcyDfaz7JtVmafpaRCF+nRA9JUSxd9vsb5dMsglstyd/BVaA8VY9i0lyNe0Rl/SeziSqG8imSrhyBntNz4+BwBI9/3GbbS+nJJPAjqSLYe7BAXCWeSrCZHWop6L4TFZ+UFXTSq2+n40MivQ6R/QFgd1qGe7ts/oAAAAASUVORK5CYII="/>

            </div>
                <div className='tituloo'>

                    <h1>Mel</h1>
                    
                    <div>

                        <div className='desconto'>Descoto de 10%</div>
                        <div className='frete'>Frete Grátis na primeira conta</div>

                    </div>

                </div>

                <div className='texto'>

                    <p>

                        Deliciosa e prática, a barra de cereal sabor mel oferece energia de forma saudável. Perfeita para o café da manhã ou um lanche rápido, ela combina crocância com o toque doce do mel. Sem conservantes artificiais, é uma opção nutritiva para sua rotina.

                        Composição: Aveia, mel, flocos de milho, açúcar mascavo, óleo de coco, amendoim, extrato de baunilha, sal marinho.

                    </p>

                    <span className='preco'>R$ 3,0</span>

                </div>

                <div className='form'>

                    <form>
                        <div className='cep'>

                            <label htmlFor='cep'>Calcular CEP:</label>
                            <input type='text' placeholder='CEP' name='cep'/>

                        </div>

                        <div className='butoes'>

                            <input type='button' value='Comprar'/>

                            <img className='carro' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAATFJREFUSEvNlCFPA0EQhb8XgsGSEBxBww+oQmEQOEQNmgAGRfgLeCAVKAypwCEwCBTBg0BjSDAYFAmP3aQlV+jd7XU5wpgVOzPfzL6ZFS2bWs7P3wFse9DNG3Aqae83uvvqoAAY5l2VdJ0L+fFEtveBQ+BS0nobgFngGZgCFiQ95UDGimz7DNjMSNyX1I3xZYAOcJsBeJC0XAqIF7bvgaUJIQeSoo7le2B7C+hNAPgIcfOSXuoAM0B0imcTu5K0Ngyo3GTbRwGy2yQ70JXUTwVEDaIWqfYKzEl6TwIMxL4BVhIJPUnbRd/az852nOfzREAnvP9dU8A08Ags1kAuJG1896ntILHyUrckgO1jYCcIeBLme2Sqqu4q96BYUvErlzRSVNVdE0C7HeTokKTBvwZ8Ao9FZRk8/+9qAAAAAElFTkSuQmCC"/>

                        </div>


                    </form>

                </div>

            </div>

        </div>

    )
  
}