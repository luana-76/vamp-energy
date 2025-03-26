import { CaixaProduto } from './produto/caixaProduto';
import './SecaoProduto.css';
export function ContainerDeProduto(prop){

    return(

        <section id='tagSection'>

            <div className='titulo'>

                <h2>{prop.nomeSecao}</h2>

            </div>
            <div id='alinhamentoCaixas'>
            
                <CaixaProduto imagem={prop.imagem1} nomeProduto={prop.nomeProduto1} preco={prop.preco1}/>
                <CaixaProduto imagem={prop.imagem2} nomeProduto={prop.nomeProduto2} preco={prop.preco2}/>
                <CaixaProduto imagem={prop.imagem3} nomeProduto={prop.nomeProduto3} preco={prop.preco3}/>
                <CaixaProduto imagem={prop.imagem4} nomeProduto={prop.nomeProduto4} preco={prop.preco4}/>
                <CaixaProduto imagem={prop.imagem4} nomeProduto={prop.nomeProduto4} preco={prop.preco4}/>

            </div>

        </section>

    )

}