import Swal from "sweetalert2";
import gsap from "gsap";

class NoteList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._notesData = [];
        this._isArchive = false;
    }

    set notesData(data) {
        this._notesData = Array.isArray(data) ? data : [];
        this.render();
    }

    set isArchive(value) {
        this._isArchive = value;
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
                .note-card {
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
                .delete-btn {
                    background: red;
                    color: white;
                }
                .archive-btn {
                    background: orange;
                    color: white;
                }
                .restore-btn {
                    background: green;
                    color: white;
                }
            </style>
            <div class="note-container">
                ${this._notesData.length === 0 ? "<p>Tidak ada catatan.</p>" : ""}
                ${this._notesData
                    .map(
                        (note) => `
                    <div class="note-card">
                        <div class="note-title">${note.title}</div>
                        <p>${note.body}</p>
                        <p><small>${new Date(note.createdAt).toLocaleString()}</small></p>
                        <div class="btn-group">
                            <button class="btn delete-btn" data-id="${note.id}">Hapus</button>
                            ${
                                this._isArchive
                                    ? `<button class="btn restore-btn" data-id="${note.id}">Pulihkan</button>`
                                    : `<button class="btn archive-btn" data-id="${note.id}">Arsip</button>`
                            }
                        </div>
                    </div>
                `
                    )
                    .join("")}
            </div>
        `;

        gsap.to(this.shadowRoot.querySelectorAll(".note-card"), {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
        });

        this.shadowRoot.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", (e) => this.confirmDelete(e.target.dataset.id));
        });

        this.shadowRoot.querySelectorAll(".archive-btn").forEach((button) => {
            button.addEventListener("click", (e) => this.confirmArchive(e.target.dataset.id));
        });

        this.shadowRoot.querySelectorAll(".restore-btn").forEach((button) => {
            button.addEventListener("click", (e) => this.confirmRestore(e.target.dataset.id));
        });
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
                document.dispatchEvent(new CustomEvent("delete-note", { detail: noteId }));
            }
        });
    }

    confirmArchive(noteId) {
        document.dispatchEvent(new CustomEvent("archive-note", { detail: noteId }));
    }

    confirmRestore(noteId) {
        document.dispatchEvent(new CustomEvent("restore-note", { detail: noteId }));
    }
}

customElements.define("note-list", NoteList);
