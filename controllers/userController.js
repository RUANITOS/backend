const {
    insertUser,
    getUsers,
    updateUser,
    deleteUser,
    getUserById,
    verifyCredentials
} = require('../models/userModel');

// Função para verificar login
const verifyUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await verifyCredentials(username, password);
  
      if (!user) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos' });
      }
  
      res.status(200).json({ message: 'Login bem-sucedido', user });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao verificar login', error });
    }
  };
// Função para buscar todos os usuários do banco de dados
const fetchUsers = async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ message: "Erro ao buscar usuários", error });
    }
};

// Função para adicionar um usuário ao banco de dados a partir do formulário
const addUser = async (req, res) => {
    try {
        const userData = {
            id_implem: req.body.id_implem,
            nome: req.body.nome,
            email: req.body.email,
            privilegios: req.body.privilegios,
            senha: req.body.senha,
        };

        await insertUser(userData);
        res.status(201).json({ message: 'Usuário adicionado com sucesso!' });
    } catch (error) {
        console.error("Erro ao adicionar usuário:", error);
        res.status(500).json({ message: 'Erro ao adicionar usuário', error });
    }
};

// Função para atualizar um usuário
const modifyUser = async (req, res) => {
    try {
        const { id_user } = req.params;
        const userData = {
            id_user,
            nome: req.body.nome,
            email: req.body.email,
            privilegios: req.body.privilegios,
            senha: req.body.senha,
        };

        const rowsAffected = await updateUser(userData);

        if (rowsAffected === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado para atualização' });
        }

        res.status(200).json({ message: 'Usuário modificado com sucesso!' });
    } catch (error) {
        console.error("Erro ao modificar usuário:", error);
        res.status(500).json({ message: 'Erro ao modificar usuário', error });
    }
};

// Função para deletar um usuário
const removeUser = async (req, res) => {
    try {
        const { id_user } = req.params;

        const rowsAffected = await deleteUser(id_user);

        if (rowsAffected === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado para exclusão' });
        }

        res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(500).json({ message: 'Erro ao deletar usuário', error });
    }
};

// Função para buscar um usuário específico por ID
const fetchUserById = async (req, res) => {
    try {
        const { id_user } = req.params;
        const user = await getUserById(id_user);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Erro ao buscar usuário específico:", error);
        res.status(500).json({ message: 'Erro ao buscar usuário específico', error });
    }
};

module.exports = {
    fetchUsers,
    addUser,
    modifyUser,
    removeUser,
    fetchUserById,
    verifyUser
};
