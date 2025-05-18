import './informacoes.css';
import './responsivoInformacoes.css';

import Logo from '../../assets/l.png';
import Tradicional from '../../assets/tradicionalInfo.png';
import Limao from '../../assets/limaoInfo.png';
import Misterioso from '../../assets/misteriosoInfo.png';

import { useEffect } from 'react';
import { Link } from "react-router-dom";

export function PagInformacoes(){

    useEffect(() => {

        const observer = new IntersectionObserver(

            (entries) => {
                
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    }
                });

            },
            { threshold: 0.1 }
        );

        const sections = document.querySelectorAll('.secaoAnimada');
        sections.forEach(section => {
            observer.observe(section);
        });

        return () => {
            sections.forEach(section => {
            observer.unobserve(section);
            });
        };
    }, []);

    return(

        <main id='mainInformacoes'>

            <section className='secaoTitulo secaoAnimada'>

                <img src={Logo} alt='logo'/>
                <h1>DANDO ENERGIA A QUEM VIVE <span style={{color:'#E1660C'}}>INTENSAMENTE.</span></h1>

            </section>

            <section className='secoesTexto historia secaoAnimada'>

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

            <section className='secoesTexto secaoAnimada'>

                <h2>PRESENÇA GLOBAL</h2>
                <h4>Países Atendidos: 10</h4>
                <h4>Latas Vendidas (1º Trim. 2024): 50 milhões</h4>

            </section>

            <section className='secoesTexto secaoAnimada'>

                <h2>SUSTENTABILIDADE</h2>
                <p>Na VAMP, nos preocupamos com o planeta.<br/>
                Nossas embalagens são 100% recicláveis<br/>
                e utilizamos energia renovável em nossa produção.</p>

            </section>

            <div id='blocoTexto' className='secaoAnimada'>

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

                <div id='titulosBebidasInfo'>

                    <h3>Bebidas</h3>
                    <Link to='/produtos'>Ver todos os produtos</Link>

                </div>

                <div id='produtosCaixasInfo'>

                    <div>

                        <div className='caixaLata'>

                            <h2>Vamp<br/>Tradicional</h2>
                            <img src={Tradicional} alt='vamp tradicional'/>

                        </div>

                    </div>

                    <div id='produtoLimao'>

                        <div className='caixaLata'>

                            <h2>Vamp<br/>Limão</h2>
                            <img src={Limao} alt='vamp limão'/>

                        </div>

                    </div>

                    <div style={{margin: "30px 0"}}>

                        <div className='caixaLata'>

                            <h2>Vamp<br/>Mistérioso</h2>
                            <img src={Misterioso} alt='vamp mistérioso'/>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    )
}