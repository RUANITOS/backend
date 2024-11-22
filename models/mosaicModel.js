// backend/models/mosaicModel.js
const db = require('../config/db');
const { sql,poolPromise } = require('../config/db');
const getMosaicos = async () => {
  const [rows] = await db.execute('SELECT * FROM dbo.mosaic');
  return rows;
};
// Função para inserir mosaico no banco de dados
const insertMosaic = async (mosaic) => {
  try {
    const pool = await poolPromise;  // Obtém a conexão do pool
    const result = await pool.request() // Faz a requisição
      .input('posicao_linha', sql.Int, mosaic.posicao_linha)
      .input('posicao_coluna', sql.Int, mosaic.posicao_coluna)
      .input('titulo_celula', sql.VarChar(30), mosaic.titulo_celula)
      .input('id_icone', sql.Int, mosaic.id_icone)
      .input('descricao_completa', sql.VarChar(30), mosaic.descricao_completa)
      .input('descricao_resumida', sql.VarChar(10), mosaic.descricao_resumida)
      .input('conteudo_efetivo', sql.Int, mosaic.conteudo_efetivo)
      .input('origem_conteudo', sql.VarChar(150), mosaic.origem_conteudo)
      .query(`
        INSERT INTO dbo.mosaic (
          dt_criacao, posicao_linha, posicao_coluna, titulo_celula, id_icone, 
          descricao_completa, descricao_resumida, dt_ultima_atualizacao, 
          conteudo_efetivo, origem_conteudo
        ) VALUES (GETDATE(), @posicao_linha, @posicao_coluna, @titulo_celula, 
          @id_icone, @descricao_completa, @descricao_resumida, GETDATE(), 
          @conteudo_efetivo, @origem_conteudo)
      `);
    return result.rowsAffected;  // Retorna o número de linhas afetadas
  } catch (error) {
    console.error("Erro ao inserir mosaico:", error);
    throw error;
  }
};

// Função para atualizar um mosaico no banco de dados
const updateMosaic = async (mosaic) => {
  try {
    const pool = await poolPromise;  // Obtém a conexão do pool
    const result = await pool.request() // Faz a requisição
      .input('id', sql.BigInt, mosaic.id)
      .input('posicao_linha', sql.Int, mosaic.posicao_linha)
      .input('posicao_coluna', sql.Int, mosaic.posicao_coluna)
      .input('titulo_celula', sql.VarChar(30), mosaic.titulo_celula)
      .input('id_icone', sql.Int, mosaic.id_icone)
      .input('descricao_completa', sql.VarChar(30), mosaic.descricao_completa)
      .input('descricao_resumida', sql.VarChar(10), mosaic.descricao_resumida)
      .input('conteudo_efetivo', sql.Int, mosaic.conteudo_efetivo)
      .input('origem_conteudo', sql.VarChar(10000), mosaic.origem_conteudo)
      .query(`
        UPDATE dbo.mosaic SET
          posicao_linha = @posicao_linha, posicao_coluna = @posicao_coluna, 
          titulo_celula = @titulo_celula, id_icone = @id_icone, 
          descricao_completa = @descricao_completa, descricao_resumida = @descricao_resumida, 
          dt_ultima_atualizacao = GETDATE(), conteudo_efetivo = @conteudo_efetivo, 
          origem_conteudo = @origem_conteudo
        WHERE id = @id
      `);
    return result.rowsAffected;  // Retorna o número de linhas afetadas
  } catch (error) {
    console.error("Erro ao atualizar mosaico:", error);
    throw error;
  }
};

// Função para atualizar apenas a posição (linha e coluna) de um mosaico
const updateMosaicPosition = async (id, posicao_linha, posicao_coluna) => {
  try {
    const pool = await poolPromise;  // Obtém a conexão do pool
    const result = await pool.request() // Faz a requisição
      .input('id', sql.BigInt, id)
      .input('posicao_linha', sql.Int, posicao_linha)
      .input('posicao_coluna', sql.Int, posicao_coluna)
      .query(`
        UPDATE dbo.mosaic SET
          posicao_linha = @posicao_linha, posicao_coluna = @posicao_coluna, 
          dt_ultima_atualizacao = GETDATE()
        WHERE id = @id
      `);
    return result.rowsAffected;  // Retorna o número de linhas afetadas
  } catch (error) {
    console.error("Erro ao atualizar posição do mosaico:", error);
    throw error;
  }
};

// Função para deletar um mosaico do banco de dados
const deleteMosaic = async (id) => {
  try {
    const pool = await poolPromise;  // Obtém a conexão do pool
    const result = await pool.request() // Faz a requisição
      .input('id', sql.BigInt, id)
      .query('DELETE FROM dbo.mosaic WHERE id = @id');
    return result.rowsAffected;  // Retorna o número de linhas afetadas
  } catch (error) {
    console.error("Erro ao deletar mosaico:", error);
    throw error;
  }
};

// Função para buscar todos os mosaicos do banco de dados
const getMosaics = async () => {
  try {
    const pool = await poolPromise;  // Obtém a conexão do pool
    const result = await pool.request() // Faz a requisição
      .query('SELECT * FROM dbo.mosaic'); // Executa a query
    return result.recordset;  // Retorna os resultados da query
  } catch (error) {
    console.error("Erro ao buscar mosaicos:", error);
    throw error;  // Lança o erro para ser tratado no controlador
  }
};

// Função para buscar um mosaico específico por ID
const getMosaicById = async (id) => {
  try {
    const pool = await poolPromise;  // Obtém a conexão do pool
    const result = await pool.request() // Faz a requisição
      .input('id', sql.BigInt, id)
      .query(`
        SELECT id, dt_criacao, posicao_linha, posicao_coluna, 
          titulo_celula, id_icone, descricao_completa, descricao_resumida, 
          dt_ultima_atualizacao, conteudo_efetivo, origem_conteudo
        FROM dbo.mosaic WHERE id = @id
      `);
    return result.recordset[0];  // Retorna o primeiro (e único) resultado
  } catch (error) {
    console.error("Erro ao buscar mosaico por ID:", error);
    throw error;  // Lança o erro para ser tratado no controlador
  }
};

// Função para buscar um mosaico específico pela posição (linha e coluna)
const getMosaicByPosition = async (row, col) => {
  try {
    const pool = await poolPromise;  // Obtém a conexão do pool
    const result = await pool.request() // Faz a requisição
      .input('posicao_linha', sql.Int, row)
      .input('posicao_coluna', sql.Int, col)
      .query('SELECT * FROM dbo.mosaic WHERE posicao_linha = @posicao_linha AND posicao_coluna = @posicao_coluna');
    return result.recordset[0];  // Retorna o primeiro resultado, se houver
  } catch (error) {
    console.error("Erro ao buscar mosaico por posição:", error);
    throw error;  // Lança o erro para ser tratado no controlador
  }
};

module.exports = {
  insertMosaic,
  updateMosaic,
  deleteMosaic,
  getMosaics,
  getMosaicById,
  getMosaicByPosition,
  updateMosaicPosition
};