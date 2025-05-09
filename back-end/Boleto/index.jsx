const express = require('express');
const cors = require('cors');
const { Boleto } = require('node-boleto');
const PDFDocument = require('pdfkit');
const stream = require('stream');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/gerar-boleto', (req, res) => {
  const boleto = new Boleto({
    banco: 'bradesco',
    data_emissao: new Date(),
    data_vencimento: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    valor: 1500,
    nosso_numero: '1234567',
    numero_documento: '1234',
    cedente: 'Vamp Energy Ltda.',
    cedente_cnpj: '123.456.789-00',
    agencia: '1234',
    codigo_cedente: '56789',
    carteira: '09',
    pagador: 'Cliente Qualquer\nRua Qualquer, 123\nBairro\nCidade - Estado - CEP: 00000-000',
  });

  boleto.renderHTML((html) => {
    const doc = new PDFDocument({ size: 'A4' });
    const passthrough = new stream.PassThrough();
    res.setHeader('Content-Type', 'application/pdf');
    passthrough.pipe(res);
    doc.pipe(passthrough);
    doc.text(html, 50, 50);
    doc.end();
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
