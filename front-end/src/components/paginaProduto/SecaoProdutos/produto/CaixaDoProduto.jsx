import { Link } from "react-router-dom";

// Importa o CSS de estilização da caixa do produto
import "./estiloCaixaProduto.css";

export function CaixaDoProduto(prop) {

    return (
        <div className="caixaProduto">
            
            {/* Imagem do produto */}
            <img src={prop.imagem} alt='produto' />
            
            {/* Informações do produto */}
            <div className='produto'>

                {/* Nome do produto */}
                <h3>{prop.nomeProduto}</h3>

                {/* Descrição curta do produto */}
                <span id='descricao'>{prop.descricao}</span>

                {/* Preço do produto */}
                <span className='preco'>R$ {prop.preco}</span>

                {/* Botão de compra com Link para a página de compra */}
                <button>
                    <Link 
                        to='/comprar'
                        state={{ 
                            nome: prop.nomeProduto,
                            imagem: prop.imagem,
                            preco: prop.preco
                        }}
                    >
                        Comprar
                    </Link>
                </button>

            </div>
        </div>
    );
}