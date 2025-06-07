const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

// Acessando o meu banco
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lua56sol2003',
    database: 'usuariovamp'
});

//Testando conexão
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar no banco:', err);
    } else {
        console.log('Conectado ao MySQL!');
    }
});

//Estamos ligando as tabelas com chave estrangeira, pelo id
app.post('/cadastrandoUsuarios', (req, res) => {
  console.log('Recebido no backend:', req.body);
  
  let { nome, data_nascimento, telefone, nome_empresa, tem_empresa, email, senha } = req.body;

  if (!nome || !data_nascimento || !telefone || !email || !senha) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  // Converter data para formato YYYY-MM-DD
  const dataNascimento = new Date(data_nascimento).toISOString().slice(0, 10);

  // Primeiro insere na tabela novousuario
  const sqlNovoUsuario = `INSERT INTO novousuario 
    (nome, data_nascimento, telefone, nome_empresa, tem_empresa, email, senha) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(sqlNovoUsuario, [
    nome,
    dataNascimento,
    telefone,
    nome_empresa || null,
    tem_empresa ? 1 : 0,
    email,
    senha
  ], (err, result) => {
    if (err) {
      console.error('Erro no cadastro:', err);
      return res.status(500).json({ error: err.message });
    }

    const novoUsuarioId = result.insertId;

    // Agora insere na tabela usuario com o id do novousuario
    const sqlUsuario = `INSERT INTO usuario (novousuario_id, email, senha) VALUES (?, ?, ?)`;

    db.query(sqlUsuario, [
      novoUsuarioId,
      email,
      senha
    ], (err2, result2) => {
      if (err2) {
        console.error('Erro ao inserir na tabela usuario:', err2);
        return res.status(500).json({ error: err2.message });
      }

      res.json({ message: 'Usuário cadastrado com sucesso em ambas as tabelas!', id: novoUsuarioId });
    });
  });
});

//Procurando se o usuário existe
app.post('/usuarios', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  // Procura na tabela usuario, mas também junta com novousuario se quiser mais info
  const sql = `
    SELECT u.*, n.nome 
    FROM usuario u
    JOIN novousuario n ON u.novousuario_id = n.id
    WHERE u.email = ? AND u.senha = ?

  `;//o ? é para entrada de usuário

  db.query(sql, [email, senha], (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    // Aqui você pode devolver nome ou outros dados se quiser
    res.json({ message: 'Login realizado com sucesso!', usuario: results[0] });
  });
});


//Define a porta (Sem ela pode dá errado)
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
