import "./style.css";

export function CaixaProduto(prop){

    return(

        <div className="caixaProduto">
        
            <img src={prop.imagem} alt=''/>
        
            <div className='produto'>
        
                <h3>{prop.nomeProduto}</h3>
                <span id='descricao'>kslkkajsklaskkjslaksj<br/>
                    ksjdksjdkskdjskds</span>
                <span>R$ {prop.preco}</span>
        
                <button>Comprar</button>
        
            </div>
        </div>

    )


}