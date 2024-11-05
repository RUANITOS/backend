// backend/controllers/iconController.js
const { insertIcon, getIcons, updateIcon, deleteIcon, getIconById } = require('../models/iconModel');

// Função para buscar todos os ícones do banco de dados
const fetchIcons = async (req, res) => {
  try {
    const icons = await getIcons();
    res.status(200).json(icons);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar ícones', error });
  }
};

// Função para adicionar um ícone ao banco de dados a partir do formulário
const addIcon = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhuma imagem enviada' });
    }

    const iconData = {
      id: req.body.icon_id,
      src: req.file.buffer,
      id_implementacao: req.body.id_implementacao || null,
      descricao: req.body.descricao || null,
    };

    await insertIcon(iconData);
    res.status(201).json({ message: 'Ícone adicionado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar ícone', error });
  }
};

// Função para atualizar um ícone
const modifyIcon = async (req, res) => {
  try {
    const iconData = {
      id: req.body.icon_id,
      src: req.file ? req.file.buffer : null, // Atualiza o src apenas se um novo arquivo for enviado
      id_implementacao: req.body.id_implementacao || null,
      descricao: req.body.descricao || null,
    };

    await updateIcon(iconData);
    res.status(200).json({ message: 'Ícone modificado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao modificar ícone', error });
  }
};

// Função para deletar um ícone
const removeIcon = async (req, res) => {
  try {
    const { icon_id } = req.params;
    await deleteIcon(icon_id);
    res.status(200).json({ message: 'Ícone deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar ícone', error });
  }
};

// Função para buscar todos os ícones do banco de dados (IDs e SRCs)
const fetchIconIds = async (req, res) => {
  try {
    const icons = await getIcons(); // Obter todos os ícones
    const iconData = icons.map(icon => ({
      id: icon.icon_id, // ID do ícone
      src: icon.src // SRC do ícone (não será mostrado no dropdown)
    })); 
    res.status(200).json(iconData); // Retornar IDs e SRCs
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar IDs de ícones', error });
  }
};

// Função para buscar um ícone específico por ID com todos os novos campos
const fetchIconById = async (req, res) => {
  try {
    const { icon_id } = req.params;
    const icon = await getIconById(icon_id);

    if (!icon) {
      return res.status(404).json({ message: 'Ícone não encontrado' });
    }

    res.status(200).json(icon);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar ícone específico', error });
  }
};

// Exporta as funções
module.exports = {
  fetchIcons,
  addIcon,
  modifyIcon,
  removeIcon,
  fetchIconIds,
  fetchIconById,
};
