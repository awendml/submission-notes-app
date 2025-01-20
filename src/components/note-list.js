import notesData from '../data.js';

class NoteList extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        const noteItems = notesData.map(note => {
            const noteItem = document.createElement('note-item');
            noteItem.setAttribute('title', note.title);
            noteItem.setAttribute('body', note.body);
            return noteItem;
        });

        shadow.innerHTML = `
      <style>
        /* Add any styles for the note-list component here */
      </style>
      ${noteItems.join('')} 
    `;
    }
}

customElements.define('note-list', NoteList);