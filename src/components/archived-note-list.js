import Swal from "sweetalert2";
import gsap from "gsap";

class ArchivedNoteList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._notes = [];
    }

    set notesData(notes) {
        this._notes = Array.isArray(notes) ? notes : [];
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .note-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 15px;
                    padding: 10px;
                }
                .note-item {
                    background: #fff;
                    padding: 15px;
                    border-radius: 8px;
                    box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
                    width: 250px;
                    opacity: 0;
                    transform: scale(0.9);
                }
                .note-title {
                    font-weight: bold;
                    color: #0645AD;
                }
                .btn-group {
                    margin-top: 10px;
                    display: flex;
                    gap: 5px;
                }
                .btn {
                    padding: 8px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .restore-btn {
                    background: green;
                    color: white;
                }
                .delete-btn {
                    background: red;
                    color: white;
                }
                .empty-message {
                    font-style: italic;
                    color: gray;
                }
            </style>
            <div class="note-container">
                ${this._notes.length === 0 ? "<p class='empty-message'>Tidak ada catatan arsip.</p>" : ""}
                ${this._notes.map(note => `
                    <div class="note-item" data-id="${note.id}">
                        <div class="note-title">${note.title}</div>
                        <p>${note.body}</p>
                        <p><small>${new Date(note.createdAt).toLocaleString()}</small></p>
                        <div class="btn-group">
                            <button class="btn restore-btn">Kembalikan</button>
                            <button class="btn delete-btn">Hapus</button>
                        </div>
                    </div>
                `).join("")}
            </div>
        `;

        // Animasi GSAP
        gsap.to(this.shadowRoot.querySelectorAll(".note-item"), {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
        });

        // Event Delegation: Tambahkan event listener ke parent (note-container)
        this.shadowRoot.querySelector(".note-container").addEventListener("click", (e) => {
            const noteItem = e.target.closest(".note-item");
            if (!noteItem) return;

            const noteId = noteItem.dataset.id; // Gunakan string langsung
            if (!noteId) {
                console.error("Error: Note ID is invalid", noteId);
                return;
            }

            if (e.target.classList.contains("restore-btn")) {
                this.restoreNote(noteId);
            } else if (e.target.classList.contains("delete-btn")) {
                this.confirmDelete(noteId);
            }
        });
    }

    restoreNote(noteId) {
        this.dispatchEvent(new CustomEvent("restore-note", {
            detail: noteId,
            bubbles: true,
            composed: true
        }));
    }

    confirmDelete(noteId) {
        Swal.fire({
            title: "Hapus catatan ini?",
            text: "Catatan akan dihapus permanen.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                this.dispatchEvent(new CustomEvent("delete-note", {
                    detail: noteId,
                    bubbles: true,
                    composed: true
                }));
            }
        });
    }
}

customElements.define("archived-note-list", ArchivedNoteList);
