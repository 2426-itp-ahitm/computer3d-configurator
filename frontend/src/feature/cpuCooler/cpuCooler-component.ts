import { html, render } from "lit-html";
import { loadAllCpuCoolers } from "./cpuCooler-service"; // Implementiere diesen Service, um die Daten zu laden
import { CpuCooler } from "./cpuCooler";
import { Model, subscribe } from "../model";
import { model } from "../model";

class CpuCoolerComponent extends HTMLElement {
    addedCpuCoolerId: number | null = null;
    cpuCoolers: CpuCooler[] = [];

    async connectedCallback() {
        // Abonniere das Model, um auf Änderungen zu reagieren
        subscribe((model: Model) => {
            this.render(model);
        });

        // Lade alle CPU-Kühler von der API
        this.cpuCoolers = await loadAllCpuCoolers();
        this.renderCpuCoolers(this.cpuCoolers);
    }

    render(model: Model) {
        // Falls das Model CPU-Kühler enthält, rendern wir diese
        const coolers = Array.isArray(model.cpuCooler) ? model.cpuCooler : [model.cpuCooler];
        this.renderCpuCoolers(coolers);
    }

    renderCpuCoolers(coolers: CpuCooler[]) {
        render(this.tableTemplate(coolers), this);
    }

    tableTemplate(coolers: CpuCooler[]) {
        const data = coolers.map(cooler =>
            html`
                <div class="CpuCoolerContainer">
                    <div class="CpuCoolerDetails">
                        <p class="CpuCoolerName"><strong>${cooler.name}</strong></p>
                        <div class="ContentWrapper">
                            <div class="Image">
                                <img src="${cooler.img}" alt="${cooler.name}">
                            </div>
                            <div class="Info">
                                <div style="margin-bottom: 1vw">
                                    <p>Preis: ${cooler.price} €</p>
                                    <p>Farbe: ${cooler.color}</p>
                                </div>
                                <div id="svgBox">
                                    ${this.addedCpuCoolerId === cooler.cpu_cooler_id
                                        ? html`
                                            <svg @click=${() => this.removeCpuCooler(cooler.cpu_cooler_id)}
                                                 width="50" height="50" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 12H16M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z"
                                                      stroke="darkred" stroke-width="1.5" stroke-linecap="round"
                                                      stroke-linejoin="round"/>
                                            </svg>
                                        `
                                        : html`
                                            <svg @click=${() => this.addCpuCooler(cooler.cpu_cooler_id, cooler.name)}
                                                 xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                                                 viewBox="0 0 50 50">
                                                <path d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M37,26H26v11h-2V26H13v-2h11V13h2v11h11V26z"/>
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
                /* Hier kannst du dein CSS einfügen */
            </style>
            ${data}
        `;
    }

    async addCpuCooler(cpuCoolerId: number, coolerName: string) {
        console.log("CPU-Kühler hinzugefügt:", cpuCoolerId);
        this.addedCpuCoolerId = cpuCoolerId;
        this.renderCpuCoolers(this.cpuCoolers);
        // API-Aufruf zum Hinzufügen des CPU-Kühlers zum Warenkorb
        await this.updateShoppingCart(cpuCoolerId);
    }

    async removeCpuCooler(cpuCoolerId: number) {
        console.log("Entferne CPU-Kühler:", cpuCoolerId);
        try {
            const response = await fetch(`http://localhost:8080/api/shoppingcart/remove-component/${model.shoppingCartId}/cpu-cooler`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error("Fehler beim Entfernen des CPU-Kühlers aus dem Warenkorb.");
            }
            const data = await response.json();
            console.log("CPU-Kühler entfernt:", data);
            this.addedCpuCoolerId = null;
            this.renderCpuCoolers(this.cpuCoolers);
        } catch (error) {
            console.error("Fehler beim Entfernen des CPU-Kühlers:", error);
        }
    }

    async updateShoppingCart(cpuCoolerId: number) {
        console.log("Aktualisiere Warenkorb mit CPU-Kühler ID:", cpuCoolerId);
        try {
            const response = await fetch(`http://localhost:8080/api/shoppingcart/update-cart/${model.shoppingCartId}/cpu-cooler/${cpuCoolerId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error("Fehler beim Aktualisieren des Warenkorbs.");
            }
            const data = await response.json();
            console.log("Warenkorb erfolgreich aktualisiert:", data);
        } catch (error) {
            console.error("Fehler beim Aktualisieren des Warenkorbs:", error);
        }
    }
}

customElements.define("cpu-cooler-component", CpuCoolerComponent);
