// backend/routes/mosaic.js
const express = require('express');
const {
  fetchMosaics,
  addMosaic,
  modifyMosaic,
  removeMosaic,
  fetchMosaicById,
} = require('../controllers/mosaicController');

const router = express.Router();

// Rota para buscar todos os mosaicos
router.get('/', fetchMosaics);

// Rota para adicionar um mosaico
router.post('/add', addMosaic);

// Rota para modificar um mosaico
router.put('/modify', modifyMosaic); // Use PUT para modificar

// Rota para deletar um mosaico
router.delete('/delete/:id_implem', removeMosaic); // Use DELETE para remover

// Rota para buscar um mosaico específico por ID
router.get('/:id_implem', fetchMosaicById); // Nova rota para buscar mosaico específico

module.exports = router;
