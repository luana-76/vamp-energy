import Fundo1 from "../../assets/produto/fundoProduto.jpeg";
import Fundo2 from "../../assets/produto/energetico3.jpeg";
import Fundo3 from "../../assets/produto/barra1.webp";
import Fundo4 from "../../assets/produto/barra2.webp";

import Barras from "../../assets/produto/barraCereal.webp";
import Barras1 from "../../assets/produto/barra6.webp";
import Barras2 from "../../assets/produto/barra2.webp";
import Barras3 from "../../assets/produto/barra3.webp";
import Barras4 from "../../assets/produto/barra4.webp";
import Barras5 from "../../assets/produto/barra5.webp";

//Seçao 1 imagens
import Imagem from '../../assets/produto/barra1.webp';
import NeonBebida from '../../assets/produto/neonBebida.webp';
import SacoBebida from '../../assets/produto/sacoBebida.webp';

//Gym

import ListGym from '../../assets/produto/teste7.webp';
import isotonico from '../../assets/produto/isotonico.webp';
import whey from '../../assets/produto/whey.webp';
import pirula from '../../assets/produto/pirula.webp';
import Creatina from '../../assets/produto/teste0.webp';
import EnergeticoPo from '../../assets/produto/teste6.webp';

//Seção dois

import "./style.css";
import { ContainerDeProduto } from "./SecaoProdutos/ContainerDeProduto";

