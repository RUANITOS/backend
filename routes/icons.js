// backend/routes/iconRoutes.js
const express = require('express');
const { fetchIcons, addIcon, modifyIcon, removeIcon,fetchIconIds, fetchIconById, fetchIconsByImplementation  } = require('../controllers/iconController');

const router = express.Router();

// Rota para buscar todos os ícones
router.get('/', fetchIcons); 

// Rota para adicionar um ícone
router.post('/add', addIcon); 

// Rota para modificar um ícone
router.put('/modify', modifyIcon); // Use PUT para modificar

// Rota para buscar todos os IDs de ícones
router.get('/ids', fetchIconIds); // Nova rota para buscar IDs

// Rota para deletar um ícone
router.delete('/delete/:icon_id', removeIcon); // Use DELETE para remover

// Rota para buscar um ícone específico por ID
router.get('/:icon_id', fetchIconById); // Nova rota para buscar ícone específico

router.get('/implementation/:id_implementacao', fetchIconsByImplementation);

module.exports = router;
