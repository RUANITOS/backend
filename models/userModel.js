const { sql, poolPromise } = require('../config/db');

// Função para buscar todos os usuários do banco de dados
const getUsers = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('SELECT id_user, id_implem, nome, email, privilegios, senha FROM dbo.usuariosmosaico');
    return result.recordset; // Retorna os resultados da query
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error; // Lança o erro para ser tratado no controlador
  }
};

// Função para inserir um usuário no banco de dados
const insertUser = async (user) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id_implem', sql.BigInt, user.id_implem)
      .input('nome', sql.VarChar(100), user.nome)
      .input('email', sql.VarChar(100), user.email)
      .input('privilegios', sql.VarChar(50), user.privilegios)
      .input('senha', sql.VarChar(255), user.senha)
      .query(`
        INSERT INTO dbo.usuariosmosaico (id_implem, nome, email, privilegios, senha)
        VALUES (@id_implem, @nome, @email, @privilegios, @senha)
      `);
    return result.rowsAffected; // Retorna o número de linhas afetadas
  } catch (error) {
    console.error("Erro ao inserir usuário:", error);
    throw error;
  }
};

// Função para atualizar um usuário no banco de dados
const updateUser = async (user) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id_user', sql.Int, user.id_user)
      .input('nome', sql.VarChar(100), user.nome)
      .input('email', sql.VarChar(100), user.email)
      .input('privilegios', sql.VarChar(50), user.privilegios)
      .input('senha', sql.VarChar(255), user.senha)
      .query(`
        UPDATE dbo.usuariosmosaico SET
          nome = @nome,
          email = @email,
          privilegios = @privilegios,
          senha = @senha
        WHERE id_user = @id_user
      `);
    return result.rowsAffected; // Retorna o número de linhas afetadas
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
};

// Função para deletar um usuário do banco de dados
const deleteUser = async (id_user) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id_user', sql.Int, id_user)
      .query('DELETE FROM dbo.usuariosmosaico WHERE id_user = @id_user');
    return result.rowsAffected; // Retorna o número de linhas afetadas
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    throw error;
  }
};

// Função para buscar um usuário específico por ID
const getUserById = async (id_user) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id_user', sql.Int, id_user)
      .query(`
        SELECT id_user, id_implem, nome, email, privilegios, senha
        FROM dbo.usuariosmosaico WHERE id_user = @id_user
      `);
    return result.recordset[0]; // Retorna o primeiro (e único) resultado
  } catch (error) {
    console.error("Erro ao buscar usuário por ID:", error);
    throw error; // Lança o erro para ser tratado no controlador
  }
};

// Função para verificar as credenciais de login
const verifyCredentials = async (username, password) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('nome', sql.VarChar(100), username)
      .input('senha', sql.VarChar(255), password)
      .query(`
        SELECT id_user, nome, email, privilegios 
        FROM dbo.usuariosmosaico 
        WHERE nome = @nome AND senha = @senha
      `);

    return result.recordset[0]; // Retorna o usuário encontrado ou undefined
  } catch (error) {
    console.error("Erro ao verificar credenciais:", error);
    throw error;
  }
};
module.exports = {
  insertUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
  verifyCredentials
};
