// backend/models/iconModel.js
const db = require('../config/db');

const insertIcon = async (icon) => {
  const [rows] = await db.query(
    'INSERT INTO icons (icon_id, src, id_implementacao, descricao, dt_criacao, dt_modificacao) VALUES (?, ?, ?, ?, NOW(), NOW())',
    [icon.id, icon.src, icon.id_implementacao || null, icon.descricao || null]
  );
  return rows;
};

// Função para atualizar ícones no banco de dados
const updateIcon = async (icon) => {
  const [rows] = await db.query(
    'UPDATE icons SET src = ?, id_implementacao = ?, descricao = ?, dt_modificacao = NOW() WHERE icon_id = ?',
    [icon.src, icon.id_implementacao || null, icon.descricao || null, icon.id]
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

// Função para buscar um ícone específico por ID com todos os novos campos
const getIconById = async (icon_id) => {
  const [rows] = await db.query(
    'SELECT icon_id, src, id_implementacao, descricao, dt_criacao, dt_modificacao FROM icons WHERE icon_id = ?',
    [icon_id]
  );
  return rows[0]; // Retorna o primeiro (e único) resultado
};
// Função para buscar apenas os IDs dos ícones do banco de dados
const getIconIds = async () => {
  const [rows] = await db.query('SELECT icon_id FROM icons');
  return rows;
};

module.exports = {
  insertIcon,
  updateIcon,
  deleteIcon,
  getIcons,
  getIconById,
  getIconIds
};
