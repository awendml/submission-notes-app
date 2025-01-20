class AppFooter extends HTMLElement {
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
          <p>&copy; Awen 2025. <a href="https://awendml.netlify.app/">Kunjungi saya</a></p>
        </div>
      `;
    }
}

customElements.define('app-footer', AppFooter);