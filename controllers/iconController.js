// backend/controllers/iconController.js
const { insertIcon, getIcons, updateIcon, deleteIcon, getIconIds,getIconById  } = require('../models/iconModel');

// Função para buscar todos os ícones do banco de dados
const fetchIcons = async (req, res) => {
  try {
    const icons = await getIcons();
    res.status(200).json(icons);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar ícones', error });
  }
};

// Função para buscar apenas os IDs dos ícones do banco de dados
const fetchIconIds = async (req, res) => {
  try {
    const ids = await getIconIds();
    res.status(200).json(ids);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar IDs dos ícones', error });
  }
};

// Função para adicionar um ícone ao banco de dados
const addIcon = async (req, res) => {
  try {
    if (!req.file || !req.body.icon_id) {
      return res.status(400).json({ message: 'ID do ícone ou imagem ausentes' });
    }

    const iconData = {
      id: req.body.icon_id,
      src: req.file.buffer, // O arquivo é tratado como BLOB
      id_implementacao: req.body.id_implementacao,
      descricao: req.body.descricao
    };

    await insertIcon(iconData);
    res.status(201).json({ message: 'Ícone adicionado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar ícone', error });
  }
};

// Função para atualizar um ícone existente
const updateIconData = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID do ícone é necessário' });
    }

    const iconData = {
      id: req.params.id,
      src: req.file ? req.file.buffer : null,
      id_implementacao: req.body.id_implementacao || null,
      descricao: req.body.descricao || null
    };

    const result = await updateIcon(iconData);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Ícone atualizado com sucesso!' });
    } else {
      res.status(404).json({ message: 'Ícone não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar ícone', error });
  }
};

// Função para deletar um ícone pelo ID
const deleteIconData = async (req, res) => {
  try {
    const icon_id = req.params.id;
    const result = await deleteIcon(icon_id);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Ícone deletado com sucesso!' });
    } else {
      res.status(404).json({ message: 'Ícone não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar ícone', error });
  }
};
// Função para buscar um ícone específico pelo ID
const fetchIconById = async (req, res) => {
  try {
    const iconId = req.params.id;
    const icon = await getIconById(iconId);

    if (icon) {
      res.status(200).json(icon);
    } else {
      res.status(404).json({ message: 'Ícone não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar o ícone:', error); // Adicione um log para depuração
    res.status(500).json({ message: 'Erro ao buscar o ícone', error });
  }
};


// Exporta as funções
module.exports = {
  fetchIcons,
  addIcon,
  updateIconData,
  deleteIconData,
  fetchIconIds,
  fetchIconById
};
