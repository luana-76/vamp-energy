import "./style.css";
import { useEffect } from 'react';
import { ContainerDeProduto } from "./SecaoProdutos/ContainerDeProduto";

/* Imagens de rolação */
import Fundo1 from "../../assets/produto/conjuntoEnergetico.png";
import Fundo2 from "../../assets/produto/adolescentes.png";
import Fundo3 from "../../assets/produto/barrasProduto.png";
import Fundo4 from "../../assets/produto/gymConjunto.png";

/* Imagens das barras disponiveiis */
import Barras from "../../assets/produto/barraCereal.webp";
import Barras1 from "../../assets/produto/barra6.webp";
import Barras2 from "../../assets/produto/barra2.webp";
import Barras3 from "../../assets/produto/barra3.webp";
import Barras4 from "../../assets/produto/barra4.webp";
import Barras5 from "../../assets/produto/barra5.webp";

//Imagens dos energeticos disponiveis
import Tradicional from '../../assets/produto/tradicional.jpeg';
import Limao from '../../assets/produto/limao.jpeg';
import Uva from '../../assets/produto/uva.jpeg';
import Misterioso from '../../assets/produto/misterioso.jpeg';
import SacoBebida from '../../assets/produto/sacoBebida.webp';

//Imagens Gym disponiveis

import ListGym from '../../assets/produto/teste7.webp';
import isotonico from '../../assets/produto/isotonico.webp';
import whey from '../../assets/produto/whey.webp';
import pirula from '../../assets/produto/pirula.webp';
import Creatina from '../../assets/produto/teste0.webp';
import EnergeticoPo from '../../assets/produto/teste6.webp';

