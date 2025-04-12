const Boleto = require('node-boleto').Boleto;
const fs = require('fs');

// Criação do boleto
const boleto = new Boleto({
  'banco': 'bradesco',
  'data_emissao': new Date(),
  'data_vencimento': new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000)), // 5 dias depois
  'valor': 1500, // valor em centavos = R$15,00
  'nosso_numero': '1234567',
  'numero_documento': '1234',
  'cedente': 'Vamp Energy Ltda.',
  'cedente_cnpj': '123.456.789-00',
  'agencia': '1234',
  'codigo_cedente': '56789',
  'carteira': '09',
  'pagador': 'Cliente Qualquer\nRua Qualquer, 123\nBairro\nCidade - Estado - CEP: 00000-000'
});

boleto.renderHTML((html) => {
  const PDFDocument = require('pdfkit');
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  const stream = fs.createWriteStream('boleto.pdf');

  doc.pipe(stream);
  doc.text(html, {
    width: 500,
    align: 'left'
  });

  doc.end();

  stream.on('finish', () => {
    console.log('PDF gerado com sucesso: boleto.pdf');
  });
});
