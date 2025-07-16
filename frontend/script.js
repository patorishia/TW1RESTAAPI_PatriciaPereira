// JS para operações CRUD com Fetch API

const API_URL = 'http://localhost:3001/api/alunos';

document.addEventListener('DOMContentLoaded', () => {
  fetchAlunos();

  document.getElementById('aluno-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const apelido = document.getElementById('apelido').value;
    const curso = document.getElementById('curso').value;
    const anoCurricular = document.getElementById('anoCurricular').value;

    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, apelido, curso, anoCurricular })
    });

    e.target.reset();
    fetchAlunos();
  });
});

async function fetchAlunos() {
  const res = await fetch(API_URL);
  const alunos = await res.json();

  const tbody = document.getElementById('alunos-body');
  tbody.innerHTML = '';

  alunos.forEach(aluno => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.apelido}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.anoCurricular}</td>
      <td class="actions">
        <button class="edit" onclick="editarAluno('${aluno._id}')">Editar</button>
        <button class="delete" onclick="apagarAluno('${aluno._id}')">Apagar</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

async function apagarAluno(id) {
  if (confirm('Tem certeza que deseja apagar este aluno?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchAlunos();
  }
}

async function editarAluno(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const aluno = await res.json();

  const nome = prompt('Nome:', aluno.nome);
  const apelido = prompt('Apelido:', aluno.apelido);
  const curso = prompt('Curso:', aluno.curso);
  const anoCurricular = prompt('Ano Curricular:', aluno.anoCurricular);

  if (nome && apelido && curso && anoCurricular) {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, apelido, curso, anoCurricular })
    });
    fetchAlunos();
  }
}
