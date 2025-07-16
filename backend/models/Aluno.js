const mongoose = require('mongoose');

const AlunoSchema = new mongoose.Schema({
    nome: String,
    apelido: String,
    curso: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso', required: true },
    anoCurricular: Number
});


module.exports = mongoose.model('Aluno', AlunoSchema);
