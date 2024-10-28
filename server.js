const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer'); // Importando multer para upload de arquivos
const iconRoutes = require('./routes/icons');

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
