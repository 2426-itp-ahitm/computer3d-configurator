import { html, render } from "lit-html";
import "./feature/cpu/cpu-component";
import "./feature/motherboard/mb-component";
import "./feature/gpu/gpu-component";
import "./feature/ram/ram-component";  // Importiere die RAM-Komponente
import "./feature/internalHardDrive/internalHardDrive-component";
import "./feature/case/case-component"; // Importiere die Case-Komponente
import { model } from './feature/model';

const cpuContent = html`
    <h3 class="headerTitle">Wähle deine CPU aus</h3>
    <cpu-component id="cpuAllBox" class="content-box"></cpu-component>
`;

const mbContent = html`
    <h3 class="headerTitle">Wähle dein Motherboard aus</h3>
    <mb-component id="mbAllBox" class="content-box"></mb-component>
`;

const gpuContent = html`
    <h3 class="headerTitle">Wähle deine GPU aus</h3>
    <gpu-component id="gpuAllBox" class="content-box"></gpu-component>
`;

const ramContent = html`
    <h3 class="headerTitle">Wähle deinen RAM aus</h3>
    <ram-component id="ramAllBox" class="content-box"></ram-component>
`;

const internalHardDriveContent = html`
    <h3 class="headerTitle">Wähle deinen InternalHardDrive aus</h3>
    <internalharddrive-component id="internalHardDriveAllBox" class="content-box"></internalharddrive-component>
`;

const caseContent = html`
    <h3 class="headerTitle">Wähle dein Case aus</h3>
    <case-component id="caseAllBox" class="content-box"></case-component>
`;

class AppComponent extends HTMLElement {
    showCPUs = true;
    showMotherboards = false;
    showGPUs = false;
    showRAM = false;
    showInternalHardDrive = false;
    showCase = false;

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.loadShoppingCart(); // Einkaufswagen beim Laden der Komponente abrufen
    }

    // Methode, um zwischen den Tabs zu wechseln
    switchTab(tab: string) {
        this.showCPUs = tab === 'cpu';
        this.showMotherboards = tab === 'motherboard';
        this.showGPUs = tab === 'gpu';
        this.showRAM = tab === 'ram';
        this.showInternalHardDrive = tab === 'internalHardDrive';
        this.showCase = tab === 'case';
        this.render();
    }

    // Methode zum Abrufen des Warenkorbs
    async loadShoppingCart() {
        const cpuName = document.getElementById('cpu-name');
        const mbName = document.getElementById('mb-name');
        const gpuName = document.getElementById('gpu-name');
        const ramName = document.getElementById('ram-name');
        const internalHardDriveName = document.getElementById('internalHardDrive-name');
        const caseName = document.getElementById('case-name');
        console.log("Lade Einkaufswagen...");
        try {
            const response = await fetch(`http://localhost:8080/api/shoppingcart/get-by-id/${model.shoppingCartId}`);

            if (!response.ok) {
                throw new Error('Fehler beim Abrufen des Einkaufswagens.');
            }

            const data = await response.json();
            console.log('Einkaufswagen geladen:', data);

            cpuName.textContent = `CPU: ${data.cpu?.name ?? "———"}`;
            mbName.textContent = `Motherboard: ${data.motherboard?.name ?? "———"}`;
            gpuName.textContent = `GPU: ${data.gpu?.name ?? "———"}`;
            ramName.textContent = `RAM: ${data.ram?.name ?? "———"}`;
            internalHardDriveName.textContent = `InternalHardDrive: ${data.internalHardDrive?.name ?? "———"}`;
            caseName.textContent = `Case: ${data.case?.name ?? "———"}`;
        } catch (error) {
            console.error('Fehler beim Abrufen des Einkaufswagens:', error);
        }
    }

    // Methode zum Erstellen des Einkaufswagens
    async createShoppingCart() {
        console.log("Erstelle Einkaufswagen...");
        try {
            const response = await fetch('http://localhost:8080/api/shoppingcart/createShoppingCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}) // Falls du Daten senden musst, ansonsten leer lassen
            });

            if (!response.ok) {
                throw new Error('Fehler beim Erstellen des Einkaufswagens.');
            }

            const data = await response.json();
            console.log('Einkaufswagen erstellt:', data);
        } catch (error) {
            console.error('Fehler beim Erstellen des Einkaufswagens:', error);
        }
    }

    render() {
        render(html`
            <div> 
                <!-- Navbar -->
                <div class="navbar">
                    <div id="allButtons">
                        <div id="navButtons">    
                            <button @click="${() => this.switchTab('cpu')}" class="tab-button ${this.showCPUs ? 'active' : ''}">CPUs</button>
                            <button @click="${() => this.switchTab('motherboard')}" class="tab-button ${this.showMotherboards ? 'active' : ''}">Motherboards</button>
                            <button @click="${() => this.switchTab('gpu')}" class="tab-button ${this.showGPUs ? 'active' : ''}">GPUs</button>
                            <button @click="${() => this.switchTab('ram')}" class="tab-button ${this.showRAM ? 'active' : ''}">RAM</button>
                            <button @click="${() => this.switchTab('internalHardDrive')}" class="tab-button ${this.showInternalHardDrive ? 'active' : ''}">InternalHardDrive</button>
                            <button @click="${() => this.switchTab('case')}" class="tab-button ${this.showCase ? 'active' : ''}">Case</button>
                        </div>
                        <input type="checkbox" id="active">
                        <label for="active" class="menu-btn"><span></span></label>
                        <label for="active" class="close"></label>
                        <div class="wrapper">
                            <ul>
                                <div class="components-list">
                                    <p id="cpu-name">CPU: ———</p>
                                    <p id="mb-name">Motherboard: ———</p>
                                    <p id="gpu-name">GPU: ———</p>
                                    <p id="ram-name">RAM: ———</p>
                                    <p id="internalHardDrive-name">InternalHardDrive: ———</p>
                                    <p id="case-name">Case: ———</p>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <!--<button @click="${this.createShoppingCart}">Erstelle Einkaufswagen</button>-->
                </div>

                <!-- Umschaltbare Tabs -->
                <div style="display: ${this.showCPUs ? 'block' : 'none'}">${cpuContent}</div>
                <div style="display: ${this.showMotherboards ? 'block' : 'none'}">${mbContent}</div>
                <div style="display: ${this.showGPUs ? 'block' : 'none'}">${gpuContent}</div>
                <div style="display: ${this.showRAM ? 'block' : 'none'}">${ramContent}</div>
                <div style="display: ${this.showInternalHardDrive ? 'block' : 'none'}">${internalHardDriveContent}</div>
                <div style="display: ${this.showCase ? 'block' : 'none'}">${caseContent}</div>
            </div>
        `, this);
    }
}

// Registriere das Custom Element
customElements.define("app-component", AppComponent);
