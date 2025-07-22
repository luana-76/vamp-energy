const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// -------------------- Configurações --------------------

app.use(express.json());

//Permite o front
app.use(cors({ origin: 'http://localhost:5173' }));

// Middleware para servir imagens públicas da pasta 'uploads'
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

// -------------------- Banco de Dados --------------------

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

// -------------------- Rotas --------------------

// 📌 Rota para cadastro de novo usuário (tabelas: novousuario e usuario)

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


// 📌 Rota para login de usuário (com JOIN entre novousuario e usuario)

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

// 📌 Rota para buscar dados de perfil de um usuário pelo ID

app.get('/perfil/:id', (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      n.id,
      n.nome,
      n.data_nascimento,
      n.telefone,
      n.nome_empresa,
      u.email,
      n.senha,
      COALESCE(u.foto, n.foto) AS foto
    FROM usuario u
    JOIN novousuario n ON u.novousuario_id = n.id
    WHERE u.id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar perfil:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const usuario = results[0];
    usuario.foto = usuario.foto
      ? `http://localhost:3000/uploads/${usuario.foto}`
      : null;

    res.json(usuario);
  });
});

// 📌 Rota para editar perfil (atualiza novousuario e usuario)

app.put('/perfil/:id', upload.single('foto'), (req, res) => {
  const id = req.params.id;
  const {
    nome,
    data_nascimento,
    telefone,
    nome_empresa,
    tem_empresa,
    email,
    senha
  } = req.body;

  const foto = req.file ? req.file.filename : null;

  let sql, values;

  // Atualiza com ou sem foto, dependendo do req.file
  if (foto) {
    sql = `
      UPDATE novousuario 
      SET nome = ?, data_nascimento = ?, telefone = ?, nome_empresa = ?, tem_empresa = ?, email = ?, senha = ?, foto = ?
      WHERE id = ?
    `;
    values = [nome, data_nascimento, telefone, nome_empresa, tem_empresa, email, senha, foto, id];
  } else {
    sql = `
      UPDATE novousuario 
      SET nome = ?, data_nascimento = ?, telefone = ?, nome_empresa = ?, tem_empresa = ?, email = ?, senha = ?
      WHERE id = ?
    `;
    values = [nome, data_nascimento, telefone, nome_empresa, tem_empresa, email, senha, id];
  }

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao atualizar usuário:', err);
      return res.status(500).json({ error: 'Erro interno' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Atualiza a tabela usuario também
    let sqlUpdateUsuario, valuesUpdate;

    if (foto) {
      sqlUpdateUsuario = `
        UPDATE usuario 
        SET email = ?, senha = ?, foto = ?
        WHERE novousuario_id = ?
      `;
      valuesUpdate = [email, senha, foto, id];
    } else {
      sqlUpdateUsuario = `
        UPDATE usuario 
        SET email = ?, senha = ?
        WHERE novousuario_id = ?
      `;
      valuesUpdate = [email, senha, id];
    }

    db.query(sqlUpdateUsuario, valuesUpdate, (err2, result2) => {
      if (err2) {
        console.error('Erro ao atualizar usuario:', err2);
        return res.status(500).json({ error: 'Erro ao atualizar a tabela usuario' });
      }

      res.json({ message: 'Perfil atualizado com sucesso' });
    });
  });
});


// Porta do servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
