class NoteItem extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: "open" });
  }

  set note(note) {
      this._note = note;
      this.render();
  }

  handleDelete() {
      const event = new CustomEvent("delete-note", {
          detail: this._note.id,
          bubbles: true,
          composed: true,
      });
      this.dispatchEvent(event);
  }

  render() {
      this.shadowRoot.innerHTML = `
          <style>
              .note-item {
                  border: 1px solid #ccc;
                  padding: 10px;
                  margin: 5px 0;
                  border-radius: 5px;
                  position: relative;
              }
              h3 {
                  margin: 0;
              }
              p {
                  margin: 5px 0;
              }
              small {
                  color: gray;
              }
              .delete-btn {
                  position: absolute;
                  top: 5px;
                  right: 5px;
                  background: red;
                  color: white;
                  border: none;
                  padding: 5px;
                  cursor: pointer;
                  border-radius: 3px;
              }
          </style>
          <div class="note-item">
              <h3>${this._note.title}</h3>
              <p>${this._note.body}</p>
              <small>${new Date(this._note.createdAt).toLocaleString()}</small>
              <button class="delete-btn">Hapus</button>
          </div>
      `;

      this.shadowRoot.querySelector(".delete-btn").addEventListener("click", () => this.handleDelete());
  }
}

customElements.define("note-item", NoteItem);
