class AppHeader extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
        <style>
          .wrapper {
            max-width: 960px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
          }
        </style>
        <div class="wrapper">
          <h1>Aplikasi Catatan</h1>
        </div>
      `;
    }
}

customElements.define('app-header', AppHeader);