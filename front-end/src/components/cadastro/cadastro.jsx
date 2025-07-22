import './cadastroStyle.css';
import './responsiveCadastro.css';

import videoFundo from '../../assets/login.mp4';
import { Form } from './caixaForm/Form.jsx';

export function Cadastro() {

    return (
        <main id="mainLogin" className="mainCadastro">

            <video id='fundoVideo' autoPlay loop muted>
                <source src={videoFundo} type="video/mp4"/>
                Seu navegador não suporta a tag de vídeo.
            </video>  

            <Form/>
            
        </main>
    );
}
