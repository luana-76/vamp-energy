import './informacoes.css';

import Logo from '../../assets/l.png';
import Tradicional from '../../assets/tradicionalInfo.png';
import Limao from '../../assets/limaoInfo.png';
import Misterioso from '../../assets/misteriosoInfo.png';

export function PagInformacoes(){

    return(

        <main id='mainInformacoes'>

            <section className='secaoTitulo'>

                <img src={Logo} alt='logo'/>
                <h1>DANDO ENERGIA A QUEM VIVE <span style={{color:'#E1660C'}}>INTENSAMENTE.</span></h1>

            </section>

            <section className='secoesTexto historia'>

                <h2>NOSSA HISTÓRIA</h2>
                <div>

                    <h3>Fundação: 2025</h3>
                    <p>Em busca de uma alternativa saudável e<br/>
                     eficaz para aumentar a energia e
                     <br/> a concentração.</p>

                </div>

                <div>

                    <h3>Lançamento: Inverno de 2024</h3>
                    <p>Após meses de pesquisa e<br/> testes, nasceu a VAMP ENERGY DRINKS.</p>

                </div>

            </section>

            <section className='secoesTexto'>

                <h2>PRESENÇA GLOBAL</h2>
                <h4>Países Atendidos: 10</h4>
                <h4>Latas Vendidas (1º Trim. 2024): 50 milhões</h4>

            </section>

            <section className='secoesTexto'>

                <h2>SUSTENTABILIDADE</h2>
                <p>Na VAMP, nos preocupamos com o planeta.<br/>
                Nossas embalagens são 100% recicláveis<br/>
                e utilizamos energia renovável em nossa produção.</p>

            </section>

            <div id='blocoTexto'>

                <section className='secoesTexto'>

                    <h2>NOSSA MISSÃO</h2>
                    <p>Proporcionar o máximo de energia com o<br/>
                    mínimo de impacto, sempre com sabor e inovação.</p>

                </section>

                <section className='secoesTexto'>

                    <h2>FALE CONOSCO</h2>
                    <p>Quer saber mais? Envie um e-mail para:<br/>
                    <a href=''>contato@vampdrinks.com</a></p>

                </section>

            </div>

            <section id='produtoInfo'>

                <div>

                    <h3>Bebidas</h3>
                    <a href=''>Ver todos os produtos</a>

                </div>

                <div id='produtosCaixasInfo'>

                    <div>

                        <div className='caixaLata'>

                            <h2>Vamp<br/>Tradicional</h2>
                            <img src={Tradicional} alt=''/>

                        </div>

                    </div>

                    <div id='produtoLimao'>

                        <div className='caixaLata'>

                            <h2>Vamp<br/>Limão</h2>
                            <img src={Limao} alt=''/>

                        </div>

                    </div>

                    <div style={{margin: "30px 0"}}>

                        <div className='caixaLata'>

                            <h2>Vamp<br/>Mistérioso</h2>
                            <img src={Misterioso} alt=''/>

                        </div>

                    </div>

                </div>

            </section>

        </main>

    )

}