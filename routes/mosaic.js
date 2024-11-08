const express = require('express');
const {
  fetchMosaics,
  addMosaic,
  modifyMosaic,
  removeMosaic,
  fetchMosaicById,
  fetchMosaicByPosition, // Importa a função para busca por posição
  modifyMosaicPosition
} = require('../controllers/mosaicController');

const router = express.Router();

// Rota para buscar todos os mosaicos
router.get('/', fetchMosaics);

// Rota para adicionar um mosaico
router.post('/add', addMosaic);

// Rota para modificar um mosaico
router.put('/modify/:id', modifyMosaic);

// Rota para deletar um mosaico
router.delete('/delete/:id', removeMosaic);

// Rota para buscar um mosaico específico por ID
router.get('/:id', fetchMosaicById);

// Rota para buscar um mosaico por linha e coluna
router.get('/position/:row/:col', fetchMosaicByPosition);
// Rota para modificar apenas a posição de um mosaico
router.put('/modify-position/:id', modifyMosaicPosition);

module.exports = router;
