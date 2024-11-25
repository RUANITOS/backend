// backend/controllers/implementationController.js
const {
    insertImplementation,
    getImplementations,
    updateImplementation,
    deleteImplementation,
    getImplementationById,
    getImplementationByPosition,
    updateImplementationPosition,
    getImplementationNamesAndIds 
  } = require('../models/implementationModel');
  // Função para buscar os nomes e IDs das implementações
const fetchImplementationNamesAndIds = async (req, res) => {
  try {
    const implementationNamesAndIds = await getImplementationNamesAndIds(); // Chama a função do model
    res.status(200).json(implementationNamesAndIds); // Retorna os dados em formato JSON
  } catch (error) {
    console.error("Erro ao buscar nomes e IDs das implementações:", error); // Log detalhado do erro
    res.status(500).json({ message: "Erro ao buscar nomes e IDs das implementações", error });
  }
};
  
  // Função para buscar todas as implementações do banco de dados
  const fetchImplementations = async (req, res) => {
    try {
      const implementations = await getImplementations();
      res.status(200).json(implementations);
    } catch (error) {
      console.error("Erro ao buscar implementações:", error); // Log detalhado do erro
      res.status(500).json({ message: "Erro ao buscar implementações", error });
    }
  };
  
  // Função para adicionar uma implementação ao banco de dados a partir do formulário
  const addImplementation = async (req, res) => {
    try {
      const implementationData = {
        posicao_linha: req.body.posicao_linha,
        posicao_coluna: req.body.posicao_coluna,
        titulo_celula: req.body.titulo_celula,
        id_icone: req.body.id_icone,
        descricao_completa: req.body.descricao_completa,
        descricao_resumida: req.body.descricao_resumida,
        conteudo_efetivo: req.body.conteudo_efetivo,
        origem_conteudo: req.body.origem_conteudo
      };
  
      await insertImplementation(implementationData);
      res.status(201).json({ message: 'Implementação adicionada com sucesso!' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao adicionar implementação', error });
    }
  };
  
  // Função para atualizar uma implementação
  const modifyImplementation = async (req, res) => {
    try {
      const { id } = req.params;
      const implementationData = {
        posicao_linha: req.body.posicao_linha,
        posicao_coluna: req.body.posicao_coluna,
        titulo_celula: req.body.titulo_celula,
        id_icone: req.body.id_icone,
        descricao_completa: req.body.descricao_completa,
        descricao_resumida: req.body.descricao_resumida,
        conteudo_efetivo: req.body.conteudo_efetivo,
        origem_conteudo: req.body.origem_conteudo
      };
  
      await updateImplementation({ ...implementationData, id });
      res.status(200).json({ message: 'Implementação modificada com sucesso!' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao modificar implementação', error });
    }
  };
  
  // Função para deletar uma implementação
  const removeImplementation = async (req, res) => {
    try {
      const { id } = req.params;
      await deleteImplementation(id);
      res.status(200).json({ message: 'Implementação deletada com sucesso!' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar implementação', error });
    }
  };
  
  // Função para buscar uma implementação específica por ID
  const fetchImplementationById = async (req, res) => {
    try {
      const { id } = req.params;
      const implementation = await getImplementationById(id);
  
      if (!implementation) {
        return res.status(404).json({ message: 'Implementação não encontrada' });
      }
  
      res.status(200).json(implementation);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar implementação específica', error });
    }
  };
  
  // Função para buscar uma implementação por linha e coluna
  const fetchImplementationByPosition = async (req, res) => {
    try {
      const { row, col } = req.params;
      const implementation = await getImplementationByPosition(row, col);
  
      if (!implementation) {
        return res.status(404).json({ message: 'Implementação não encontrada para a posição fornecida' });
      }
  
      res.status(200).json(implementation);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar implementação por posição', error });
    }
  };
  
  // Função para modificar apenas a posição de uma implementação
  const modifyImplementationPosition = async (req, res) => {
    try {
      const { id } = req.params;
      const { posicao_linha, posicao_coluna } = req.body;
      await updateImplementationPosition(id, posicao_linha, posicao_coluna);
      res.status(200).json({ message: 'Posição da implementação modificada com sucesso!' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao modificar posição da implementação', error });
    }
  };
  
  // Exporta as funções
  module.exports = {
    fetchImplementations,
    addImplementation,
    modifyImplementation,
    removeImplementation,
    fetchImplementationById,
    fetchImplementationByPosition,
    modifyImplementationPosition,
    fetchImplementationNamesAndIds
  };
  