// backend/models/mosaicModel.js
const db = require('../config/db');

// Função para inserir mosaico no banco de dados
const insertMosaic = async (mosaic) => {
  const [rows] = await db.query(
    `INSERT INTO mosaic (
      id_implem, dt_criacao, posicao_linha, posicao_coluna, codigo_id_icone, 
      titulo_celula, id_icone, descricao_completa, descricao_resumida, 
      dt_ultima_atualizacao, conteudo_efetivo
    ) VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?, NOW(), ?)`,
    [
      mosaic.id_implem,
      mosaic.posicao_linha,
      mosaic.posicao_coluna,
      mosaic.codigo_id_icone,
      mosaic.titulo_celula,
      mosaic.id_icone,
      mosaic.descricao_completa,
      mosaic.descricao_resumida,
      mosaic.conteudo_efetivo
    ]
  );
  return rows;
};

// Função para atualizar um mosaico no banco de dados
const updateMosaic = async (mosaic) => {
  const [rows] = await db.query(
    `UPDATE mosaic SET
      posicao_linha = ?, posicao_coluna = ?, codigo_id_icone = ?, titulo_celula = ?, 
      id_icone = ?, descricao_completa = ?, descricao_resumida = ?, 
      dt_ultima_atualizacao = NOW(), conteudo_efetivo = ?
    WHERE id_implem = ?`,
    [
      mosaic.posicao_linha,
      mosaic.posicao_coluna,
      mosaic.codigo_id_icone,
      mosaic.titulo_celula,
      mosaic.id_icone,
      mosaic.descricao_completa,
      mosaic.descricao_resumida,
      mosaic.conteudo_efetivo,
      mosaic.id_implem
    ]
  );
  return rows;
};

// Função para deletar um mosaico do banco de dados
const deleteMosaic = async (id_implem) => {
  const [rows] = await db.query(
    'DELETE FROM mosaic WHERE id_implem = ?',
    [id_implem]
  );
  return rows;
};

// Função para buscar todos os mosaicos do banco de dados
const getMosaics = async () => {
  const [rows] = await db.query('SELECT * FROM mosaic');
  return rows;
};

// Função para buscar um mosaico específico por ID
const getMosaicById = async (id_implem) => {
  const [rows] = await db.query(
    `SELECT id_implem, dt_criacao, posicao_linha, posicao_coluna, codigo_id_icone, 
      titulo_celula, id_icone, descricao_completa, descricao_resumida, 
      dt_ultima_atualizacao, conteudo_efetivo
    FROM mosaic WHERE id_implem = ?`,
    [id_implem]
  );
  return rows[0]; // Retorna o primeiro (e único) resultado
};

module.exports = {
  insertMosaic,
  updateMosaic,
  deleteMosaic,
  getMosaics,
  getMosaicById,
};