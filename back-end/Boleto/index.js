const express = require('express');
const cors = require('cors');
const { Boleto } = require('node-boleto');
const PDFDocument = require('pdfkit');
const stream = require('stream');

const app = express();
const port = 3001;

app.use(cors({
  origin: 'https://vamp-energy.onrender.com',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

const QRCode = require('qrcode');
const path = require('path');

app.use(express.json());


function gerarBoleto(dados, res) {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);

    // Cores
    const corLinha = '#000000';

    // === Cabeçalho ===
    doc.image(path.join(__dirname, 'logo.png'), 50, 50, { width: 100 });
    doc.fontSize(20).text('Boleto Bancário', 200, 50);
    doc.fontSize(10).text('Documento gerado por Vamp Energy', 200, 75);

    // === Dados do Cedente ===
    doc.moveDown().font('Courier-Bold').fontSize(12);
    doc.text(`Cedente: Vamp Energy S.A`);
    doc.text(`Agência/Código do Cedente: 1234 / 12345-6`);
    doc.text(`Nosso número: 000123456789-0`);
    doc.text(`Carteira: 09`);

    // === Linha para destacar ===
    doc.moveTo(50, 160).lineTo(550, 160).stroke(corLinha);

    // === Dados do Pagador ===
    doc.font('Courier').fontSize(11).text(`Pagador: ${dados.nome}`, 50, 180);
    doc.text(`Endereço: ${dados.endereco}`, 50, 195);

    // === Valores ===
    doc.font('Courier-Bold').fontSize(12);
    doc.text(`Valor do documento: R$ ${dados.valor.toFixed(2)}`, 50, 230);
    doc.text(`Vencimento: ${new Date(dados.data_vencimento).toLocaleDateString('pt-BR')}`, 50, 250);

    // === QRCode do PIX ===
    const chavePix = 'chavepix@vampenergy.com';
    const payload = `00020126580014BR.GOV.BCB.PIX0136${chavePix}5204000053039865407${dados.valor.toFixed(2)}5802BR5925Vamp Energy6009Sao Paulo62100506abcde`;

    QRCode.toDataURL(payload, (err, qrCode) => {
        if (err) {
            console.error('Erro ao gerar QR Code:', err);
            res.status(500).send('Erro ao gerar QR Code');
            return;
        }

        const qrImg = qrCode.replace(/^data:image\/png;base64,/, '');
        const imgBuffer = Buffer.from(qrImg, 'base64');

        doc.image(imgBuffer, 400, 180, { width: 120 });

        // === Linha digitável simulada ===
        doc.font('Courier-Bold').fontSize(14).text('34191.79001 01043.510047 91020.150008 9 90240000007000', 50, 320);

        // === Caixa de instruções ===
        doc.rect(50, 350, 500, 80).stroke();
        doc.font('Courier').fontSize(10).text(`Instruções:`, 55, 355);
        doc.text(`Após o vencimento, cobrar multa de 2% + R$ 0,50 ao dia.`, 55, 370);

        // === Recibo do pagador ===
        doc.moveDown(2).font('Courier-Bold').text('Recibo do Pagador', 50, 450);
        doc.rect(50, 470, 500, 100).stroke();
        doc.font('Courier').fontSize(10).text(`Pagador: ${dados.nome}`, 55, 480);
        doc.text(`Valor: R$ ${dados.valor.toFixed(2)}`, 55, 495);
        doc.text(`Vencimento: ${new Date(dados.data_vencimento).toLocaleDateString('pt-BR')}`, 55, 510);
        doc.text(`PIX: ${chavePix}`, 55, 525);

        // Finalizar
        doc.end();
    });
}

module.exports = { gerarBoleto };
app.post('/gerar-boleto', (req, res) => {
    const { nome, endereco, valor, data_vencimento } = req.body;

    try {
        gerarBoleto({ nome, endereco, valor, data_vencimento }, res);
    } catch (err) {
        console.error('Erro ao gerar boleto:', err);
        res.status(500).send('Erro ao gerar boleto');
    }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
