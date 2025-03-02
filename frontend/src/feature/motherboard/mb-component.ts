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
                                <div style="margin-bottom: 1vw">
                                <p>Preis: ${mb.price} €</p>
                                <br>
                                <p>Sockel: ${mb.socket}</p>
                                <br>
                                <p>RAM-Typ: ${mb.ramType}</p>
                                </div>
                                <div id="svgBox">
                                ${
                                    this.addedMbId === mb.motherboard_id
                                        ? html`
                                            <svg @click=${() => this.removeMotherboard(mb.motherboard_id)} width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 12H16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="darkred" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                                        `
                                        : html`
                                            <svg @click=${() => this.addMotherboard(mb.motherboard_id, mb.socket, mb.ramType, mb.name)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
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

    async addMotherboard(mbId: number, socket: string, ramType: string, mbName: string) {
        console.log("Motherboard ID hinzugefügt:", mbId);
        this.addedMbId = mbId;
        this.renderMotherboards(this.motherboards);  // Jetzt nach dem Hinzufügen neu rendern
        await this.filterComponentsBySocketAndRAM(ramType, socket);

        const mbNameElement = document.getElementById('mb-name');
        if (mbNameElement) {
            mbNameElement.textContent = `Motherboard: ${mbName}`;
        }
    }

    async filterComponentsBySocketAndRAM(ramType: string, socket: string) {
        console.log("Filtere CPUs und RAMs für Sockel:", socket, "und RAM-Typ:", ramType);
        try {
            // Fetch CPUs, die zum Sockel des Motherboards passen
            const cpuResponse = await fetch(`/api/cpus/by-motherboard-socket/${socket}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!cpuResponse.ok) {
                throw new Error('Fehler beim Abrufen der CPUs.');
            }

            const cpus = await cpuResponse.json();
            console.log('Gefilterte CPUs:', cpus);

            const cpuComponent = document.querySelector('cpu-component');
            if (cpuComponent && typeof (cpuComponent as any).updateCPUs === "function") {
                (cpuComponent as any).updateCPUs(cpus);  // Passende CPUs an das CPU-Component weitergeben
            }

            // Fetch RAMs, die zum RAM-Typ des Motherboards passen
            const ramResponse = await fetch(`/api/rams/by-Motherboard-Type/${ramType}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!ramResponse.ok) {
                throw new Error('Fehler beim Abrufen der RAMs.');
            }

            const rams = await ramResponse.json();
            console.log('Gefilterte RAMs:', rams);

            const ramComponent = document.querySelector('ram-component');
            if (ramComponent && typeof (ramComponent as any).updateRAMs === "function") {
                (ramComponent as any).updateRAMs(rams);  // Passende RAMs an das RAM-Component weitergeben
            }

        } catch (error) {
            console.error('Fehler beim Filtern der Komponenten:', error);
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
            mbNameElement.textContent = "Motherboard: ———";
        }

        this.loadAllCPUs().then(allCPUs => {
            const cpuComponent = document.querySelector('cpu-component');
            if (cpuComponent && typeof (cpuComponent as any).updateCPUs === "function") {
                (cpuComponent as any).updateCPUs(allCPUs);
            }
        });

        // Optionally, reset RAM filtering
        this.loadAllRAMs().then(allRAMs => {
            const ramComponent = document.querySelector('ram-component');
            if (ramComponent && typeof (ramComponent as any).updateRAMs === "function") {
                (ramComponent as any).updateRAMs(allRAMs);
            }
        });
    }

    async loadAllRAMs() {
        try {
            const response = await fetch(`/api/rams`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Fehler beim Abrufen aller RAMs.');
            }

            return await response.json();
        } catch (error) {
            console.error('Fehler beim Laden aller RAMs:', error);
            return [];
        }
    }
}

customElements.define("mb-component", MbComponent);
