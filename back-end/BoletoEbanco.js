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

// Cadastro
app.post('/cadastrandoUsuarios', upload.single('foto'), (req, res) => {
  const { nome, data_nascimento, telefone, nome_empresa, tem_empresa, email, senha } = req.body;
  const fotoPath = req.file ? req.file.filename : null;
  const dataNascimento = new Date(data_nascimento).toISOString().slice(0, 10);

  const sqlNovoUsuario = `INSERT INTO novousuario (nome, data_nascimento, telefone, nome_empresa, tem_empresa, email, senha, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sqlNovoUsuario, [nome, dataNascimento, telefone, nome_empresa || null, tem_empresa === '1' ? 0 : 1, email, senha, fotoPath], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    const novoUsuarioId = result.insertId;

    const sqlUsuario = `INSERT INTO usuario (novousuario_id, email, senha, foto) VALUES (?, ?, ?, ?)`;
    db.query(sqlUsuario, [novoUsuarioId, email, senha, fotoPath], (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({
        message: 'Usuário cadastrado com sucesso!',
        id: novoUsuarioId,
        foto: fotoPath ? `/uploads/${fotoPath}` : null
      });
    });
  });
});

// Login
app.post('/usuarios', (req, res) => {
  const { email, senha } = req.body;
  const sql = `
    SELECT u.*, n.nome, COALESCE(u.foto, n.foto) AS foto 
    FROM usuario u
    JOIN novousuario n ON u.novousuario_id = n.id
    WHERE u.email = ? AND u.senha = ?`;

  db.query(sql, [email, senha], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    if (results.length === 0) return res.status(401).json({ error: 'Email ou senha inválidos' });

    const usuario = results[0];
    const fotoUrl = usuario.foto ? `/uploads/${usuario.foto}` : null;

    res.json({
      message: 'Login realizado com sucesso!',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        foto: fotoUrl
      }
    });
  });
});

// Perfil
app.get('/perfil/:id', (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT n.id, n.nome, n.data_nascimento, n.telefone, n.nome_empresa, u.email, n.senha,
    COALESCE(u.foto, n.foto) AS foto
    FROM usuario u
    JOIN novousuario n ON u.novousuario_id = n.id
    WHERE u.id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    if (results.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });

    const usuario = results[0];
    usuario.foto = usuario.foto ? `/uploads/${usuario.foto}` : null;

    res.json(usuario);
  });
});

// Atualizar perfil
app.put('/perfil/:id', upload.single('foto'), (req, res) => {
  const id = req.params.id;
  const { nome, data_nascimento, telefone, nome_empresa, tem_empresa, email, senha } = req.body;
  const foto = req.file ? req.file.filename : null;

  const sqlUpdate = foto ?
    `UPDATE novousuario SET nome = ?, data_nascimento = ?, telefone = ?, nome_empresa = ?, tem_empresa = ?, email = ?, senha = ?, foto = ? WHERE id = ?` :
    `UPDATE novousuario SET nome = ?, data_nascimento = ?, telefone = ?, nome_empresa = ?, tem_empresa = ?, email = ?, senha = ? WHERE id = ?`;

  const values = foto ?
    [nome, data_nascimento, telefone, nome_empresa, tem_empresa, email, senha, foto, id] :
    [nome, data_nascimento, telefone, nome_empresa, tem_empresa, email, senha, id];

  db.query(sqlUpdate, values, (err, result) => {
    if (err || result.affectedRows === 0) return res.status(500).json({ error: 'Erro ao atualizar' });

    const sqlUsuarioUpdate = foto ?
      `UPDATE usuario SET email = ?, senha = ?, foto = ? WHERE novousuario_id = ?` :
      `UPDATE usuario SET email = ?, senha = ? WHERE novousuario_id = ?`;

    const val = foto ? [email, senha, foto, id] : [email, senha, id];

    db.query(sqlUsuarioUpdate, val, (err2) => {
      if (err2) return res.status(500).json({ error: 'Erro ao atualizar a tabela usuario' });
      res.json({ message: 'Perfil atualizado com sucesso' });
    });
  });
});

// ================= START =================
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