export function MainProduto(){

    return(

        <main id='mainProduto'>

            <div className='carousel'>

                <div className="wrap">

                    <img src={Fundo1} alt=''/>
                    <img src={Fundo2} alt=''/>
                    <img src={Fundo3} alt=''/>
                    <img src={Fundo4} alt=''/>

                    <img src={Fundo1} alt="..."/>
                    <img src={Fundo2} alt="..."/>
                    <img src={Fundo3} alt="..."/>
                    <img src={Fundo4} alt="..."/>

                </div>

            </div>

            <ContainerDeProduto
            
            nomeSecao='Bebidas'
            imagem1={Imagem} nomeProduto1='Bebida Vamp' preco1='7.0'
            imagem2={NeonBebida} nomeProduto2='Bebida Vamp' preco2='7.0'
            imagem3={SacoBebida} descricao3='Bebida energetica sabor...' nomeProduto3='Blood Pack' preco3='7.0'
            imagem4={Imagem} nomeProduto4='Bebida Vamp' preco4='7.0'
            imagem5={Imagem} nomeProduto5='Bebida Vamp' preco5='7.0'
            
            />

            <section className="imagem">

                <img src={Barras} alt=''/>
                <img src={Barras1} alt=''/>
                <img src={Barras2} alt=''/>
                <img src={Barras3} alt=''/>

            </section>

            <ContainerDeProduto
            
            nomeSecao='Barras de Cereal'
            imagem1={Barras1} descricao1='Barra de cereal composta...' nomeProduto1='Dark Chocolate' preco1='3,0'
            decricaoCompleta1='Barra de cereal composta por chocolate amargo, a Dark Chocolate é a escolha perfeita para quem busca sabor intenso com uma pegada saudável. Rica em fibras e com baixo teor de açúcar, ela combina a cremosidade do chocolate 70% cacau com a crocância dos cereais integrais. Ideal para matar a fome entre as refeições ou acompanhar seu pré-treino com muito mais prazer e energia. Sem adição de conservantes e com ingredientes selecionados, é a dose certa de sabor e nutrição no seu dia a dia.'

            imagem2={Barras2} descricao2='Barra de cereal Tradicional...' nomeProduto2='Tradicional' preco2='3,0'
            decricaoCompleta2='Barra de cereal Tradicional, feita com uma combinação equilibrada de cereais integrais, mel e frutas secas, é perfeita para quem gosta do sabor clássico e nutritivo no dia a dia. Com textura crocante e levemente adocicada, essa barra oferece energia de forma prática e saudável, sendo ideal para lanches rápidos, café da manhã ou aquele reforço no meio da tarde. Fonte de fibras e sem adição de corantes artificiais, ela é uma opção simples, gostosa e que cabe em qualquer rotina.'

            imagem3={Barras3} descricao3='Barra de cereal sabor caramelo...' nomeProduto3='Caramelo' preco3='3,0'
            decricaoCompleta3='Barra de cereal sabor caramelo, feita com uma deliciosa camada de caramelo suave que envolve cereais crocantes e ingredientes selecionados. Essa combinação irresistível traz o equilíbrio entre o doce na medida certa e a energia que você precisa ao longo do dia. Ideal para matar a vontade de um doce sem sair da linha, é perfeita para lanches rápidos, pré-treino ou aquele momento de pausa com mais sabor. Fonte de fibras e sem corantes artificiais, é uma escolha prática e saborosa para sua rotina.'
            imagem4={Barras4} descricao4='Barra de cereal sabor mel...' nomeProduto4='Mel' preco4='3,0'
            decricaoCompleta4='Barra de cereal sabor mel, uma combinação leve e nutritiva que une cereais crocantes ao toque natural e adocicado do mel. Perfeita para quem busca energia de forma saudável, essa barra é ideal para o café da manhã, lanches entre refeições ou para dar aquele up no dia. Sem conservantes artificiais e rica em fibras, oferece sabor suave e textura equilibrada, sendo uma opção prática e deliciosa para qualquer momento da sua rotina.'

            imagem5={Barras5} descricao5='Barra de cereal sabor frutas vermelho...' nomeProduto5='Amora' preco5='3,0'
            decricaoCompleta5='Barra de cereal sabor frutas vermelhas, feita com uma combinação deliciosa de cereais integrais e pedaços selecionados de morango, framboesa e amora. Com sabor levemente ácido e refrescante, é a escolha ideal para quem gosta de um lanche equilibrado, com um toque frutado irresistível. Rica em fibras e sem conservantes artificiais, essa barra é perfeita para o dia a dia, trazendo energia e sabor natural a cada mordida.'
            
            />

            <section className="imagem">

                <img src={ListGym} alt='Academia'/>
                <img src={whey} alt='Whey protein'/>
                <img src={isotonico} alt='Isotônico'/>
                <img src={Creatina} alt='Creatina'/>

            </section>

            <ContainerDeProduto

            nomeSecao='GYM'
            imagem1={pirula} descricao1='Com uma fórmula poderosa conte...' nomeProduto1='BCAA' preco1='30,0'
            decricaoCompleta1='Com uma fórmula poderosa, contendo aminoácidos de cadeia ramificada (leucina, isoleucina e valina), o BCAA é ideal para quem busca melhorar a recuperação muscular, reduzir a fadiga e potencializar os resultados dos treinos. Essencial na construção e preservação da massa magra, ele atua diretamente no metabolismo muscular, fornecendo energia durante exercícios intensos. Seja no pré ou pós-treino, o BCAA é o aliado certo para aumentar sua performance e acelerar sua evolução.'

            imagem2={whey} descricao2='O Whey Protein é a proteína de alto...' nomeProduto2='Whey Protein' preco2='70,0' decricaoCompleta2='O Whey Protein é a proteína de alto valor biológico, extraída do soro do leite, ideal para quem busca ganho de massa muscular, recuperação rápida e nutrição eficiente. Rico em aminoácidos essenciais e de rápida absorção, ele fornece os nutrientes necessários para a reconstrução muscular após treinos intensos. Seja para atletas ou iniciantes, o Whey é um suplemento versátil que contribui para uma dieta equilibrada e resultados consistentes na academia.'

            imagem3={isotonico} descricao3='A bebida que repõe sais minerais...' nomeProduto3='Isotônico' preco3='50,0' decricaoCompleta3='A bebida que repõe sais minerais de forma rápida e eficaz, ideal para manter o corpo hidratado durante e após atividades físicas intensas. Enriquecida com eletrólitos essenciais como sódio, potássio e magnésio, ela ajuda a prevenir cãibras, combater a fadiga e equilibrar os níveis de hidratação do organismo. Refrescante e com sabor leve, é perfeita para quem leva uma rotina ativa e não abre mão de desempenho e bem-estar.'

            imagem4={Creatina} descricao4='Se o seu objetivo é explosão, força...' nomeProduto4='Creatina' preco4='57,0' decricaoCompleta4='Se o seu objetivo é explosão, força e desempenho máximo nos treinos, a creatina é o suplemento ideal. Reconhecida por aumentar a potência muscular e melhorar a performance em exercícios de alta intensidade, ela atua diretamente nas reservas de energia dos músculos, proporcionando ganhos reais de força e resistência. Com uso contínuo, auxilia na construção de massa magra e na recuperação muscular, sendo indispensável para quem leva os treinos a sério.'

            imagem5={EnergeticoPo} descricao5='O Pó Energético é a dose rápida...' nomeProduto5='Pó Energetico' preco5='20.0' decricaoCompleta5='O Pó Energético é a dose rápida de energia e foco que você precisa para dar aquele impulso durante os treinos ou para enfrentar os desafios do dia a dia. Formulado com cafeína, taurina e vitaminas essenciais, ele proporciona um aumento imediato de disposição, melhorando o desempenho físico e mental. Ideal para quem busca mais concentração, resistência e energia de forma prática, basta misturar em água e sentir a diferença.'
            />

        </main>

    );
    
}