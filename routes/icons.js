// backend/routes/iconRoutes.js
const express = require('express');
const multer = require('multer');
const { fetchIcons, addIcon, updateIconData, deleteIconData, fetchIconIds, fetchIconById } = require('../controllers/iconController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Armazena o arquivo em memória

// Rota para buscar todos os ícones
router.get('/', fetchIcons);

// Rota para adicionar um ícone
router.post('/add', upload.single('src'), addIcon); // Adiciona 'upload.single' na rota

// Rota para atualizar um ícone
router.put('/modify/:id', upload.single('src'), updateIconData);

// Rota para deletar um ícone
router.delete('/delete/:id', deleteIconData);

// Rota para buscar apenas os IDs dos ícones
router.get('/ids', fetchIconIds);

// Rota para buscar um ícone específico pelo ID
router.get('/:id', fetchIconById); // Nova rota para buscar um ícone

module.exports = router;
