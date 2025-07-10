const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());

//Permite o front
app.use(cors({ origin: 'http://localhost:5173' }));

//Permite imagens na pasta uploads
app.use('/uploads', express.static('uploads', {
  setHeaders: (res) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  }
}));


// Cria a pasta uploads se não existir
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Configuração do multer para armazenar a imagem
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  }
});
const upload = multer({ storage });

// Servir imagens estaticamente da pasta uploads
app.use('/uploads', express.static('uploads', {
  setHeaders: (res) => {
    res.setHeader("Cross-Origin-Resource-Policy", "same-origin"); // ou "cross-origin" se necessário
  }
}));

// Conexão com o banco
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lua56sol2003',
  database: 'usuariovamp'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco:', err);
  } else {
    console.log('Conectado ao MySQL!');
  }
});

// Rota de cadastro com foto
app.post('/cadastrandoUsuarios', upload.single('foto'), (req, res) => {
  console.log('Recebido no backend:', req.body);

  const { nome, data_nascimento, telefone, nome_empresa, tem_empresa, email, senha } = req.body;
  const fotoPath = req.file ? req.file.filename : null;

  if (!nome || !data_nascimento || !telefone || !email || !senha) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  const dataNascimento = new Date(data_nascimento).toISOString().slice(0, 10);

  const sqlNovoUsuario = `
    INSERT INTO novousuario 
    (nome, data_nascimento, telefone, nome_empresa, tem_empresa, email, senha, foto) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sqlNovoUsuario, [
    nome,
    dataNascimento,
    telefone,
    nome_empresa || null,
    tem_empresa ? 1 : 0,
    email,
    senha,
    fotoPath
  ], (err, result) => {
    if (err) {
      console.error('Erro no cadastro:', err);
      return res.status(500).json({ error: err.message });
    }

    const novoUsuarioId = result.insertId;

    const sqlUsuario = `
      INSERT INTO usuario (novousuario_id, email, senha, foto) 
      VALUES (?, ?, ?, ?)
    `;

    db.query(sqlUsuario, [novoUsuarioId, email, senha, fotoPath], (err2, result2) => {
      if (err2) {
        console.error('Erro ao inserir na tabela usuario:', err2);
        return res.status(500).json({ error: err2.message });
      }

      res.json({
        message: 'Usuário cadastrado com sucesso!',
        id: novoUsuarioId,
        foto: fotoPath ? `http://localhost:3000/uploads/${fotoPath}` : null
      });
    });
  });
});


// Rota de login
app.post('/usuarios', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  const sql = `
    SELECT u.*, n.nome, COALESCE(u.foto, n.foto) AS foto 
    FROM usuario u
    JOIN novousuario n ON u.novousuario_id = n.id
    WHERE u.email = ? AND u.senha = ?
  `;

  db.query(sql, [email, senha], (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    const usuario = results[0];
    const fotoUrl = usuario.foto ? `http://localhost:3000/uploads/${usuario.foto}` : null;

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



// Porta do servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
