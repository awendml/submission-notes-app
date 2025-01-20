class NoteItem extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'body', 'createdat'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    render() {
        const title = this.getAttribute('title') || '';
        const body = this.getAttribute('body') || '';
        const createdAt = new Date(this.getAttribute('createdat') || Date.now());

        this.shadowRoot.innerHTML = `
        <style>
          .note-item {
            border: 1px solid #ccc;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .note-item h3 {
            margin: 0 0 10px;
          }
          .note-item p {
            margin: 5px 0;
          }
        </style>
        <div class="note-item">
          <h3>${title}</h3>
          <p>${body}</p>
          <p><small>Created at: ${createdAt.toLocaleDateString('id-ID')}</small></p>
        </div>
      `;
    }
}

customElements.define('note-item', NoteItem);
