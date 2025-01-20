class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.notesData = [];
  }

  set notesData(data) {
    this._notesData = data;
    this.render();
  }

  get notesData() {
    return this._notesData;
  }

  render() {
    const style = `
      <style>
        :host {
          display: block;
          padding: 20px;
          box-sizing: border-box;
        }
        .note-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        .note-item {
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 15px;
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .note-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .note-item h3 {
          margin: 0 0 10px 0;
          font-size: 1.2em;
          color: #007BFF;
        }
        .note-item p {
          margin: 5px 0;
          color: #666;
        }
      </style>
    `;

    const notes = this._notesData
      .map(
        (note) => `
        <div class="note-item">
          <h3>${note.title}</h3>
          <p>${note.body}</p>
          <p>Dibuat pada: ${new Date(note.createdAt).toLocaleDateString('id-ID')}</p>
        </div>
      `
      )
      .join('');

    this.shadowRoot.innerHTML = `
      ${style}
      <div class="note-list">
        ${notes}
      </div>
    `;
  }
}

customElements.define('note-list', NoteList);
