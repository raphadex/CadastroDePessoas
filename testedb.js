const mysql = require('mysql2/promise');

async function conectar() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '271172',  // coloque sua senha real
      database: 'cadastro_usuarios',
      port: 3306
    });

    console.log('Conectado ao MySQL com sucesso!');
    await connection.end(); // encerra a conexão
  } catch (err) {
    console.error('Erro ao conectar:', err.message);
  }
}

conectar();
