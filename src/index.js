import './components/app-header.js';
import './components/app-footer.js';
import './components/note-list.js';
import './components/archived-note-list.js';
import './components/loading-indicator.js';
import './styles.css';

const API_BASE_URL = 'https://notes-api.dicoding.dev/v2';
const loadingIndicator = document.querySelector("loading-indicator");

async function fetchNotes() {
    if (loadingIndicator) loadingIndicator.show();

    try {
        const response = await fetch(`${API_BASE_URL}/notes`);
        const result = await response.json();

        if (result.status === "success") {
            const noteListEl = document.querySelector("note-list");

            if (!noteListEl) {
                console.error("Elemen 'note-list' tidak ditemukan!");
                return;
            }

            noteListEl.notesData = result.data;
        } else {
            console.error("Gagal mengambil catatan:", result.message);
        }
    } catch (error) {
        console.error("Error fetching notes:", error);
    } finally {
        if (loadingIndicator) loadingIndicator.hide();
    }
}

async function fetchArchivedNotes() {
    if (loadingIndicator) loadingIndicator.show();

    try {
        const response = await fetch(`${API_BASE_URL}/notes/archived`);
        const result = await response.json();

        if (result.status === "success") {
            const archivedListEl = document.querySelector("archived-note-list");

            if (!archivedListEl) {
                console.error("Elemen 'archived-note-list' tidak ditemukan!");
                return;
            }

            archivedListEl.notesData = result.data;
        } else {
            console.error("Gagal mengambil catatan arsip:", result.message);
        }
    } catch (error) {
        console.error("Error fetching archived notes:", error);
    } finally {
        if (loadingIndicator) loadingIndicator.hide();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchNotes();
    fetchArchivedNotes();
});

const noteForm = document.getElementById('note-form');
const titleInput = document.getElementById('note-title');
const bodyInput = document.getElementById('note-body');

noteForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!titleInput.validity.valid || !bodyInput.validity.valid) {
        return;
    }

    const newNote = {
        title: titleInput.value,
        body: bodyInput.value,
    };

    if (loadingIndicator) loadingIndicator.show();

    try {
        const response = await fetch(`${API_BASE_URL}/notes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newNote),
        });

        const result = await response.json();

        if (result.status === 'success') {
            fetchNotes();
            titleInput.value = '';
            bodyInput.value = '';
        } else {
            console.error('Gagal menambahkan catatan:', result.message);
        }
    } catch (error) {
        console.error('Error adding note:', error);
    } finally {
        if (loadingIndicator) loadingIndicator.hide();
    }
});

async function archiveNote(noteId) {
    if (loadingIndicator) loadingIndicator.show();

    try {
        const response = await fetch(`${API_BASE_URL}/notes/${noteId}/archive`, {
            method: "POST",
        });

        const result = await response.json();
        if (result.status === "success") {
            fetchNotes();
            fetchArchivedNotes();
        } else {
            Swal.fire("Error", "Gagal mengarsipkan catatan: " + result.message, "error");
            console.error("Gagal mengarsipkan catatan:", result.message);
        }
    } catch (error) {
        Swal.fire("Error", "Terjadi kesalahan saat mengarsipkan catatan!", "error");
        console.error("Error archiving note:", error);
    } finally {
        if (loadingIndicator) loadingIndicator.hide();
    }
}

async function unarchiveNote(noteId) {
    if (loadingIndicator) loadingIndicator.show();

    try {
        const response = await fetch(`${API_BASE_URL}/notes/${noteId}/unarchive`, {
            method: "POST",
        });

        const result = await response.json();
        if (result.status === "success") {
            fetchNotes();
            fetchArchivedNotes();
        } else {
            console.error("Gagal mengembalikan catatan:", result.message);
        }
    } catch (error) {
        console.error("Error unarchiving note:", error);
    } finally {
        if (loadingIndicator) loadingIndicator.hide();
    }
}

async function deleteNote(noteId) {
    if (loadingIndicator) loadingIndicator.show();

    try {
        const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
            method: "DELETE",
        });

        const result = await response.json();
        if (result.status === "success") {
            fetchNotes();
            fetchArchivedNotes();
        } else {
            Swal.fire("Error", "Gagal menghapus catatan: " + result.message, "error");
            console.error("Gagal menghapus catatan:", result.message);
        }
    } catch (error) {
        Swal.fire("Error", "Terjadi kesalahan saat menghapus catatan!", "error");
        console.error("Error deleting note:", error);
    } finally {
        if (loadingIndicator) loadingIndicator.hide();
    }
}

document.addEventListener("archive-note", async (event) => {
    const noteId = event.detail;
    await archiveNote(noteId);
});

document.addEventListener("unarchive-note", async (event) => {
    const noteId = event.detail;
    await unarchiveNote(noteId);
});
document.addEventListener("restore-note", async (event) => {
  const noteId = event.detail;

  // Panggil API untuk mengembalikan catatan ke daftar aktif
  await unarchiveNote(noteId);

  // Refresh data setelah perubahan
  fetchNotes();
  fetchArchivedNotes();
});


document.addEventListener("delete-note", async (event) => {
    const noteId = event.detail;
    await deleteNote(noteId);
});
