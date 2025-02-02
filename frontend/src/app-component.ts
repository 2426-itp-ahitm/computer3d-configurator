import { html, render } from "lit-html";
import "./feature/cpu/cpu-component";
import "./feature/motherboard/mb-component";

const cpuContent = html`
    <h3 class="headerTitle">CPUs</h3>
    <cpu-component id="cpuAllBox"></cpu-component>
`;

const mbContent = html`
    <h3 class="headerTitle">Motherboards</h3>
    <mb-component id="mbAllBox"></mb-component>
`;

class AppComponent extends HTMLElement {
    showCPUs = true;

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    // Methode, um zwischen den Tabs zu wechseln
    switchTab(showCPUs) {
        this.showCPUs = showCPUs;
        this.render();
    }

    render() {
        const content = this.showCPUs ? cpuContent : mbContent;
        render(html`
            <div> 
                <!-- Navbar aus index.html -->
                <div class="navbar">
                <button @click="${() => this.switchTab(true)}" class="tab-button cpu">CPUs</button>
                <button @click="${() => this.switchTab(false)}" class="tab-button mb">Motherboards</button>
                    <input type="checkbox" id="active">
                    <label for="active" class="menu-btn"><span></span></label>
                    <label for="active" class="close"></label>
                    <div class="wrapper">
                        <ul>
                            <div class="components-list">
                                <h3 style="font-size: 1.5vw;">Deine Komponenten</h3>
                                <p id="cpu-name">CPU: Keine Vorhanden</p>
                                <p id="mb-name">Motherboard: Keines Vorhanden</p>
                            </div>
                        </ul>
                    </div>
                    <!-- Umschaltbare Tabs -->
                </div>
                ${content}
            </div>
        `, this);
    }
}

// Registriere das Custom Element
customElements.define("app-component", AppComponent);
