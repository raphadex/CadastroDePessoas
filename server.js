const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do MySQL
const MYSQL_USER = 'root';
const MYSQL_PASSWORD = '271172';
const MYSQL_HOST = 'localhost';
const MYSQL_PORT = 3306;
const DB_NAME = 'cadastro_usuarios';
const TABLE_NAME = 'usuarios_usuarios';

// Criar pool de conexões
const pool = mysql.createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

// Rota para salvar formulário
app.post('/api/salvar', async (req, res) => {
  const { nome, celular, descricao } = req.body;

  if (!nome || !celular) {
    return res.status(400).json({ success: false, message: 'Nome e celular obrigatórios' });
  }

  try {
    const sql = `INSERT INTO ${TABLE_NAME} (nome, celular, descricao) VALUES (?, ?, ?)`;
    const [result] = await pool.execute(sql, [nome, celular, descricao || '']);
    res.json({ success: true, message: 'Enviado com sucesso!', id: result.insertId });
  } catch (err) {
    console.error('Erro ao salvar:', err.message);
    res.status(500).json({ success: false, message: 'Erro no servidor: ' + err.message });
  }
});

// Servir HTML
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
