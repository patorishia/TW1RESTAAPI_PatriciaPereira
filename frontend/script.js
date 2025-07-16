// JS para operações CRUD com Fetch API


const API_URL_CURSOS = 'http://localhost:3001/api/cursos';

document.addEventListener('DOMContentLoaded', () => {
  carregarCursos();  // carregar cursos no dropdown
  fetchAlunos();

  document.getElementById('aluno-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const apelido = document.getElementById('apelido').value;
    const cursoId = document.getElementById('curso').value;  // id do curso selecionado
    const anoCurricular = Number(document.getElementById('anoCurricular').value);

    // Enviar o curso como ObjectId (id do curso)
    await fetch(API_URL_ALUNOS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, apelido, curso: cursoId, anoCurricular })
    });

    e.target.reset();
    fetchAlunos();
  });
});

async function carregarCursos() {
  const res = await fetch(API_URL_CURSOS);
  const cursos = await res.json();

  const select = document.getElementById('curso');
  select.innerHTML = '<option value="">Seleciona o curso</option>';

  cursos.forEach(curso => {
    const option = document.createElement('option');
    option.value = curso._id;               // id do curso
    option.textContent = curso.nomeDoCurso; // nome para exibir
    select.appendChild(option);
  });
}

async function fetchAlunos() {
  const res = await fetch(API_URL_ALUNOS);
  const alunos = await res.json();

  const tbody = document.getElementById('alunos-body');
  tbody.innerHTML = '';

  alunos.forEach(aluno => {
    const tr = document.createElement('tr');

    // Mostrar o nome do curso (assumindo que o backend já popula o curso com nome)
    const nomeCurso = aluno.curso?.nomeDoCurso || aluno.curso || 'Desconhecido';

    tr.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.apelido}</td>
      <td>${nomeCurso}</td>
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
    await fetch(`${API_URL_ALUNOS}/${id}`, { method: 'DELETE' });
    fetchAlunos();
  }
}

async function editarAluno(id) {
  const res = await fetch(`${API_URL_ALUNOS}/${id}`);
  const aluno = await res.json();

  const nome = prompt('Nome:', aluno.nome);
  const apelido = prompt('Apelido:', aluno.apelido);

  // Aqui poderíamos melhorar para editar também o curso via dropdown, mas para simplificar:
  const anoCurricular = prompt('Ano Curricular:', aluno.anoCurricular);

  if (nome && apelido && anoCurricular) {
    await fetch(`${API_URL_ALUNOS}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, apelido, curso: aluno.curso, anoCurricular: Number(anoCurricular) })
    });
    fetchAlunos();
  }
}
