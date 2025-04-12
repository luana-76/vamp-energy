boleto-node
=============

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
![Test - Passing](https://img.shields.io/badge/test-passing-brightgreen.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Geração de boleto bancário em Node.js. Os algoritmos de geração da linha digitável e do código de barras foram inspirados no [boletophp](https://github.com/BielSystems/boletophp).

## Bancos suportados

- Santander - by [pedrofranceschi](https://github.com/pedrofranceschi) - homologado
- Bradesco - by [pedrofranceschi](https://github.com/pedrofranceschi)

## Instalação

```
npm install boleto-node
```

## Exemplo de uso

Emitindo um boleto:

```javascript
var Boleto = require('boleto-node').Boleto;

var boleto = new Boleto({
	'banco': 'bradesco', // nome do banco dentro da pasta 'banks'
	'data_emissao': new Date(),
   'data_vencimento': new Date(new Date().getTime() + 5 * 24 * 3600 * 1000), // 5 dias futuramente
	'valor': 8990, // R$ 15,00 (valor em centavos)
	'nosso_numero': "1234567",
	'numero_documento': "123123",
	'instrucoes': "Não receber após vencimento. \n Multa de 2% após o vencimento. Juros de 0,03% de mora ao dia.", // separar cada linha por \n
	'pagador': "TESTE DA SILVA",
	'pagador_cpf_cnpj': '288.664.364-53',
	'pagador_endereco_rua_num': 'RUA SÃO CARLOS AUGUSTINO DA SILVA, 50',
	'pagador_endereco_bairro': 'SÃO JOÃO BATISTA DA SILVA',
	'pagador_endereco_cep': '15.160-100',
	'pagador_endereco_cidade_estado': 'SÃO JOSÉ DOS TESTES - SP',
	'pagador_outras_informacoes': 'Login da central: testeteste',
	'cedente': "PAGAMENTOS LTDA",
	'cedente_cnpj': "47322759000154", // sem pontos e traços
	'cedente_endereco_rua_num': "RUA CEL. JONAS DOS SANTOS, 130",
	'cedente_endereco_bairro': 'CENTRO',
	'cedente_endereco_cep': '15.115-100',
	'cedente_endereco_cidade_estado': 'SÃO JOSÉ DOS TESTES - SP',
	'agencia': "6119",
	'codigo_cedente':"001.584-2",
	'carteira': "09"
});

boleto.renderHTML('boleto', true, function(html){ // layout do boleto: boleto ou carne
  console.log(html);
});
```

Renderizando multiplos carnês:

```javascript
var Boleto = require('boleto-node').Boleto
,	 response = '';

for(var i = 0; i < 3; i++){
	var boleto = new Boleto({
		'banco': 'bradesco', // nome do banco dentro da pasta 'banks'
		'data_emissao': new Date(),
	   'data_vencimento': new Date(new Date().getTime() + 5 * 24 * 3600 * 1000), // 5 dias futuramente
		'valor': 8990, // R$ 15,00 (valor em centavos)
		'nosso_numero': "1234567",
		'numero_documento': "123123",
		'instrucoes': "Não receber após vencimento. \n Multa de 2% após o vencimento. Juros de 0,03% de mora ao dia.", // separar cada linha por \n
		'pagador': "TESTE DA SILVA",
		'pagador_cpf_cnpj': '288.664.364-53',
		'pagador_endereco_rua_num': 'RUA SÃO CARLOS AUGUSTINO DA SILVA, 50',
		'pagador_endereco_bairro': 'SÃO JOÃO BATISTA DA SILVA',
		'pagador_endereco_cep': '15.160-100',
		'pagador_endereco_cidade_estado': 'SÃO JOSÉ DOS TESTES - SP',
		'pagador_outras_informacoes': 'Login da central: testeteste',
		'cedente': "PAGAMENTOS LTDA",
		'cedente_cnpj': "47322759000154", // sem pontos e traços
		'cedente_endereco_rua_num': "RUA CEL. JONAS DOS SANTOS, 130",
		'cedente_endereco_bairro': 'CENTRO',
		'cedente_endereco_cep': '15.115-100',
		'cedente_endereco_cidade_estado': 'SÃO JOSÉ DOS TESTES - SP',
		'agencia': "6119",
		'codigo_cedente':"001.584-2",
		'carteira': "09"
	});

	var render_headers = (i == 0) ? true : false;

	boleto.renderHTML('boleto', render_headers, function(html){ // layout do boleto: boleto ou carne | render_headers: define se as instruções de impressão ou css serão renderizadas.
	  response  = response + html;
	});
}

res.send(response);
```


Parseando o arquivo-retorno EDI do banco:

```javascript
var ediParser = require('boleto-node').EdiParser,
	fs = require('fs');

var ediFileContent = fs.readFileSync("arquivo.txt").toString();

var parsedFile = ediParser.parse("santander", ediFileContent);

console.log("Boletos pagos: ");
console.log(parsedFile.boletos);
```

## Adicionando novos bancos

## Renderização do código de barras

### Renderização antiga

Havia duas maneiras de renderizar o código de barras: `img` e `bmp`.

A engine `img` utiliza imagens brancas e pretas intercaladas para gerar o código de barras. Dessa forma, todos os browsers desde o IE6 são suportados. Esse modo de renderização, porém, é um pouco mais pesado, já que muitas `divs` são inseridas no HTML para a renderização.

A engine `bmp` aproveita da característica monodimensional dos códigos de barra e gera apenas a primeira linha de pixels do boleto, repetindo as outras linhas por CSS. É mais leve e funciona na maioria dos browser - IE apenas a partir da versão 8.

Para alterar a engine de renderização padrão:

```javascript
Boleto.barcodeRenderEngine = 'bmp';
```

### Renderização atual - Em desenvolvimento
Infelizmente alguns browsers não estavam renderizando os códigos de barras de forma correta na hora de imprimir, então a renderização do código de barras foi alterado para que ao
invés de criar várias imagens das barras, criasse várias divs com o background branco ou preto, assim o problema de renderização no google chrome foi resolvido.

## Licença

(The MIT License)

Copyright (c) 2013-2017 Pagar.me Pagamentos S/A

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
