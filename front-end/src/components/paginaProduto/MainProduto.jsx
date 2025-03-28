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
            imagem2={Barras2} descricao2='Barra de cereal Tradicional...' nomeProduto2='Tradicional' preco2='3,0'
            imagem3={Barras3} descricao3='Barra de cereal sabor caramelo...' nomeProduto3='Caramelo' preco3='3,0'
            imagem4={Barras4} descricao4='Barra de cereal sabor mel...' nomeProduto4='Mel' preco4='3,0'
            imagem5={Barras5} descricao5='Barra de cereal sabor frutas vermelho...' nomeProduto5='Amora' preco5='3,0'
            
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
            imagem2={whey} descricao2='O Whey Protein é a proteína de alto...' nomeProduto2='Whey Protein' preco2='70,0'
            imagem3={isotonico} descricao3='A bebida que repõe sais minerais...' nomeProduto3='Isotônico' preco3='50,0'
            imagem4={Creatina} descricao4='Se o seu objetivo é explosão, força...' nomeProduto4='Creatina' preco4='57,0'
            imagem5={EnergeticoPo} descricao5='O Pó Energético é a dose rápida...' nomeProduto5='Pó Energetico' preco5='20.0'
            />

        </main>

    );
    
}