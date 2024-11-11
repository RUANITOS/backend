// backend/config/db.js
const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config();

// Configurações para conexão com o banco de dados SQL Server
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST, // Nome do servidor sem "tcp:" 
  database: process.env.DB_DATABASE,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true', // Criptografar a conexão
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true' // Confiar no certificado
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

// Criando a conexão pool com o SQL Server
const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log('Conectado ao banco de dados SQL Server');
    console.log(`Conexão bem-sucedida com o banco de dados: ${dbConfig.database} no servidor: ${dbConfig.server}`);
    return pool;
  })
  .catch(err => {
    console.error('Falha ao conectar ao banco de dados SQL Server', err);
    process.exit(1);
  });

module.exports = {
  sql, // exporta o objeto sql para criar queries e transações
  poolPromise // exporta o poolPromise para uso nas queries
};
