const Aluno = require('../models/Aluno');

// GET todos os alunos
exports.getAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET aluno por ID
exports.getAlunoById = async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST criar aluno
exports.createAluno = async (req, res) => {
  try {
    const novoAluno = new Aluno(req.body);
    const savedAluno = await novoAluno.save();
    res.status(201).json(savedAluno);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT atualizar aluno
exports.updateAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE aluno
exports.deleteAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
    res.json({ message: 'Aluno removido' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
