import { html, render } from "lit-html";
import { loadAllCpuCoolers } from "./cpuCooler-service";
import { CpuCooler } from "./cpuCooler";
import { Model, subscribe } from "../model";
import { model } from '../model';

class CpuCoolerComponent extends HTMLElement {
    addedCpuCoolerId: number | null = null;
    cpuCoolers: CpuCooler[] = [];

    async connectedCallback() {
        subscribe(model => {
            this.render(model);
        });

        this.cpuCoolers = await loadAllCpuCoolers();
        await this.checkCpuCoolerInCart();
        this.renderCpuCoolers(this.cpuCoolers);
    }

    render(model: Model) {
        const cpuCoolers = Array.isArray(model.cpuCooler) ? model.cpuCooler : [model.cpuCooler];
        this.renderCpuCoolers(cpuCoolers);
    }

    renderCpuCoolers(cpuCoolers: CpuCooler[]) {
        render(this.tableTemplate(cpuCoolers), this);
    }

    tableTemplate(cpuCoolers: CpuCooler[]) {
        const data = cpuCoolers.map(cpuCooler =>
            html`
                <div class="CpuCoolerContainer">
                    <div class="CpuCoolerDetails">
                        <p class="CpuCoolerName"><strong>${cpuCooler.name}</strong></p>
                        <div class="ContentWrapper">
                            <div class="Image">
                                <img src="${cpuCooler.img}" alt="${cpuCooler.name}">
                            </div>
                            <div class="Info">
                                <div style="margin-bottom: 1vw">
                                    <p>Preis: ${cpuCooler.price} €</p>
                                </div>
                                <div id="svgBox"> 
                                    ${this.addedCpuCoolerId === cpuCooler.cpu_cooler_id
                                        ? html`
                                            <svg @click=${() => this.removeCpuCooler(cpuCooler.cpu_cooler_id)} width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 12H16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="darkred" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        `
                                        : html`
                                            <svg @click=${() => this.addCpuCooler(cpuCooler.cpu_cooler_id, cpuCooler.name)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
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
                /* Style für das CpuCooler Component */
            </style>
            ${data}
        `;
    }

    async checkCpuCoolerInCart() {
        try {
            const response = await fetch("http://localhost:8080/api/shoppingcart/get-by-id/1");
            if (!response.ok) {
                throw new Error("Fehler beim Abrufen des Warenkorbs.");
            }
            const shoppingCart = await response.json();

            if (shoppingCart.cpuCooler && shoppingCart.cpuCooler.name) {
                const matchingCpuCooler = this.cpuCoolers.find(cc => cc.name === shoppingCart.cpuCooler.name);
                if (matchingCpuCooler) {
                    this.addedCpuCoolerId = matchingCpuCooler.cpu_cooler_id;
                }
            }
        } catch (error) {
            console.error("Fehler beim Laden des Warenkorbs:", error);
        }
    }

    async addCpuCooler(cpuCoolerId: number, cpuCoolerName: string) {
        this.addedCpuCoolerId = cpuCoolerId;
        this.renderCpuCoolers(this.cpuCoolers);
        this.updateShoppingCart(cpuCoolerId);
        
        const cpuCoolerNameElement = document.getElementById('cpuCooler-name');
        if (cpuCoolerNameElement) {
            cpuCoolerNameElement.textContent = `CPU Cooler: ${cpuCoolerName}`;
        }
    }

    async updateShoppingCart(cpuCoolerId: number) {
        try {
            const response = await fetch(`http://localhost:8080/api/shoppingcart/update-cart/${model.shoppingCartId}/cpucooler/${cpuCoolerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Fehler beim Aktualisieren des Warenkorbs.');
            }

            console.log('Warenkorb erfolgreich aktualisiert');
        } catch (error) {
            console.error('Fehler beim Aktualisieren des Warenkorbs:', error);
        }
    }

    async removeCpuCooler(cpuCoolerId: number) {
        try {
            const response = await fetch(`http://localhost:8080/api/shoppingcart/remove-component/${model.shoppingCartId}/cpucooler`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Fehler beim Entfernen des CPU-Kühlers aus dem Warenkorb.');
            }

            this.addedCpuCoolerId = null;
            this.renderCpuCoolers(this.cpuCoolers);

            const cpuCoolerNameElement = document.getElementById('cpuCooler-name');
            if (cpuCoolerNameElement) {
                cpuCoolerNameElement.textContent = `CPU Cooler: ———`;
            }
        } catch (error) {
            console.error('Fehler beim Entfernen des CPU-Kühlers aus dem Warenkorb:', error);
        }
    }
}

customElements.define("cpu-cooler-component", CpuCoolerComponent);
