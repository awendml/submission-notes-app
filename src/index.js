import notesData from './data.js';
import './components/app-header.js';
import './components/app-footer.js';
import './components/note-list.js';

function formatDate(dateString) {
  const dateObject = new Date(dateString);

  if (isNaN(dateObject.getTime())) {
    console.error("Error: Invalid date string. Could not create Date object.");
    return "Invalid Date";
  }

  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  return dateObject.toLocaleDateString('id-ID', options);
}

// Ambil elemen note-list
const noteListEl = document.querySelector('note-list');

// Inisialisasi custom element note-list dengan data awal
noteListEl.notesData = notesData;

// Form dan input
const noteForm = document.getElementById('note-form');
const titleInput = document.getElementById('note-title');
const bodyInput = document.getElementById('note-body');

noteForm.addEventListener('submit', (event) => event.preventDefault());

const customValidationTitleHandler = (event) => {
  event.target.setCustomValidity('');

  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity('Wajib diisi.');
  } else if (event.target.validity.tooShort) {
    event.target.setCustomValidity('Minimal panjang adalah lima karakter.');
  } else if (event.target.validity.patternMismatch) {
    event.target.setCustomValidity(
      'Tidak boleh diawali dengan simbol, mengandung white space atau spasi, dan mengandung karakter spesial seperti dolar ($).'
    );
  }
};

const customValidationBodyHandler = (event) => {
  event.target.setCustomValidity('');

  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity('Wajib diisi.');
  } else if (event.target.validity.tooShort) {
    event.target.setCustomValidity('Minimal panjang adalah 10 karakter.');
  }
};

const validateField = (event) => {
  const isValid = event.target.validity.valid;
  const errorMessage = event.target.validationMessage;

  const connectedValidationId = event.target.getAttribute('aria-describedby');
  const connectedValidationEl = connectedValidationId
    ? document.getElementById(connectedValidationId)
    : null;

  if (connectedValidationEl) {
    connectedValidationEl.textContent = isValid ? '' : errorMessage;
  }
};

titleInput.addEventListener('change', customValidationTitleHandler);
titleInput.addEventListener('invalid', customValidationTitleHandler);
titleInput.addEventListener('blur', validateField);

bodyInput.addEventListener('change', customValidationBodyHandler);
bodyInput.addEventListener('invalid', customValidationBodyHandler);
bodyInput.addEventListener('blur', validateField);

noteForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Validasi form sebelum submit
  if (!titleInput.validity.valid || !bodyInput.validity.valid) {
    return;
  }

  // Ambil data dari form
  const title = document.getElementById('note-title').value;
  const body = document.getElementById('note-body').value;
  const createdAt = new Date();

  const newNote = {
    title,
    body,
    createdAt
  };
  notesData.push(newNote);

  // Perbarui data pada note-list
  noteListEl.notesData = notesData;

  // Kosongkan form
  document.getElementById('note-title').value = '';
  document.getElementById('note-body').value = '';
});
