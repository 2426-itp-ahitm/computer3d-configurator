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
    // Wir deklarieren die Eigenschaft showCPUs
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
                <button @click="${() => this.switchTab(true)}" class="tab-button cpu">CPUs</button>
                <button @click="${() => this.switchTab(false)}" class="tab-button mb">Motherboards</button>
                ${content}
            </div>
        `, this);
    }
}

// Registriere das Custom Element
customElements.define("app-component", AppComponent);
