// Importa o CSS principal da página de produtos
import "./mainProduto.css";

// Importa o componente que renderiza os produtos
import { ContainerDeProduto } from "./SecaoProdutos/ContainerDeProduto";

// Importa hook para executar ações no ciclo de vida do componente
import { useEffect } from 'react';

/* ------------------------------
   Imagens usadas no carrossel
--------------------------------- */
import Fundo1 from "../../assets/produto/conjuntoEnergetico.png";
import Fundo2 from "../../assets/produto/adolescentes.png";
import Fundo3 from "../../assets/produto/barrasProduto.png";
import Fundo4 from "../../assets/produto/gymConjunto.png";

/* ------------------------------
   Imagens das Barras de Cereal
--------------------------------- */
import Barras from "../../assets/produto/barraCereal.webp";
import Barras1 from "../../assets/produto/barra6.webp";
import Barras2 from "../../assets/produto/barra2.webp";
import Barras3 from "../../assets/produto/barra3.webp";
import Barras4 from "../../assets/produto/barra4.webp";
import Barras5 from "../../assets/produto/barra5.webp";

/* ------------------------------
   Imagens das Bebidas Energéticas
--------------------------------- */
import Tradicional from '../../assets/produto/tradicional.jpeg';
import Limao from '../../assets/produto/limao.jpeg';
import Uva from '../../assets/produto/uva.jpeg';
import Misterioso from '../../assets/produto/misterioso.jpeg';
import SacoBebida from '../../assets/produto/sacoBebida.webp';

/* ------------------------------
   Imagens da seção GYM
--------------------------------- */
import ListGym from '../../assets/produto/teste7.webp';
import isotonico from '../../assets/produto/isotonico.webp';
import whey from '../../assets/produto/whey.webp';
import pirula from '../../assets/produto/pirula.webp';
import Creatina from '../../assets/produto/teste0.webp';
import EnergeticoPo from '../../assets/produto/teste6.webp';

export function MainProduto() {

    // Ao carregar a página, rola automaticamente para o topo com animação suave
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <main id='mainProduto'>

            {/* Carrossel de imagens (rolagem infinita) */}
            <div className='carrossel'>
                <div className="wrap">
                    {/* Mapeia as imagens do carrossel e renderiza cada uma */}
                    {[Fundo1, Fundo2, Fundo3, Fundo4, Fundo1, Fundo2, Fundo3, Fundo4].map((img, index) => (
                        <img key={index} src={img} alt='imagens do carrossel' />
                    ))}
                </div>
            </div>

            {/* Seção de Energéticos */}
            <ContainerDeProduto
                nomeSecao='Bebidas'
                imagem1={Tradicional} nomeProduto1='Tradicional'
                descricao1='Clássico, potente e direto ao ponto...'
                preco1='7.0'
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
                preco3='7.0'
                descricao3='Sinta o poder da noite com...'
                descricaoCompleta3="Sinta o poder da noite com Vamp Uva, a bebida energética que une o sabor intenso da uva roxa com a energia que desperta seus sentidos. Com um gosto marcante e misterioso, Vamp te acompanha em jornadas noturnas, treinos extremos ou madrugadas criativas.
                É mais do que energia — é atitude na veia."

                imagem4={Limao}
                nomeProduto4='Vamp Limão'
                preco4='7.0'
                descricao4='Refrescante, ácido na medida...'
                descricaoCompleta4="Refrescante, ácido na medida e cheio de personalidade — o Vamp Limão traz a energia com um toque cítrico que desperta até os mortos. Perfeito pra quem curte um sabor ousado e uma dose de vigor que chega como um raio na sua rotina.
                Gelado então? Vira seu aliado fiel nas batalhas mais intensas do dia (ou da madrugada)."

                imagem5={Misterioso}
                nomeProduto5='Misterioso'
                preco5='7.0'
                descricao5='Você não vai saber o sabor. Só...'
                descricaoCompleta5="Você não vai saber o sabor. Só vai sentir.
                Um gole e algo dentro de você muda — é como se o tempo desacelerasse e tudo ao redor escurecesse, exceto sua mente.
                Refrescante? Talvez. Doce? Quem sabe. O que importa é o impacto: intenso, inesperado, inesquecível.
                Vamp Eclipse não é sobre gosto. É sobre a experiência de provar o desconhecido."
            />

            {/* Mini galeria das barras */}
            <section className='separacaoSecao'>
                <img src={Barras} alt='Conjunto de barras de cereal'/>
                <img src={Barras1} alt='barra de cereal'/>
                <img src={Barras2} alt='barra de cereal'/>
                <img src={Barras3} alt='barra de cereal'/>
            </section>

            {/* Seção de Barras de Cereal */}
            <ContainerDeProduto
                nomeSecao='Barras de Cereal'
                imagem1={Barras1}
                descricao1='Barra de cereal composta...'
                nomeProduto1='Dark Chocolate'
                preco1='3.0'
                descricaoCompleta1='Barra de cereal composta por chocolate amargo...'

                imagem2={Barras2}
                descricao2='Barra de cereal Tradicional...'
                nomeProduto2='Tradicional'
                preco2='3.0'
                descricaoCompleta2='Barra de cereal Tradicional, feita com cereais integrais...'

                imagem3={Barras3}
                descricao3='Barra de cereal sabor caramelo...'
                nomeProduto3='Caramelo'
                preco3='3.0'
                descricaoCompleta3='Barra de cereal sabor caramelo, feita com cereais crocantes...'

                imagem4={Barras4}
                descricao4='Barra de cereal sabor mel...'
                nomeProduto4='Mel'
                preco4='3.0'
                descricaoCompleta4='Barra de cereal sabor mel, feita com cereais crocantes...'

                imagem5={Barras5}
                descricao5='Barra de cereal sabor frutas vermelho...'
                nomeProduto5='Amora'
                preco5='3.0'
                descricaoCompleta5='Barra de cereal sabor frutas vermelhas, feita com pedaços de morango...'
            />

            {/* Mini galeria da seção GYM */}
            <section className='separacaoSecao'>
                <img src={ListGym} alt='Academia' />
                <img src={whey} alt='Whey protein' />
                <img src={isotonico} alt='Isotônico' />
                <img src={Creatina} alt='Creatina' />
            </section>

            {/* Seção GYM */}
            <ContainerDeProduto
                nomeSecao='GYM'
                imagem1={pirula}
                descricao1='Com uma fórmula poderosa conte...'
                nomeProduto1='BCAA'
                preco1='30.0'
                descricaoCompleta1='Com uma fórmula poderosa, contendo aminoácidos...'

                imagem2={whey}
                descricao2='O Whey Protein é a proteína de alto...'
                nomeProduto2='Whey Protein'
                preco2='70.0'
                descricaoCompleta2='O Whey Protein é a proteína de alto valor biológico...'

                imagem3={isotonico}
                descricao3='A bebida que repõe sais minerais...'
                nomeProduto3='Isotônico'
                preco3='50.0'
                descricaoCompleta3='A bebida que repõe sais minerais de forma rápida...'

                imagem4={Creatina}
                descricao4='Se o seu objetivo é explosão, força...'
                nomeProduto4='Creatina'
                preco4='57.0'
                descricaoCompleta4='Se o seu objetivo é explosão, força e desempenho máximo...'

                imagem5={EnergeticoPo}
                descricao5='O Pó Energético é a dose rápida...'
                nomeProduto5='Pó Energetico'
                preco5='20.0'
                descricaoCompleta5='O Pó Energético é a dose rápida de energia e foco...'
            />
        </main>
    );
}