export function MainProduto(){

    /* Todas as vezes que a página for carregada, ela irá rolar para o inicio */
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return(

        <main id='mainProduto'>

            {/* Carrossel de imagens */}
            <div className='carrossel'>

                <div className="wrap">

                    {[Fundo1, Fundo2, Fundo3, Fundo4, Fundo1, Fundo2, Fundo3, Fundo4].map((img, index) => (
                        <img key={index} src={img} alt='imagens do carrossel' />
                    ))}

                </div>

            </div>

            {/* Elemento de renderização de produtos */}

            {/*Renderização dos energéticos */}
            <ContainerDeProduto
            
            nomeSecao='Bebidas'
            imagem1={Tradicional} nomeProduto1='Tradicional'
            descricao1='Clássico, potente e direto ao ponto...'
            preco1='7,0'
            descricaoCompleta1="Clássico, potente e direto ao ponto. O Vamp Tradicional entrega aquela explosão de energia que você precisa para encarar qualquer desafio. Com um sabor vibrante e fórmula equilibrada, ele é o combustível ideal pra quem vive intensamente – de dia ou de noite."

            imagem2={SacoBebida}
            descricao2='O Blood Pack vai direto na veia...'
            nomeProduto2='Blood Pack'
            preco2='13.0'
            descricaoCompleta2="O Blood Pack vai direto na veia do seu estilo: ousado, intenso e fora do comum. Esqueça latas — essa dose de energia vem em um saquinho que simula sangue, pra alimentar sua sede de adrenalina com visual impactante e atitude de sobra.
            Sabe aquele impulso que só os noturnos entendem? Tá aqui dentro.
            Rasgue, beba, sinta o poder subir."

            imagem3={Uva}
            nomeProduto3='Vamp Uva'
            preco3='7,0'
            descricao3='Sinta o poder da noite com...'
            descricaoCompleta3="Sinta o poder da noite com Vamp Uva, a bebida energética que une o sabor intenso da uva roxa com a energia que desperta seus sentidos. Com um gosto marcante e misterioso, Vamp te acompanha em jornadas noturnas, treinos extremos ou madrugadas criativas.
            É mais do que energia — é atitude na veia."

            imagem4={Limao}
            nomeProduto4='Vamp Limão'
            preco4='7,0'
            descricao4='Refrescante, ácido na medida...'
            descricaoCompleta4="Refrescante, ácido na medida e cheio de personalidade — o Vamp Limão traz a energia com um toque cítrico que desperta até os mortos. Perfeito pra quem curte um sabor ousado e uma dose de vigor que chega como um raio na sua rotina.
            Gelado então? Vira seu aliado fiel nas batalhas mais intensas do dia (ou da madrugada)."

            imagem5={Misterioso}
            nomeProduto5='Misterioso'
            preco5='7,0'
            descricao5='Você não vai saber o sabor. Só...'
            descricaoCompleta5="Você não vai saber o sabor. Só vai sentir.
            Um gole e algo dentro de você muda — é como se o tempo desacelerasse e tudo ao redor escurecesse, exceto sua mente.
            Refrescante? Talvez. Doce? Quem sabe. O que importa é o impacto: intenso, inesperado, inesquecível.
            Vamp Eclipse não é sobre gosto. É sobre a experiência de provar o desconhecido."
            
            />

            {/*Renderização dos conjuntos das Barras*/}
            <section className="imagem">

                <img src={Barras} alt=''/>
                <img src={Barras1} alt=''/>
                <img src={Barras2} alt=''/>
                <img src={Barras3} alt=''/>

            </section>

            {/*Renderização das barras*/}
            <ContainerDeProduto
            
            nomeSecao='Barras de Cereal'
            imagem1={Barras1}
            descricao1='Barra de cereal composta...'
            nomeProduto1='Dark Chocolate'
            preco1='3,0'
            descricaoCompleta1='Barra de cereal composta por chocolate amargo, a Dark Chocolate é a escolha perfeita para quem busca sabor intenso com uma pegada saudável. Rica em fibras e com baixo teor de açúcar, ela combina a cremosidade do chocolate 70% cacau com a crocância dos cereais integrais. Ideal para matar a fome entre as refeições ou acompanhar seu pré-treino com muito mais prazer e energia. Sem adição de conservantes e com ingredientes selecionados, é a dose certa de sabor e nutrição no seu dia a dia.'

            imagem2={Barras2}
            descricao2='Barra de cereal Tradicional...'
            nomeProduto2='Tradicional'
            preco2='3,0'
            descricaoCompleta2='Barra de cereal Tradicional, feita com uma combinação equilibrada de cereais integrais, mel e frutas secas, é perfeita para quem gosta do sabor clássico e nutritivo no dia a dia. Com textura crocante e levemente adocicada, essa barra oferece energia de forma prática e saudável, sendo ideal para lanches rápidos, café da manhã ou aquele reforço no meio da tarde. Fonte de fibras e sem adição de corantes artificiais, ela é uma opção simples, gostosa e que cabe em qualquer rotina.'

            imagem3={Barras3}
            descricao3='Barra de cereal sabor caramelo...'
            nomeProduto3='Caramelo'
            preco3='3,0'
            descricaoCompleta3='Barra de cereal sabor caramelo, feita com uma deliciosa camada de caramelo suave que envolve cereais crocantes e ingredientes selecionados. Essa combinação irresistível traz o equilíbrio entre o doce na medida certa e a energia que você precisa ao longo do dia. Ideal para matar a vontade de um doce sem sair da linha, é perfeita para lanches rápidos, pré-treino ou aquele momento de pausa com mais sabor. Fonte de fibras e sem corantes artificiais, é uma escolha prática e saborosa para sua rotina.'

            imagem4={Barras4}
            descricao4='Barra de cereal sabor mel...'
            nomeProduto4='Mel'
            preco4='3,0'
            descricaoCompleta4='Barra de cereal sabor mel, uma combinação leve e nutritiva que une cereais crocantes ao toque natural e adocicado do mel. Perfeita para quem busca energia de forma saudável, essa barra é ideal para o café da manhã, lanches entre refeições ou para dar aquele up no dia. Sem conservantes artificiais e rica em fibras, oferece sabor suave e textura equilibrada, sendo uma opção prática e deliciosa para qualquer momento da sua rotina.'

            imagem5={Barras5}
            descricao5='Barra de cereal sabor frutas vermelho...'
            nomeProduto5='Amora'
            preco5='3,0'
            descricaoCompleta5='Barra de cereal sabor frutas vermelhas, feita com uma combinação deliciosa de cereais integrais e pedaços selecionados de morango, framboesa e amora. Com sabor levemente ácido e refrescante, é a escolha ideal para quem gosta de um lanche equilibrado, com um toque frutado irresistível. Rica em fibras e sem conservantes artificiais, essa barra é perfeita para o dia a dia, trazendo energia e sabor natural a cada mordida.'
            
            />

            {/*Renderização dos conjuntos do gym*/}
            <section className="imagem">

                <img src={ListGym} alt='Academia'/>
                <img src={whey} alt='Whey protein'/>
                <img src={isotonico} alt='Isotônico'/>
                <img src={Creatina} alt='Creatina'/>

            </section>

            {/*Renderização dos Gym */}
            <ContainerDeProduto

            nomeSecao='GYM'
            imagem1={pirula}
            descricao1='Com uma fórmula poderosa conte...'
            nomeProduto1='BCAA'
            preco1='30,0'
            descricaoCompleta1='Com uma fórmula poderosa, contendo aminoácidos de cadeia ramificada (leucina, isoleucina e valina), o BCAA é ideal para quem busca melhorar a recuperação muscular, reduzir a fadiga e potencializar os resultados dos treinos. Essencial na construção e preservação da massa magra, ele atua diretamente no metabolismo muscular, fornecendo energia durante exercícios intensos. Seja no pré ou pós-treino, o BCAA é o aliado certo para aumentar sua performance e acelerar sua evolução.'

            imagem2={whey}
            descricao2='O Whey Protein é a proteína de alto...'
            nomeProduto2='Whey Protein'
            preco2='70,0'
            descricaoCompleta2='O Whey Protein é a proteína de alto valor biológico, extraída do soro do leite, ideal para quem busca ganho de massa muscular, recuperação rápida e nutrição eficiente. Rico em aminoácidos essenciais e de rápida absorção, ele fornece os nutrientes necessários para a reconstrução muscular após treinos intensos. Seja para atletas ou iniciantes, o Whey é um suplemento versátil que contribui para uma dieta equilibrada e resultados consistentes na academia.'

            imagem3={isotonico}
            descricao3='A bebida que repõe sais minerais...'
            nomeProduto3='Isotônico'
            preco3='50,0'
            descricaoCompleta3='A bebida que repõe sais minerais de forma rápida e eficaz, ideal para manter o corpo hidratado durante e após atividades físicas intensas. Enriquecida com eletrólitos essenciais como sódio, potássio e magnésio, ela ajuda a prevenir cãibras, combater a fadiga e equilibrar os níveis de hidratação do organismo. Refrescante e com sabor leve, é perfeita para quem leva uma rotina ativa e não abre mão de desempenho e bem-estar.'

            imagem4={Creatina}
            descricao4='Se o seu objetivo é explosão, força...'
            nomeProduto4='Creatina'
            preco4='57,0'
            descricaoCompleta4='Se o seu objetivo é explosão, força e desempenho máximo nos treinos, a creatina é o suplemento ideal. Reconhecida por aumentar a potência muscular e melhorar a performance em exercícios de alta intensidade, ela atua diretamente nas reservas de energia dos músculos, proporcionando ganhos reais de força e resistência. Com uso contínuo, auxilia na construção de massa magra e na recuperação muscular, sendo indispensável para quem leva os treinos a sério.'

            imagem5={EnergeticoPo}
            descricao5='O Pó Energético é a dose rápida...'
            nomeProduto5='Pó Energetico'
            preco5='20.0'
            descricaoCompleta5='O Pó Energético é a dose rápida de energia e foco que você precisa para dar aquele impulso durante os treinos ou para enfrentar os desafios do dia a dia. Formulado com cafeína, taurina e vitaminas essenciais, ele proporciona um aumento imediato de disposição, melhorando o desempenho físico e mental. Ideal para quem busca mais concentração, resistência e energia de forma prática, basta misturar em água e sentir a diferença.'
            />

        </main>

    );
    
}