// backend/controllers/userController.js
const {
    insertUser,
    getUsers,
    updateUser,
    deleteUser,
    getUserById,
    getUserByEmail,
    updateUserPosition
} = require('../models/userModel');

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
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            idade: req.body.idade,
            endereco: req.body.endereco
        };

        await insertUser(userData);
        res.status(201).json({ message: 'Usuário adicionado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar usuário', error });
    }
};

// Função para atualizar um usuário
const modifyUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            idade: req.body.idade,
            endereco: req.body.endereco
        };

        await updateUser({ ...userData, id });
        res.status(200).json({ message: 'Usuário modificado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao modificar usuário', error });
    }
};

// Função para deletar um usuário
const removeUser = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteUser(id);
        res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar usuário', error });
    }
};

// Função para buscar um usuário específico por ID
const fetchUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuário específico', error });
    }
};

// Função para buscar um usuário por email
const fetchUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado para o email fornecido' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuário por email', error });
    }
};

// Função para modificar a posição (ou outro atributo) de um usuário
const modifyUserPosition = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, endereco } = req.body;
        await updateUserPosition(id, nome, endereco);
        res.status(200).json({ message: 'Posição (ou outro atributo) do usuário modificada com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao modificar atributos do usuário', error });
    }
};

// Exporta as funções
module.exports = {
    fetchUsers,
    addUser,
    modifyUser,
    removeUser,
    fetchUserById,
    fetchUserByEmail,
    modifyUserPosition
};
