import { html, render } from "lit-html"
import { loadAllMotherboards } from "./mb-service"
import { Motherboard } from "src/model"

const styles = html`
    <link rel="stylesheet" href="/components.css">
`

class MbComponent extends HTMLElement {
    private motherboards: Motherboard[] = []; // Typisieren und initialisieren
    private addedMbId: number | null = null; // Speichert die ID des hinzugefügten Mainboards

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        this.motherboards = await loadAllMotherboards();
        this.renderMotherboards();
    }

    renderMotherboards() {
        render(this.tableTemplate(this.motherboards), this.shadowRoot!);
    }

    updateMotherboards(filteredMotherboards: Motherboard[]) {
        this.motherboards = filteredMotherboards;
        this.renderMotherboards();
    }

    tableTemplate = (mbs: Motherboard[]) => {
        const data = mbs.map(mb =>
            html`
            <div class="MbContainer">
                <div class="MbDetails">
                    <p class="MbName"><strong>${mb.name}</strong></p>
                    <div class="ContentWrapper">
                        <div class="Image">
                            <img src="${mb.img}" alt="${mb.name}">
                        </div>
                        <div class="Info">
                            <p>Preis: ${mb.price}</p>
                            <p>Sockel: ${mb.socket}</p>
                            <div id="Button">
                                ${
                                    this.addedMbId === mb.motherboard_id
                                        ? html`
                                            <button class="deleteButton" @click=${() => this.removeMotherboard(mb.motherboard_id)}>Entfernen!</button>
                                        `
                                        : html`
                                            <button class="addButton" @click=${() => this.addMotherboard(mb.motherboard_id, mb.socket, mb.name)}>Hinzufügen!</button>
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
            ${styles}
            ${data}
        `;
    }

    async addMotherboard(mbId: number, socket: string, mbName: string) {
        console.log("MB ID hinzugefügt:", mbId);
        this.addedMbId = mbId; // Mainboard als hinzugefügt markieren
        this.renderMotherboards(); // Ansicht aktualisieren
        await this.filterCPUsBySocket(socket);

        // Namen des hinzugefügten Mainboards setzen
        const mbNameElement = document.getElementById('mb-name');
        if (mbNameElement) {
            mbNameElement.textContent = `Motherboard: ${mbName}`;
        }
    }

    removeMotherboard(mbId: number) {
        console.log("MB ID entfernt:", mbId);
        this.addedMbId = null; // Zustand zurücksetzen
        this.renderMotherboards(); // Ansicht aktualisieren

        // Namen des Mainboards zurücksetzen
        const mbNameElement = document.getElementById('mb-name');
        if (mbNameElement) {
            mbNameElement.textContent = "Motherboard: Keine vorhanden";
        }
    }

    async filterCPUsBySocket(socket: string) {
        console.log("Filtere CPUs für den Socket:", socket);

        try {
            const response = await fetch(`/api/cpus`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Fehler beim Abrufen der CPUs.');
            }

            const cpus = await response.json();
            const filteredCPUs = cpus.filter((cpu: { socket: string }) => cpu.socket === socket);

            console.log('Gefilterte CPUs:', filteredCPUs);

            const cpuComponent = document.querySelector('cpu-component');
            if (cpuComponent && typeof (cpuComponent as any).updateCPUs === "function") {
                (cpuComponent as any).updateCPUs(filteredCPUs);
            }
        } catch (error) {
            console.error('Fehler beim Filtern der CPUs:', error);
        }
    }
}

customElements.define("mb-component", MbComponent);

