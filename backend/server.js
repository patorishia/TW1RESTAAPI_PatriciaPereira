const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Configura dotenv para carregar o .env da pasta backend
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const alunoRoutes = require('./routes/alunoRoutes');
const cursoRoutes = require('./routes/cursoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Serve ficheiros estáticos do frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rotas
app.use('/api/alunos', alunoRoutes);
app.use('/api/cursos', cursoRoutes);

// Conexão MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado ao MongoDB Atlas'))
  .catch(err => console.error('Erro MongoDB:', err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
