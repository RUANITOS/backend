// backend/controllers/mosaicController.js
const {
    insertMosaic,
    getMosaics,
    updateMosaic,
    deleteMosaic,
    getMosaicById,
    getMosaicByPosition,
    updateMosaicPosition
} = require('../models/mosaicModel');

// Função para buscar todos os mosaicos do banco de dados
const fetchMosaics = async (req, res) => {
    try {
      const mosaics = await getMosaics();
      res.status(200).json(mosaics);
    } catch (error) {
      console.error("Erro ao buscar mosaicos:", error); // Log detalhado do erro
      res.status(500).json({ message: "Erro ao buscar mosaicos", error });
    }
  };

// Função para adicionar um mosaico ao banco de dados a partir do formulário
const addMosaic = async (req, res) => {
    try {
        const mosaicData = {
            id_implem: req.body.id_implem, // Inclui o id_implem
            posicao_linha: req.body.posicao_linha,
            posicao_coluna: req.body.posicao_coluna,
            titulo_celula: req.body.titulo_celula,
            id_icone: req.body.id_icone,
            descricao_completa: req.body.descricao_completa,
            descricao_resumida: req.body.descricao_resumida,
            conteudo_efetivo: req.body.conteudo_efetivo,
            origem_conteudo: req.body.origem_conteudo
        };

        await insertMosaic(mosaicData);
        res.status(201).json({ message: 'Mosaico adicionado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar mosaico', error });
    }
};

// Função para atualizar um mosaico
const modifyMosaic = async (req, res) => {
    try {
        const { id } = req.params;
        const mosaicData = {
            id_implem: req.body.id_implem, // Inclui o id_implem
            posicao_linha: req.body.posicao_linha,
            posicao_coluna: req.body.posicao_coluna,
            titulo_celula: req.body.titulo_celula,
            id_icone: req.body.id_icone,
            descricao_completa: req.body.descricao_completa,
            descricao_resumida: req.body.descricao_resumida,
            conteudo_efetivo: req.body.conteudo_efetivo,
            origem_conteudo: req.body.origem_conteudo
        };

        await updateMosaic({ ...mosaicData, id });
        res.status(200).json({ message: 'Mosaico modificado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao modificar mosaico', error });
    }
};

// Função para deletar um mosaico
const removeMosaic = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteMosaic(id);
        res.status(200).json({ message: 'Mosaico deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar mosaico', error });
    }
};

// Função para buscar um mosaico específico por ID
const fetchMosaicById = async (req, res) => {
    try {
        const { id } = req.params;
        const mosaic = await getMosaicById(id);

        if (!mosaic) {
            return res.status(404).json({ message: 'Mosaico não encontrado' });
        }

        res.status(200).json(mosaic);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar mosaico específico', error });
    }
};

// Função para buscar um mosaico por linha e coluna
const fetchMosaicByPosition = async (req, res) => {
    try {
        const { row, col } = req.params;
        const mosaic = await getMosaicByPosition(row, col);

        if (!mosaic) {
            return res.status(404).json({ message: 'Mosaico não encontrado para a posição fornecida' });
        }

        res.status(200).json(mosaic);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar mosaico por posição', error });
    }
};

// Função para modificar apenas a posição de um mosaico
const modifyMosaicPosition = async (req, res) => {
    try {
        const { id } = req.params;
        const { posicao_linha, posicao_coluna } = req.body;
        await updateMosaicPosition(id, posicao_linha, posicao_coluna);
        res.status(200).json({ message: 'Posição do mosaico modificada com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao modificar posição do mosaico', error });
    }
};

// Exporta as funções
module.exports = {
    fetchMosaics,
    addMosaic,
    modifyMosaic,
    removeMosaic,
    fetchMosaicById,
    fetchMosaicByPosition,
    modifyMosaicPosition
};
