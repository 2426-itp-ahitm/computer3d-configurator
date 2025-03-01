import { html, render } from "lit-html";
import { loadAllRams } from "./ram-service";
import { Ram } from "./ram";
import { Model, subscribe } from "../model";

class RamComponent extends HTMLElement {
    addedRamId: number | null = null; // Initialisieren als null
    rams: Ram[] = []; // Zu speichernde RAMs, die vom Service geladen werden

    async connectedCallback() {
        subscribe(model => {
            this.render(model);
        });

        // Lade alle RAMs und speichere sie
        this.rams = await loadAllRams();
        this.renderRAMs(this.rams);
    }

    render(model: Model) {
        const rams = Array.isArray(model.ram) ? model.ram : [model.ram];
        this.renderRAMs(rams);
    }

    renderRAMs(rams: Ram[]) {
        render(this.tableTemplate(rams), this);
    }

    tableTemplate(rams: Ram[]) {
        const data = rams.map(ram =>
            html`
                <div class="RamContainer">
                    <div class="RamDetails">
                        <p class="RamName"><strong>${ram.name}</strong></p>
                        <div class="ContentWrapper">
                            <div class="Image">
                                <img src="${ram.img}" alt="${ram.name}">
                            </div>
                            <div class="Info">
                            <div style="margin-bottom: 1vw">
                            <p>Preis: ${ram.price ? ram.price + " €" : "N/A"}</p>
                            <br>
                            <p>Typ: ${ram.type}</p>
                            </div>
                            <div id="svgBox">
                                ${
                                    this.addedRamId === ram.ram_id
                                        ? html`
                                            <svg @click=${() => this.removeRam(ram.ram_id)} width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 12H16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="darkred" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        `
                                        : html`
                                            <svg @click=${() => this.addRam(ram.ram_id, ram.name)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
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
            ${data}
        `;
    }

    updateRAMs(rams: Ram[]) {
        this.rams = rams;
        this.renderRAMs(rams);
    }

    addRam(ramId: number, ramName: string) {
        console.log("RAM ID hinzugefügt:", ramId);
        this.addedRamId = ramId;
        this.renderRAMs(this.rams);  // Jetzt nach dem Hinzufügen neu rendern

        const ramNameElement = document.getElementById('ram-name');
        if (ramNameElement) {
            ramNameElement.textContent = `RAM: ${ramName}`;
        }
    }

    removeRam(ramId: number) {
        console.log("RAM ID entfernt:", ramId);
        this.addedRamId = null;
        this.renderRAMs(this.rams);  // Alle RAMs wieder rendern

        const ramNameElement = document.getElementById('ram-name');
        if (ramNameElement) {
            ramNameElement.textContent = "RAM: ———";
        }
    }
}

customElements.define("ram-component", RamComponent);
