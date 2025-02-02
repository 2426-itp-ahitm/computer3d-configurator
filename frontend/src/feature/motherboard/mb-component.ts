import { html, render } from "lit-html";
import { loadAllMotherboards } from "./mb-service";
import { Motherboard } from "./mb";
import { Model, subscribe } from "../model";

class MbComponent extends HTMLElement {
    addedMbId: number | null = null; // Initialisieren als null
    motherboards: Motherboard[] = []; // Zu speichernde Motherboards, die vom Service geladen werden

    async connectedCallback() {
        subscribe(model => {
            this.render(model);
        });

        // Lade alle Motherboards und speichere sie
        this.motherboards = await loadAllMotherboards();
        this.renderMotherboards(this.motherboards);
    }

    render(model: Model) {
        const motherboards = Array.isArray(model.motherboard) ? model.motherboard : [model.motherboard];
        this.renderMotherboards(motherboards);
    }

    renderMotherboards(motherboards: Motherboard[]) {
        render(this.tableTemplate(motherboards), this);
    }

    tableTemplate(motherboards: Motherboard[]) {
        const data = motherboards.map(mb =>
            html`
                <div class="MbContainer">
                    <div class="MbDetails">
                        <p class="MbName"><strong>${mb.name}</strong></p>
                        <div class="ContentWrapper">
                            <div class="Image">
                                <img src="${mb.img}" alt="${mb.name}">
                            </div>
                            <div class="Info">
                                <p>Preis: ${mb.price} €</p>
                                <p>Sockel: ${mb.socket}</p>
                                ${
                                    this.addedMbId === mb.motherboard_id
                                        ? html`
                                            <button class="deleteButton" @click=${() => this.removeMotherboard(mb.motherboard_id)}>Entfernen</button>
                                        `
                                        : html`
                                            <button class="addButton" @click=${() => this.addMotherboard(mb.motherboard_id, mb.socket, mb.name)}>Hinzufügen</button>
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
                .MbContainer {
                    /* Dein CSS hier */
                }
            </style>
            ${data}
        `;
    }

    updateMotherboards(motherboards: Motherboard[]) {
        this.motherboards = motherboards;
        this.renderMotherboards(motherboards);
    }

    async addMotherboard(mbId: number, socket: string, mbName: string) {
        console.log("Motherboard ID hinzugefügt:", mbId);
        this.addedMbId = mbId;
        this.renderMotherboards(this.motherboards);  // Jetzt nach dem Hinzufügen neu rendern
        await this.filterCPUsBySocket(socket);

        const mbNameElement = document.getElementById('mb-name');
        if (mbNameElement) {
            mbNameElement.textContent = `Motherboard: ${mbName}`;
        }
    }

    async filterCPUsBySocket(socket: string) {
        console.log("Filtere CPUs für den Sockel:", socket);
        try {
            const response = await fetch(`/api/cpus/by-motherboard-socket/${socket}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Fehler beim Abrufen der CPUs.');
            }

            const cpus = await response.json();
            console.log('Gefilterte CPUs:', cpus);

            const cpuComponent = document.querySelector('cpu-component');
            if (cpuComponent && typeof (cpuComponent as any).updateCPUs === "function") {
                (cpuComponent as any).updateCPUs(cpus);  // Passende CPUs werden an das CPU-Component übergeben
            }
        } catch (error) {
            console.error('Fehler beim Filtern der CPUs:', error);
        }
    }

    async loadAllCPUs() {
        try {
            const response = await fetch(`/api/cpus`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Fehler beim Abrufen aller CPUs.');
            }

            return await response.json();
        } catch (error) {
            console.error('Fehler beim Laden aller CPUs:', error);
            return [];
        }
    }

    removeMotherboard(mbId: number) {
        console.log("Motherboard ID entfernt:", mbId);
        this.addedMbId = null;
        this.renderMotherboards(this.motherboards);  // Alle Motherboards wieder rendern

        const mbNameElement = document.getElementById('mb-name');
        if (mbNameElement) {
            mbNameElement.textContent = "Motherboard: Keine vorhanden";
        }

        this.loadAllCPUs().then(allCPUs => {
            const cpuComponent = document.querySelector('cpu-component');
            if (cpuComponent && typeof (cpuComponent as any).updateCPUs === "function") {
                (cpuComponent as any).updateCPUs(allCPUs);
            }
        });
    }
}

customElements.define("mb-component", MbComponent);
