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

//Logando usuário
app.post('/usuarios', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  const sql = 'INSERT INTO usuario (email, senha) VALUES (?, ?)';

  db.query(sql, [email, senha], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Usuário Logado com sucesso!', id: result.insertId });
  });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
