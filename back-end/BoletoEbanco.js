// ================= IMPORTS =================
const express = require('express');
const cors = require('cors');
const { Boleto } = require('node-boleto');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const path = require('path');
const mysql = require('mysql2');
const multer = require('multer');
const fs = require('fs');

// ================= CONFIG INICIAL =================
const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
  'https://vamp-energy.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// ================= STATIC & UPLOAD =================
app.use('/uploads', express.static('uploads', {
  setHeaders: (res) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  }
}));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ================= DATABASE =================
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lua56sol2003',
  database: 'usuariovamp'
});

db.connect((err) => {
  if (err) console.error('Erro ao conectar no banco:', err);
  else console.log('Conectado ao MySQL!');
});

// ================= GERAR BOLETO =================
function gerarBoleto(dados, res) {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  res.setHeader('Content-Type', 'application/pdf');
  doc.pipe(res);

  const corLinha = '#000000';
  doc.image(path.join(__dirname, 'logo.png'), 50, 50, { width: 100 });
  doc.fontSize(20).text('Boleto Bancário', 200, 50);
  doc.fontSize(10).text('Documento gerado por Vamp Energy', 200, 75);
  doc.moveDown().font('Courier-Bold').fontSize(12);
  doc.text(`Cedente: Vamp Energy S.A`);
  doc.text(`Agência/Código do Cedente: 1234 / 12345-6`);
  doc.text(`Nosso número: 000123456789-0`);
  doc.text(`Carteira: 09`);
  doc.moveTo(50, 160).lineTo(550, 160).stroke(corLinha);
  doc.font('Courier').fontSize(11).text(`Pagador: ${dados.nome}`, 50, 180);
  doc.text(`Endereço: ${dados.endereco}`, 50, 195);
  doc.font('Courier-Bold').fontSize(12);
  doc.text(`Valor do documento: R$ ${dados.valor.toFixed(2)}`, 50, 230);
  doc.text(`Vencimento: ${new Date(dados.data_vencimento).toLocaleDateString('pt-BR')}`, 50, 250);

  const chavePix = 'chavepix@vampenergy.com';
  const payload = `00020126580014BR.GOV.BCB.PIX0136${chavePix}5204000053039865407${dados.valor.toFixed(2)}5802BR5925Vamp Energy6009Sao Paulo62100506abcde`;

  QRCode.toDataURL(payload, (err, qrCode) => {
    if (err) return res.status(500).send('Erro ao gerar QR Code');
    const imgBuffer = Buffer.from(qrCode.replace(/^data:image\/png;base64,/, ''), 'base64');
    doc.image(imgBuffer, 400, 180, { width: 120 });
    doc.font('Courier-Bold').fontSize(14).text('34191.79001 01043.510047 91020.150008 9 90240000007000', 50, 320);
    doc.rect(50, 350, 500, 80).stroke();
    doc.font('Courier').fontSize(10).text(`Instruções:`, 55, 355);
    doc.text(`Após o vencimento, cobrar multa de 2% + R$ 0,50 ao dia.`, 55, 370);
    doc.moveDown(2).font('Courier-Bold').text('Recibo do Pagador', 50, 450);
    doc.rect(50, 470, 500, 100).stroke();
    doc.font('Courier').fontSize(10).text(`Pagador: ${dados.nome}`, 55, 480);
    doc.text(`Valor: R$ ${dados.valor.toFixed(2)}`, 55, 495);
    doc.text(`Vencimento: ${new Date(dados.data_vencimento).toLocaleDateString('pt-BR')}`, 55, 510);
    doc.text(`PIX: ${chavePix}`, 55, 525);
    doc.end();
  });
}

app.post('/gerar-boleto', (req, res) => {
  const { nome, endereco, valor, data_vencimento } = req.body;
  try {
    gerarBoleto({ nome, endereco, valor, data_vencimento }, res);
  } catch (err) {
    res.status(500).send('Erro ao gerar boleto');
  }
});

// ================= ROTAS DE USUÁRIO =================

// initTables.js
import pool from './db.js';

export async function criarTabelas() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS novousuario (
        id SERIAL PRIMARY KEY,
        nome TEXT NOT NULL,
        data_nascimento DATE NOT NULL,
        telefone TEXT,
        nome_empresa TEXT,
        tem_empresa BOOLEAN DEFAULT false,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL,
        foto TEXT
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuario (
        id SERIAL PRIMARY KEY,
        novousuario_id INTEGER REFERENCES novousuario(id) ON DELETE CASCADE,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL,
        foto TEXT
      );
    `);

    console.log('Tabelas criadas ou já existentes ✅');
  } catch (error) {
    console.error('Erro ao criar tabelas:', error);
  }
}

// ================= START =================
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
