import notesData from './data.js';

function formatDate(dateString) {
  const dateObject = new Date(dateString);

  if (isNaN(dateObject.getTime())) {
    console.error("Error: Invalid date string. Could not create Date object.");
    return "Invalid Date";
  }

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  
  return dateObject.toLocaleDateString('id-ID', options);
}

const noteListEl = document.querySelector('#note-list');

const templateNoteItem = (note) => `
  <div class="note-item">
    <h3>${note.title}</h3>
    <p>${note.body}</p>
    <p>Dibuat pada: ${formatDate(note.createdAt)}</p>
  </div>
`;

noteListEl.innerHTML = '';

notesData.forEach((note) => {
  noteListEl.innerHTML += templateNoteItem(note);
});

const noteForm = document.getElementById('note-form');

noteForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('note-title').value;
  const body = document.getElementById('note-body').value;
  const createdAt = new Date();

  const newNote = {
    title,
    body,
    createdAt
  };

  notesData.push(newNote);

  // Render ulang daftar catatan
  noteListEl.innerHTML = '';
  notesData.forEach((note) => {
    noteListEl.innerHTML += templateNoteItem(note);
  });

  // Kosongkan formulir
  document.getElementById('note-title').value = '';
  document.getElementById('note-body').value = '';
});