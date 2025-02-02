import { html, render } from "lit-html";
import "./feature/cpu/cpu-component";
import "./feature/motherboard/mb-component";
import "./feature/gpu/gpu-component";

const cpuContent = html`
    <h3 class="headerTitle">Wähle deine CPU aus</h3>
    <cpu-component id="cpuAllBox"></cpu-component>
`;

const mbContent = html`
    <h3 class="headerTitle">Wähle dein Motherboard aus</h3>
    <mb-component id="mbAllBox"></mb-component>
`;

const gpuContent = html`
    <h3 class="headerTitle">Wähle deine GPU aus</h3>
    <gpu-component id="gpuAllBox"></gpu-component>
`;
class AppComponent extends HTMLElement {
    showCPUs = true;
    showMotherboards = false;
    showGPUs = false;

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    // Methode, um zwischen den Tabs zu wechseln
    switchTab(tab) {
        this.showCPUs = tab === 'cpu';
        this.showMotherboards = tab === 'motherboard';
        this.showGPUs = tab === 'gpu';
        this.render();
    }

    render() {
        const content = this.showCPUs ? cpuContent : (this.showMotherboards ? mbContent : gpuContent);

        render(html`
            <div> 
                <!-- Navbar aus index.html -->
                <div class="navbar">
                    <button 
                        @click="${() => this.switchTab('cpu')}" 
                        class="tab-button ${this.showCPUs ? 'active' : ''}">CPUs
                    </button>
                    <button 
                        @click="${() => this.switchTab('motherboard')}" 
                        class="tab-button ${this.showMotherboards ? 'active' : ''}">Motherboards
                    </button>
                    <button 
                        @click="${() => this.switchTab('gpu')}" 
                        class="tab-button ${this.showGPUs ? 'active' : ''}">GPUs
                    </button>
                    <input type="checkbox" id="active">
                    <label for="active" class="menu-btn"><span></span></label>
                    <label for="active" class="close"></label>
                    <div class="wrapper">
                        <ul>
                            <div class="components-list">
                                <h3 style="font-size: 1.5vw;">Deine Komponenten</h3>
                                <p id="cpu-name">CPU: Keine Vorhanden</p>
                                <p id="mb-name">Motherboard: Keines Vorhanden</p>
                                <p id="gpu-name">GPU: Keine Vorhanden</p>
                            </div>
                        </ul>
                    </div>
                    <!-- Umschaltbare Tabs -->
                </div>
                <div style="display: ${this.showCPUs ? 'block' : 'none'}">
                    ${cpuContent}
                </div>
                <div style="display: ${this.showMotherboards ? 'block' : 'none'}">
                    ${mbContent}
                </div>
                <div style="display: ${this.showGPUs ? 'block' : 'none'}">
                    ${gpuContent}
                </div>
            </div>
        `, this);
    }
}

// Registriere das Custom Element
customElements.define("app-component", AppComponent);

