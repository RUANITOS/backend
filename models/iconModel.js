// backend/models/iconModel.js
const db = require('../config/db');

// Função para inserir ícones no banco de dados
const insertIcon = async (icon) => {
  const [rows] = await db.query(
    'INSERT INTO icons (icon_id, src) VALUES (?, ?)',
    [icon.id, icon.src]
  );
  return rows;
};

// Função para atualizar ícones no banco de dados
const updateIcon = async (icon) => {
  const [rows] = await db.query(
    'UPDATE icons SET src = ? WHERE icon_id = ?',
    [icon.src, icon.id]
  );
  return rows;
};

// Função para deletar ícones do banco de dados
const deleteIcon = async (icon_id) => {
  const [rows] = await db.query(
    'DELETE FROM icons WHERE icon_id = ?',
    [icon_id]
  );
  return rows;
};

// Função para buscar todos os ícones do banco de dados
const getIcons = async () => {
  const [rows] = await db.query('SELECT * FROM icons');
  return rows;
};
// Função para buscar um ícone específico por ID
const getIconById = async (icon_id) => {
  const [rows] = await db.query(
    'SELECT * FROM icons WHERE icon_id = ?',
    [icon_id]
  );
  return rows[0]; // Retorna o primeiro (e único) resultado
};

module.exports = {
  insertIcon,
  updateIcon, // Exporta a nova função
  deleteIcon, // Exporta a nova função
  getIcons,
  getIconById,
};
