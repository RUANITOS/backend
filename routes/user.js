const express = require('express');
const {
  fetchUsers,
  addUser,
  modifyUser,
  removeUser,
  fetchUserById,
  verifyUser
} = require('../controllers/userController');

const router = express.Router();

// Rota para buscar todos os usuários
router.get('/', fetchUsers);

// Rota para adicionar um usuário
router.post('/add', addUser);

// Rota para modificar um usuário
router.put('/modify/:id_user', modifyUser);

// Rota para deletar um usuário
router.delete('/delete/:id_user', removeUser);

// Rota para buscar um usuário específico por ID
router.get('/:id_user', fetchUserById);

router.post('/login', verifyUser);

module.exports = router;
