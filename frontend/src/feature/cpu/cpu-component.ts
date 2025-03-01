import { html, render } from "lit-html";
import { loadAllCPUs } from "./cpu-service";
import { CPU } from "./cpu";
import { Model, subscribe } from "../model";

class CpuComponent extends HTMLElement {
    addedCpuId: number | null = null;
    cpus: CPU[] = [];

    async connectedCallback() {
        subscribe(model => {
            this.render(model);
        });

        // Lade alle CPUs und speichere sie
        this.cpus = await loadAllCPUs();
        this.renderCPUs(this.cpus);
    }

    render(model: Model) {
        const cpus = Array.isArray(model.cpu) ? model.cpu : [model.cpu];
        this.renderCPUs(cpus);
    }

    renderCPUs(cpus: CPU[]) {
        render(this.tableTemplate(cpus), this);
    }

    tableTemplate(cpus: CPU[]) {
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
                            <div style="margin-bottom: 1vw">
                                <p>Preis: ${cpu.price} €</p>
                                <br>
                                <p>Sockel: ${cpu.socket}</p>
                            </div>
                            <div id="svgBox"> 
                                ${
                                    this.addedCpuId === cpu.cpu_id
                                        ? html`
                                            <svg @click=${() => this.removeCpu(cpu.cpu_id)} width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 12H16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="darkred" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                                        `
                                        : html`
                                            <svg @click=${() => this.addCpu(cpu.cpu_id, cpu.socket, cpu.name)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
                                                <path d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M37,26H26v11h-2V26H13v-2h11V13h2v11h11V26z"></path>
                                            </svg>
                                        `
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        );
        return html`
            <style>
            </style>
            ${data}
        `;
    }

    updateCPUs(cpus: CPU[]) {
        this.cpus = cpus;
        this.renderCPUs(cpus);
    }

    async addCpu(cpuId: number, socket: string, cpuName: string) {
        console.log("CPU ID hinzugefügt:", cpuId);
        this.addedCpuId = cpuId;
        this.renderCPUs(this.cpus);  // Jetzt nach dem Hinzufügen neu rendern
        await this.fetchMotherboardsBySocket(socket);

        const cpuNameElement = document.getElementById('cpu-name');
        if (cpuNameElement) {
            cpuNameElement.textContent = `CPU: ${cpuName}`;
        }
    }

    async fetchMotherboardsBySocket(socket: string) {
        console.log("Lade passende Motherboards für den Sockel:", socket);
        try {
            const response = await fetch(`/api/motherboards/by-cpu-socket/${socket}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Fehler beim Abrufen der Motherboards.');
            }

            const motherboards = await response.json();
            console.log('Gefundene Motherboards:', motherboards);

            const mbComponent = document.querySelector('mb-component');
            if (mbComponent && typeof (mbComponent as any).updateMotherboards === "function") {
                (mbComponent as any).updateMotherboards(motherboards);  // Passende Motherboards werden an das Motherboard-Component übergeben
            }
        } catch (error) {
            console.error('Fehler beim Filtern der Motherboards:', error);
        }
    }

    removeCpu(cpuId: number) {
        console.log("CPU ID entfernt:", cpuId);
        this.addedCpuId = null;
        this.renderCPUs(this.cpus);  // Alle CPUs wieder rendern

        const cpuNameElement = document.getElementById('cpu-name');
        if (cpuNameElement) {
            cpuNameElement.textContent = "CPU: Keine vorhanden";
        }

        this.loadAllMotherboards().then(allMotherboards => {
            const mbComponent = document.querySelector('mb-component');
            if (mbComponent && typeof (mbComponent as any).updateMotherboards === "function") {
                (mbComponent as any).updateMotherboards(allMotherboards);
            }
        });
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
