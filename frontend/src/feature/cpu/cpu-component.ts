import { html, render } from "lit-html";
import { loadAllCPUs } from "./cpu-service";
import { CPU } from "./cpu";
import { Model, subscribe } from "../model";

class CpuComponent extends HTMLElement {
    addedCpuId: number;
    async connectedCallback() {
        subscribe(model => {
            this.render(model);
        });
        await loadAllCPUs();
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

    async addCpu(cpuId: number, socket: string, cpuName: string) {
        console.log("CPU ID hinzugefügt:", cpuId);
        this.addedCpuId = cpuId; 
        this.renderCPUs([/* gefilterte CPUs */]); // Rendern nach Hinzufügen
        await this.filterMotherboardsBySocket(socket);

        const cpuNameElement = document.getElementById('cpu-name');
        if (cpuNameElement) {
            cpuNameElement.textContent = `CPU: ${cpuName}`;
        }
    }

    removeCpu(cpuId: number) {
        console.log("CPU ID entfernt:", cpuId);
        this.addedCpuId = null;
        this.renderCPUs([/* alle CPUs */]);

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
