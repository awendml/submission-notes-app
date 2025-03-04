class LoadingIndicator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .loading-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    visibility: hidden;
                }
                .loading {
                    width: 50px;
                    height: 50px;
                    border: 5px solid white;
                    border-top: 5px solid #3498db;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .show {
                    visibility: visible;
                }
            </style>
            <div class="loading-container">
                <div class="loading"></div>
            </div>
        `;
    }

    show() {
        this.shadowRoot.querySelector(".loading-container").classList.add("show");
    }

    hide() {
        this.shadowRoot.querySelector(".loading-container").classList.remove("show");
    }
}

customElements.define("loading-indicator", LoadingIndicator);
