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

// Função para buscar todos os ícones do banco de dados
const getIcons = async () => {
  const [rows] = await db.query('SELECT * FROM icons');
  return rows;
};

// Função para atualizar um ícone no banco de dados
const updateIcon = async (icon) => {
  const [result] = await db.query(
    'UPDATE icons SET src = ? WHERE icon_id = ?',
    [icon.src, icon.id]
  );
  return result;
};

// Função para buscar todos os IDs dos ícones
const getIconIds = async () => {
  const [rows] = await db.query('SELECT icon_id FROM icons'); // Busca apenas os IDs
  return rows.map(row => row.icon_id); // Retorna somente os valores de icon_id
};

// Função para deletar um ícone do banco de dados
const deleteIcon = async (iconId) => {
  const [result] = await db.query('DELETE FROM icons WHERE icon_id = ?', [iconId]);
  return result;
};

// Exporta as funções do modelo
module.exports = {
  insertIcon,
  getIcons,
  updateIcon,
  deleteIcon,
  getIconIds // Exporta a função de buscar IDs
};
