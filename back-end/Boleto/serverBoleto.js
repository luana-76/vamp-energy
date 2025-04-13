const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const moment = require('moment');
const puppeteer = require('puppeteer');
const { Boleto } = require('node-boleto');

const app = express();
const PORT = process.env.PORT || 3001;


const allowedOrigins = [
  'http://localhost:3000', // para testes locais
  'https://vamp-energy.vercel.app' // produção
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));


app.use(express.json());

app.post('/gerar-boleto', async (req, res) => {
  try {
    const boleto = new Boleto({
      banco: 'bradesco',
      data_emissao: new Date(),
      data_vencimento: moment().add(5, 'days').toDate(),
      valor: 15000, // 150,00 em centavos
      nosso_numero: '1234567',
      numero_documento: '1234',
      cedente: 'Vamp Energy Ltda.',
      cedente_cnpj: '12.345.678/0001-00',
      agencia: '1234',
      codigo_cedente: '56789',
      carteira: '09',
      pagador: 'Cliente Qualquer\nRua Qualquer, 123\nBairro\nCidade - Estado - CEP: 00000-000'
    });

    boleto.renderHTML(async (html) => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });

      const pdfBuffer = await page.pdf({ format: 'A4' });

      await browser.close();

      res.setHeader('Content-Disposition', 'attachment; filename=boleto.pdf');
      res.setHeader('Content-Type', 'application/pdf');
      res.send(pdfBuffer);
    });
  } catch (err) {
    console.error('Erro ao gerar boleto:', err);
    res.status(500).send('Erro ao gerar boleto');
  }
});

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});
