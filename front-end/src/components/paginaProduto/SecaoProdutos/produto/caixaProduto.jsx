import { Link } from "react-router-dom";
import "./caixaProduto.css";

export function CaixaProduto(prop){

    return(
 
        <div className="caixaProduto">
        
            <img src={prop.imagem} alt='produto'/>
        
            <div className='produto'>
        
                <h3>{prop.nomeProduto}</h3>
                <span id='descricao'>{prop.descricao}</span>
                <span className='preco'>R$ {prop.preco}</span>
        
                <button>
                    <Link to='/comprar'
                        state={{ 
                            nome: prop.nomeProduto,
                            imagem: prop.imagem,
                            preco: prop.preco
                        }}>
                            Comprar
                    </Link>
                </button>
        
            </div>
        </div>

    )


}