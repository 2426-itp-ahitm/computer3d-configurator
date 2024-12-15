import { html, render } from "lit-html"
import { loadAllCPUs } from "./cpu-service"
import { CPU } from "src/model"

const styles = html`
    <link rel="stylesheet" href="/components.css">
`

class CpuComponent extends HTMLElement {

    private cpus: CPU[] = []; // Typisieren und initialisieren

    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }

    async connectedCallback() {
        this.cpus = await loadAllCPUs();
        this.renderCPUs();
    }

    renderCPUs() {
        render(this.tableTemplate(this.cpus), this.shadowRoot); // Typ-Anpassung
    }

    updateCPUs(filteredCpus: CPU[]) {
        this.cpus = filteredCpus;
        this.renderCPUs();
    }

    tableTemplate = (cpus: CPU[]) => {
        const data = cpus.map(cpu =>
            html`
            <div class="CpuContainer">
                <div class="CpuDetails">
                    <p class="CpuName"><strong>${cpu.name}</strong></p>
                    <div class="ContentWrapper">
                        <div class="Image">
                            <img src="${cpu.img}" alt="${cpu.name}">
                        </div>
                        <div class="Info">
                            <p>Preis: ${cpu.price}</p>
                            <p>Sockel: ${cpu.socket}</p>
                            <button class="addButton" @click=${() => this.addCpu(cpu.cpu_id, cpu.socket, cpu.name)}>Hinzufügen!</button>
                        </div>
                    </div>
                </div>
            </div>
            `
        );
        return html`
            ${styles}
            ${data}
        `;
    }

    async addCpu(cpuId: number, socket: string, cpuName: string) {
        console.log("CPU ID:", cpuId);
    
        // Überprüfe und filtere Motherboards mit demselben Socket
        await this.filterMotherboardsBySocket(socket);
    
        // Setze den Namen der hinzugefügten CPU oder zeige "Keine Vorhanden" an
        const cpuNameElement = document.getElementById('cpu-name');
        if (cpuNameElement) {
            cpuNameElement.textContent = `CPU: ${cpuName}`;
        }
    }
    

    async filterMotherboardsBySocket(socket: string) {
        console.log("Filtere Motherboards für den Socket:", socket);

        try {
            const response = await fetch(`/api/motherboards`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Fehler beim Abrufen der Motherboards.');
            }

            const motherboards = await response.json();

            // Filtern der Motherboards nach Sockel
            const filteredMotherboards = motherboards.filter((mb: { socket: string }) => mb.socket === socket);

            console.log('Gefilterte Motherboards:', filteredMotherboards);

            // Aktualisiere die Motherboard-Komponente mit den gefilterten Daten
            const mbComponent = document.querySelector('mb-component');
            if (mbComponent && typeof (mbComponent as any).updateMotherboards === "function") {
                (mbComponent as any).updateMotherboards(filteredMotherboards);
            }
        } catch (error) {
            console.error('Fehler beim Filtern der Motherboards:', error);
        }
    }
}

customElements.define("cpu-component", CpuComponent);
