const express = require('express');
const {
  fetchUsers,
  addUser,
  modifyUser,
  removeUser,
  fetchUserById,
  fetchUserByEmail,
  modifyUserPosition
} = require('../controllers/userController');

const router = express.Router();

// Rota para buscar todos os usuários
router.get('/', fetchUsers);

// Rota para adicionar um usuário
router.post('/add', addUser);

// Rota para modificar um usuário
router.put('/modify/:id', modifyUser);

// Rota para deletar um usuário
router.delete('/delete/:id', removeUser);

// Rota para buscar um usuário específico por ID
router.get('/:id', fetchUserById);

// Rota para buscar um usuário por email
router.get('/email/:email', fetchUserByEmail);

// Rota para modificar a posição (ou outro atributo) de um usuário
router.put('/modify-position/:id', modifyUserPosition);

module.exports = router;
