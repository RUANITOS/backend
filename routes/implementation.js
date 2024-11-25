const express = require('express');
const {
  fetchImplementations,
  addImplementation,
  modifyImplementation,
  removeImplementation,
  fetchImplementationById,
  fetchImplementationByPosition, // Importa a função para busca por posição
  modifyImplementationPosition,
  fetchImplementationNamesAndIds 
} = require('../controllers/implementationController');

const router = express.Router();

// Rota para buscar todas as implementações
router.get('/', fetchImplementations);

// Rota para adicionar uma implementação
router.post('/add', addImplementation);

// Rota para modificar uma implementação
router.put('/modify/:id', modifyImplementation);

// Rota para deletar uma implementação
router.delete('/delete/:id', removeImplementation);

// Rota para buscar uma implementação específica por ID
router.get('/:id', fetchImplementationById);

// Rota para buscar uma implementação por linha e coluna
router.get('/position/:row/:col', fetchImplementationByPosition);

// Rota para modificar apenas a posição de uma implementação
router.put('/modify-position/:id', modifyImplementationPosition);

// Rota para buscar nomes e IDs das implementações
router.get('/namesandids/:id', fetchImplementationNamesAndIds);

module.exports = router;
