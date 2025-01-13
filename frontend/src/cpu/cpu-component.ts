import { html, render } from "lit-html"
import { loadAllCPUs } from "./cpu-service"
import { CPU } from "src/model"

const styles = html`
    <link rel="stylesheet" href="/components.css">
`

class CpuComponent extends HTMLElement {
    private cpus: CPU[] = []; // Typisieren und initialisieren
    private addedCpuId: number | null = null; // Speichert die ID der hinzugefügten CPU

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        this.cpus = await loadAllCPUs();
        this.renderCPUs();
    }

    renderCPUs() {
        render(this.tableTemplate(this.cpus), this.shadowRoot);
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
                            <p>Preis: ${cpu.price} €</p>
                            <p>Sockel: ${cpu.socket}</p>
                            ${
                                this.addedCpuId === cpu.cpu_id
                                    ? html`
                                        <button class="deleteButton" @click=${() => this.removeCpu(cpu.cpu_id)}>Entfernen</button>
                                    `
                                    : html`
                                        <button class="addButton" @click=${() => this.addCpu(cpu.cpu_id, cpu.socket, cpu.name)}>Hinzufügen</button>
                                    `
                            }
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
        console.log("CPU ID hinzugefügt:", cpuId);
        this.addedCpuId = cpuId; // CPU als hinzugefügt markieren
        this.renderCPUs(); // Neu rendern, um Buttons zu aktualisieren
        await this.filterMotherboardsBySocket(socket);

        // Setze den Namen der hinzugefügten CPU
        const cpuNameElement = document.getElementById('cpu-name');
        if (cpuNameElement) {
            cpuNameElement.textContent = `CPU: ${cpuName}`;
        }
    }

    removeCpu(cpuId: number) {
        console.log("CPU ID entfernt:", cpuId);
        this.addedCpuId = null; // Hinzugefügte CPU zurücksetzen
        this.renderCPUs(); // Neu rendern, um Buttons zu aktualisieren
    
        // Setze den CPU-Namen zurück
        const cpuNameElement = document.getElementById('cpu-name');
        if (cpuNameElement) {
            cpuNameElement.textContent = "CPU: Keine vorhanden";
        }
    
        // Lade alle Motherboards und setze sie zurück
        this.loadAllMotherboards().then(allMotherboards => {
            const mbComponent = document.querySelector('mb-component');
            if (mbComponent && typeof (mbComponent as any).updateMotherboards === "function") {
                (mbComponent as any).updateMotherboards(allMotherboards);
            }
        });
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
            const filteredMotherboards = motherboards.filter((mb: { socket: string }) => mb.socket === socket);

            console.log('Gefilterte Motherboards:', filteredMotherboards);

            const mbComponent = document.querySelector('mb-component');
            if (mbComponent && typeof (mbComponent as any).updateMotherboards === "function") {
                (mbComponent as any).updateMotherboards(filteredMotherboards);
            }
        } catch (error) {
            console.error('Fehler beim Filtern der Motherboards:', error);
        }
    }

    async loadAllMotherboards() {
        try {
            const response = await fetch(`/api/motherboards`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Fehler beim Abrufen aller Motherboards.');
            }
    
            return await response.json();
        } catch (error) {
            console.error('Fehler beim Laden aller Motherboards:', error);
            return [];
        }
    }
    
}

customElements.define("cpu-component", CpuComponent);
