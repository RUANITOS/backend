const db = require('../config/db');
const { sql, poolPromise } = require('../config/db');

// Função para buscar todos os usuários do banco de dados
const getUsers = async () => {
  try {
    const pool = await poolPromise;  // Obtém a conexão do pool
    const result = await pool.request() // Faz a requisição
      .query('SELECT * FROM dbo.usuariosmosaico'); // Executa a query
    return result.recordset;  // Retorna os resultados da query
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;  // Lança o erro para ser tratado no controlador
  }
};

// Função para inserir um usuário no banco de dados
const insertUser = async (user) => {
  try {
    const pool = await poolPromise;  // Obtém a conexão do pool
    const result = await pool.request() // Faz a requisição
      .input('nome', sql.VarChar(100), user.nome)
      .input('email', sql.VarChar(100), user.email)
      .input('senha', sql.VarChar(255), user.senha)
      .input('role', sql.VarChar(20), user.role)
      .input('data_criacao', sql.DateTime, user.data_criacao)
      .query(`
        INSERT INTO dbo.usuariosmosaico (nome, email, senha, role, data_criacao)
        VALUES (@nome, @email, @senha, @role, @data_criacao)
      `);
    return result.rowsAffected;  // Retorna o número de linhas afetadas
  } catch (error) {
    console.error("Erro ao inserir usuário:", error);
    throw error;
  }
};

// Função para atualizar um usuário no banco de dados
const updateUser = async (user) => {
  try {
    const pool = await poolPromise;  // Obtém a conexão do pool
    const result = await pool.request() // Faz a requisição
      .input('id', sql.BigInt, user.id)
      .input('nome', sql.VarChar(100), user.nome)
      .input('email', sql.VarChar(100), user.email)
      .input('senha', sql.VarChar(255), user.senha)
      .input('role', sql.VarChar(20), user.role)
      .input('data_atualizacao', sql.DateTime, user.data_atualizacao)
      .query(`
        UPDATE dbo.usuariosmosaico SET
          nome = @nome,
          email = @email,
          senha = @senha,
          role = @role,
          data_atualizacao = @data_atualizacao
        WHERE id = @id
      `);
    return result.rowsAffected;  // Retorna o número de linhas afetadas
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
};

// Função para deletar um usuário do banco de dados
const deleteUser = async (id) => {
  try {
    const pool = await poolPromise;  // Obtém a conexão do pool
    const result = await pool.request() // Faz a requisição
      .input('id', sql.BigInt, id)
      .query('DELETE FROM dbo.usuariosmosaico WHERE id = @id');
    return result.rowsAffected;  // Retorna o número de linhas afetadas
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    throw error;
  }
};

// Função para buscar um usuário específico por ID
const getUserById = async (id) => {
  try {
    const pool = await poolPromise;  // Obtém a conexão do pool
    const result = await pool.request() // Faz a requisição
      .input('id', sql.BigInt, id)
      .query(`
        SELECT id, nome, email, senha, role, data_criacao, data_atualizacao
        FROM dbo.usuariosmosaico WHERE id = @id
      `);
    return result.recordset[0];  // Retorna o primeiro (e único) resultado
  } catch (error) {
    console.error("Erro ao buscar usuário por ID:", error);
    throw error;  // Lança o erro para ser tratado no controlador
  }
};

// Função para buscar um usuário específico por email
const getUserByEmail = async (email) => {
  try {
    const pool = await poolPromise;  // Obtém a conexão do pool
    const result = await pool.request() // Faz a requisição
      .input('email', sql.VarChar(100), email)
      .query(`
        SELECT id, nome, email, senha, role, data_criacao, data_atualizacao
        FROM dbo.usuariosmosaico WHERE email = @email
      `);
    return result.recordset[0];  // Retorna o primeiro (e único) resultado
  } catch (error) {
    console.error("Erro ao buscar usuário por email:", error);
    throw error;  // Lança o erro para ser tratado no controlador
  }
};

module.exports = {
  insertUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
  getUserByEmail
};
