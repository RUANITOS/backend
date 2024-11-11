// backend/models/iconModel.js
const { sql, poolPromise } = require('../config/db');

// Função para inserir ícones no banco de dados
const insertIcon = async (icon) => {
  const pool = await poolPromise;  // Obtém a conexão do pool
  const result = await pool.request()
    .input('icon_id', sql.BigInt, icon.id)
    .input('src', sql.VarBinary(sql.MAX), icon.src)
    .input('id_implementacao', sql.BigInt, icon.id_implementacao || null)
    .input('descricao', sql.NVarChar(255), icon.descricao || null)
    .query(`
      INSERT INTO icons (icon_id, src, id_implementacao, descricao, dt_criacao, dt_modificacao)
      VALUES (@icon_id, @src, @id_implementacao, @descricao, GETDATE(), GETDATE())
    `);
  return result.rowsAffected;
};

// Função para atualizar ícones no banco de dados
const updateIcon = async (icon) => {
  const pool = await poolPromise;  // Obtém a conexão do pool
  const result = await pool.request()
    .input('icon_id', sql.BigInt, icon.id)
    .input('src', sql.VarBinary(sql.MAX), icon.src)
    .input('id_implementacao', sql.BigInt, icon.id_implementacao || null)
    .input('descricao', sql.NVarChar(255), icon.descricao || null)
    .query(`
      UPDATE icons
      SET src = @src, id_implementacao = @id_implementacao, descricao = @descricao, dt_modificacao = GETDATE()
      WHERE icon_id = @icon_id
    `);
  return result.rowsAffected;
};

// Função para deletar ícones do banco de dados
const deleteIcon = async (icon_id) => {
  const pool = await poolPromise;  // Obtém a conexão do pool
  const result = await pool.request()
    .input('icon_id', sql.BigInt, icon_id)
    .query('DELETE FROM icons WHERE icon_id = @icon_id');
  return result.rowsAffected;
};

// Função para buscar todos os ícones do banco de dados
const getIcons = async () => {
  const pool = await poolPromise;  // Obtém a conexão do pool
  const result = await pool.request().query('SELECT * FROM icons');
  return result.recordset; // Retorna os resultados da query
};

// Função para buscar um ícone específico por ID
const getIconById = async (icon_id) => {
  const pool = await poolPromise;  // Obtém a conexão do pool
  const result = await pool.request()
    .input('icon_id', sql.BigInt, icon_id)
    .query('SELECT * FROM icons WHERE icon_id = @icon_id');
  return result.recordset[0]; // Retorna o primeiro (e único) resultado
};

module.exports = {
  insertIcon,
  updateIcon,
  deleteIcon,
  getIcons,
  getIconById,
};
