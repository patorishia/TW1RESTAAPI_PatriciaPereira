const Curso = require('../models/Curso');

// GET todos os cursos
exports.getCursos = async (req, res) => {
  try {
    const cursos = await Curso.find();
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST criar curso (opcional)
exports.createCurso = async (req, res) => {
  try {
    const novoCurso = new Curso(req.body);
    const savedCurso = await novoCurso.save();
    res.status(201).json(savedCurso);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
