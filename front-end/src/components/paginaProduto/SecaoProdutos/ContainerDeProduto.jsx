
import './ContainerProduto.css'; 

import { Link } from "react-router-dom";
import { CaixaDoProduto } from './produto/CaixaDoProduto';

export function ContainerDeProduto(prop){

    return(

        <section id='tagSection'>
            
            <div className='titulo'>

                <h2>{prop.nomeSecao}</h2>

            </div>

            <div id='alinhamentoCaixas'>

                {/* Pegando as props */}
                <Link to='/secaoProduto'

                    state={{ 
                        nome: prop.nomeProduto1,
                        imagem: prop.imagem1,
                        descricao: prop.descricaoCompleta1,
                        preco: prop.preco1
                    }}
                >

                    <CaixaDoProduto 
                        imagem={prop.imagem1}
                        descricao={prop.descricao1}
                        nomeProduto={prop.nomeProduto1}
                        preco={prop.preco1}
                    />

                </Link>

                <Link to='/secaoProduto'
                
                    state={{ 
                        nome: prop.nomeProduto2,
                        imagem: prop.imagem2,
                        descricao: prop.descricaoCompleta2,
                        preco: prop.preco2
                    }}
                >
                    <CaixaDoProduto
                        imagem={prop.imagem2}
                        descricao={prop.descricao2}
                        nomeProduto={prop.nomeProduto2}
                        preco={prop.preco2}
                    />

                </Link>

                <Link to='/secaoProduto'
                
                    state={{ 
                        nome: prop.nomeProduto3,
                        imagem: prop.imagem3,
                        descricao: prop.descricaoCompleta3,
                        preco: prop.preco3
                    }}
                >

                    <CaixaDoProduto 
                        imagem={prop.imagem3}
                        descricao={prop.descricao3}
                        nomeProduto={prop.nomeProduto3}
                        preco={prop.preco3}
                    />

                </Link>

                <Link to='/secaoProduto'
                
                    state={{ 
                        nome: prop.nomeProduto4,
                        imagem: prop.imagem4,
                        descricao: prop.descricaoCompleta4,
                        preco: prop.preco4
                    }}
                >

                    <CaixaDoProduto
                        imagem={prop.imagem4}
                        descricao={prop.descricao4}
                        nomeProduto={prop.nomeProduto4}
                        preco={prop.preco4}
                    />

                </Link>

                <Link to='/secaoProduto'
                
                    state={{ 
                        nome: prop.nomeProduto5,
                        imagem: prop.imagem5,
                        descricao: prop.descricaoCompleta5,
                        preco: prop.preco5
                    }}
                >
                    
                    <CaixaDoProduto
                        imagem={prop.imagem5}
                        descricao={prop.descricao5}
                        nomeProduto={prop.nomeProduto5}
                        preco={prop.preco5}
                    />

                </Link>

            </div>

        </section>

    )

}