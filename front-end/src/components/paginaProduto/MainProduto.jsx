import Fundo1 from "../../assets/produto/fundoProduto.jpeg";
import Fundo2 from "../../assets/produto/energetico3.jpeg";
import Fundo3 from "../../assets/produto/barra1.webp";
import Fundo4 from "../../assets/produto/barra2.webp";

import Barras from "../../assets/produto/barraCereal.webp";
import Barras1 from "../../assets/produto/barra1.webp";
import Barras2 from "../../assets/produto/barra2.webp";
import Barras3 from "../../assets/produto/barra3.webp";
import Barras4 from "../../assets/produto/barra4.webp";

//Seçao 1 imagens
import Imagem from '../../assets/produto/barra1.webp';
import NeonBebida from '../../assets/produto/neonBebida.webp';
import SacoBebida from '../../assets/produto/sacoBebida.webp';

//Gym

import isotonico from '../../assets/produto/isotonico.webp';
import whey from '../../assets/produto/whey.webp';
import pirula from '../../assets/produto/pirula.webp';

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
            imagem3={SacoBebida} nomeProduto3='Bebida Vamp' preco3='7.0'
            imagem4={Imagem} nomeProduto4='Bebida Vamp' preco4='7.0'
            
            />

            <section className="imagem">

                <img src={Barras} alt=''/>
                <img src={Barras1} alt=''/>
                <img src={Barras2} alt=''/>
                <img src={Barras3} alt=''/>

            </section>

            <ContainerDeProduto
            
            nomeSecao='Barras de Cereal'
            imagem1={Barras1} nomeProduto1='Bebida Vamp' preco1='7.0'
            imagem2={Barras2} nomeProduto2='Bebida Vamp' preco2='7.0'
            imagem3={Barras3} nomeProduto3='Bebida Vamp' preco3='7.0'
            imagem4={Barras4} nomeProduto4='Bebida Vamp' preco4='7.0'
            
            />

            <section className="imagem">

                <img src={Barras} alt=''/>
                <img src={Barras1} alt=''/>
                <img src={Barras2} alt=''/>
                <img src={Barras3} alt=''/>

            </section>

            <ContainerDeProduto

            nomeSecao='GYM'
            imagem1={pirula} nomeProduto1='BCAA' preco1='30,0'
            imagem2={whey} nomeProduto2='Whey' preco2='70,0'
            imagem3={isotonico} nomeProduto3='Isotonico' preco3='50,0'
            imagem4={Barras4} nomeProduto4='Bebida Vamp' preco4='7.0'

            />

        </main>

    );
    
}