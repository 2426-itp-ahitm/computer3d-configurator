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
            <style>
                .CpuContainer {
                    /* Dein CSS hier */
                }
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
