const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer'); // Importando multer para upload de arquivos
const iconRoutes = require('./routes/icons');
const mosaicRoutes = require('./routes/mosaic');
const implementationRoutes = require('./routes/implementation'); // Importa as rotas de implementações
const userRoutes = require('./routes/user'); // Importa as rotas de usuários

dotenv.config();
const app = express();

// Middleware para habilitar CORS
app.use(cors());

// Middleware para analisar JSON
app.use(express.json());

// Configuração do multer para lidar com uploads de arquivos
const storage = multer.memoryStorage(); // Armazena arquivos na memória
const upload = multer({ storage }); // Configuração de upload com o multer

// Rotas configuradas
app.use('/api/icons', upload.single('src'), iconRoutes); // Rota para ícones com suporte a uploads
app.use('/api/mosaics', mosaicRoutes); // Rota para mosaicos
app.use('/api/implementations', implementationRoutes); // Rota para implementações
app.use('/api/users', userRoutes); // Rota para usuários

// Porta do servidor
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
