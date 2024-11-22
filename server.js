const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer'); // Importando multer para upload de arquivos
const iconRoutes = require('./routes/icons');
const mosaicRoutes = require('./routes/mosaic');
const implementationRoutes = require('./routes/implementation'); // Importa as rotas de implementation
dotenv.config();
const app = express();

// Middleware para CORS
app.use(cors());

// Middleware para JSON
app.use(express.json());

// Configuração do multer para lidar com o upload de arquivos
const storage = multer.memoryStorage(); // Armazena o arquivo em memória como Buffer
const upload = multer({ storage });

// Rota para ícones (usando o multer para uploads)
app.use('/api/icons', upload.single('src'), iconRoutes);
app.use('/api/mosaics',mosaicRoutes);
app.use('/api/implementations', implementationRoutes); // Adiciona a rota para implementações
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
