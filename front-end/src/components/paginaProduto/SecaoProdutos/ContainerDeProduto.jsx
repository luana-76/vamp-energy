import { CaixaProduto } from './produto/caixaProduto';
import './SecaoProduto.css';

import { Link } from "react-router-dom";
export function ContainerDeProduto(prop){

    return(

        <section id='tagSection'>

            <div className='titulo'>

                <h2>{prop.nomeSecao}</h2>

            </div>
            <div id='alinhamentoCaixas'>
            
                <Link to='/secaoProduto'>
                    <CaixaProduto imagem={prop.imagem1} descricao={prop.descricao1} nomeProduto={prop.nomeProduto1} preco={prop.preco1}/>
                </Link>
                <CaixaProduto imagem={prop.imagem2} descricao={prop.descricao2} nomeProduto={prop.nomeProduto2} preco={prop.preco2}/>
                <CaixaProduto imagem={prop.imagem3} descricao={prop.descricao3} nomeProduto={prop.nomeProduto3} preco={prop.preco3}/>
                <CaixaProduto imagem={prop.imagem4} descricao={prop.descricao4} nomeProduto={prop.nomeProduto4} preco={prop.preco4}/>
                <CaixaProduto imagem={prop.imagem5} descricao={prop.descricao5} nomeProduto={prop.nomeProduto5} preco={prop.preco5}/>

            </div>

        </section>

    )

}