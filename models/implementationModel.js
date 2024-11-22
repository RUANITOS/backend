// backend/models/implementationModel.js
const db = require('../config/db');
const { sql, poolPromise } = require('../config/db');

// Função para buscar todas as implementações
const getImplementations = async () => {
  try {
    const pool = await poolPromise;  // Obtém a conexão do pool
    const result = await pool.request() // Faz a requisição
      .query('SELECT * FROM dbo.implementacaomosaico'); // Executa a query
    return result.recordset;  // Retorna os resultados da query
  } catch (error) {
    console.error("Erro ao buscar implementações:", error);
    throw error;  // Lança o erro para ser tratado no controlador
  }
};

// Função para buscar uma implementação específica por ID
const getImplementationById = async (id) => {
  try {
    const pool = await poolPromise;  // Obtém a conexão do pool
    const result = await pool.request() // Faz a requisição
      .input('id_implem', sql.Int, id)
      .query(`SELECT * FROM dbo.implementacaomosaico WHERE id_implem = @id_implem`);
    return result.recordset[0];  // Retorna o primeiro (e único) resultado
  } catch (error) {
    console.error("Erro ao buscar implementação por ID:", error);
    throw error;  // Lança o erro para ser tratado no controlador
  }
};

// Função para inserir uma nova implementação no banco de dados
const insertImplementation = async (implementation) => {
  try {
    const pool = await poolPromise;  // Obtém a conexão do pool
    const result = await pool.request() // Faz a requisição
      .input('situacao', sql.Int, implementation.situacao)
      .input('nome_implementacao', sql.VarChar(30), implementation.nome_implementacao)
      .input('imagem_fundo', sql.VarBinary, implementation.imagem_fundo)
      .input('logo', sql.VarBinary, implementation.logo)
      .input('numero_linhas', sql.Int, implementation.numero_linhas)
      .input('numero_colunas', sql.Int, implementation.numero_colunas)
      .input('tipo_contrato', sql.Int, implementation.tipo_contrato)
      .input('titulo', sql.VarChar(30), implementation.titulo)
      .input('url_legado', sql.VarChar(255), implementation.url_legado)
      .input('tipo_edicao_icone', sql.Int, implementation.tipo_edicao_icone)
      .input('codigo_tabela_idiomas', sql.Int, implementation.codigo_tabela_idiomas)
      .input('email_usuario', sql.VarChar(100), implementation.email_usuario)
      .input('nome_usuario', sql.VarChar(100), implementation.nome_usuario)
      .input('endereco_completo', sql.VarChar(255), implementation.endereco_completo)
      .input('telefone_contato', sql.VarChar(15), implementation.telefone_contato)
      .input('cpf_cnpj', sql.VarChar(20), implementation.cpf_cnpj)
      .input('razao_social', sql.VarChar(100), implementation.razao_social)
      .query(`
        INSERT INTO dbo.implementacaomosaico (
          situacao, nome_implementacao, imagem_fundo, logo, 
          numero_linhas, numero_colunas, tipo_contrato, titulo, 
          url_legado, tipo_edicao_icone, codigo_tabela_idiomas, 
          email_usuario, nome_usuario, endereco_completo, 
          telefone_contato, cpf_cnpj, razao_social, dt_criacao
        ) VALUES (
          @situacao, @nome_implementacao, @imagem_fundo, @logo, 
          @numero_linhas, @numero_colunas, @tipo_contrato, @titulo, 
          @url_legado, @tipo_edicao_icone, @codigo_tabela_idiomas, 
          @email_usuario, @nome_usuario, @endereco_completo, 
          @telefone_contato, @cpf_cnpj, @razao_social, GETDATE()
        )
      `);
    return result.rowsAffected;  // Retorna o número de linhas afetadas
  } catch (error) {
    console.error("Erro ao inserir implementação:", error);
    throw error;
  }
};

// Função para atualizar uma implementação no banco de dados
const updateImplementation = async (implementation) => {
  try {
    const pool = await poolPromise;  // Obtém a conexão do pool
    const result = await pool.request() // Faz a requisição
      .input('id_implem', sql.Int, implementation.id_implem)
      .input('situacao', sql.Int, implementation.situacao)
      .input('nome_implementacao', sql.VarChar(30), implementation.nome_implementacao)
      .input('imagem_fundo', sql.VarBinary, implementation.imagem_fundo)
      .input('logo', sql.VarBinary, implementation.logo)
      .input('numero_linhas', sql.Int, implementation.numero_linhas)
      .input('numero_colunas', sql.Int, implementation.numero_colunas)
      .input('tipo_contrato', sql.Int, implementation.tipo_contrato)
      .input('titulo', sql.VarChar(30), implementation.titulo)
      .input('url_legado', sql.VarChar(255), implementation.url_legado)
      .input('tipo_edicao_icone', sql.Int, implementation.tipo_edicao_icone)
      .input('codigo_tabela_idiomas', sql.Int, implementation.codigo_tabela_idiomas)
      .input('email_usuario', sql.VarChar(100), implementation.email_usuario)
      .input('nome_usuario', sql.VarChar(100), implementation.nome_usuario)
      .input('endereco_completo', sql.VarChar(255), implementation.endereco_completo)
      .input('telefone_contato', sql.VarChar(15), implementation.telefone_contato)
      .input('cpf_cnpj', sql.VarChar(20), implementation.cpf_cnpj)
      .input('razao_social', sql.VarChar(100), implementation.razao_social)
      .query(`
        UPDATE dbo.implementacaomosaico SET 
          situacao = @situacao, nome_implementacao = @nome_implementacao, 
          imagem_fundo = @imagem_fundo, logo = @logo, 
          numero_linhas = @numero_linhas, numero_colunas = @numero_colunas, 
          tipo_contrato = @tipo_contrato, titulo = @titulo, 
          url_legado = @url_legado, tipo_edicao_icone = @tipo_edicao_icone, 
          codigo_tabela_idiomas = @codigo_tabela_idiomas, 
          email_usuario = @email_usuario, nome_usuario = @nome_usuario, 
          endereco_completo = @endereco_completo, telefone_contato = @telefone_contato, 
          cpf_cnpj = @cpf_cnpj, razao_social = @razao_social, 
          dt_ultima_atualizacao = GETDATE()
        WHERE id_implem = @id_implem
      `);
    return result.rowsAffected;  // Retorna o número de linhas afetadas
  } catch (error) {
    console.error("Erro ao atualizar implementação:", error);
    throw error;
  }
};

// Função para deletar uma implementação do banco de dados
const deleteImplementation = async (id_implem) => {
  try {
    const pool = await poolPromise;  // Obtém a conexão do pool
    const result = await pool.request() // Faz a requisição
      .input('id_implem', sql.Int, id_implem)
      .query('DELETE FROM dbo.implementacaomosaico WHERE id_implem = @id_implem');
    return result.rowsAffected;  // Retorna o número de linhas afetadas
  } catch (error) {
    console.error("Erro ao deletar implementação:", error);
    throw error;
  }
};

module.exports = {
  getImplementations,
  getImplementationById,
  insertImplementation,
  updateImplementation,
  deleteImplementation
};
