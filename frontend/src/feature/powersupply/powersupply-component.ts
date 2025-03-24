import { html, render } from "lit-html";
import { loadAllPowerSupplies } from "./powersupply-service"; // Falls du einen Service für die Ladeoperationen hast
import { PowerSupply } from "./powersupply";
import { Model, subscribe } from "../model";
import { model } from '../model';

class PowerSupplyComponent extends HTMLElement {
    addedPowerSupplyId: number | null = null;
    powerSupplies: PowerSupply[] = [];

    async connectedCallback() {
        subscribe(model => {
            this.render(model);
        });

        // Lade alle PowerSupplies und speichere sie
        this.powerSupplies = await loadAllPowerSupplies();

        // Prüfe, ob bereits ein PowerSupply im Warenkorb liegt
        await this.checkPowerSupplyInCart();

        this.renderPowerSupplies(this.powerSupplies);
    }

    render(model: Model) {
        const powerSupplies = Array.isArray(model.powersupply) ? model.powersupply : [model.powersupply];
        this.renderPowerSupplies(powerSupplies);
    }

    renderPowerSupplies(powerSupplies: PowerSupply[]) {
        render(this.tableTemplate(powerSupplies), this);
    }

    tableTemplate(powerSupplies: PowerSupply[]) {
        const data = powerSupplies.map(powerSupply =>
            html`
                <div class="PowerSupplyContainer">
                    <div class="PowerSupplyDetails">
                        <p class="PowerSupplyName"><strong>${powerSupply.name}</strong></p>
                        <div class="ContentWrapper">
                            <div class="Image">
                                <img src="${powerSupply.img}" alt="${powerSupply.name}">
                            </div>
                            <div class="Info">
                                <div style="margin-bottom: 1vw">
                                    <p>Preis: ${powerSupply.price} €</p>
                                    <br>
                                    <p>Watt: ${powerSupply.wattage}</p>
                                </div>
                                <div id="svgBox"> 
                                    ${this.addedPowerSupplyId === powerSupply.powersupply_id
                                        ? html`
                                            <svg @click=${() => this.removePowerSupply(powerSupply.powersupply_id)} width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 12H16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="darkred" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        `
                                        : html`
                                            <svg @click=${() => this.addPowerSupply(powerSupply.powersupply_id, powerSupply.name)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
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
                /* Style für das PowerSupply Component */
            </style>
            ${data}
        `;
    }

    // Methode zum Prüfen, ob ein PowerSupply bereits im Warenkorb liegt
    async checkPowerSupplyInCart() {
        try {
            const response = await fetch(`http://localhost:8080/api/shoppingcart/get-by-id/${model.shoppingCartId}`);
            if (!response.ok) {
                throw new Error("Fehler beim Abrufen des Warenkorbs.");
            }
            const shoppingCart = await response.json();

            // Angenommen, shoppingCart.powerSupply enthält ein Objekt mit PowerSupply-Daten
            if (shoppingCart.powerSupply && shoppingCart.powerSupply.name) {
                // Suche das PowerSupply in der bereits geladenen Liste anhand des Namens
                const matchingPowerSupply = this.powerSupplies.find(ps => ps.name === shoppingCart.powerSupply.name);
                if (matchingPowerSupply) {
                    this.addedPowerSupplyId = matchingPowerSupply.powersupply_id;

                    // Optional: PowerSupply-Name im UI aktualisieren
                    const powerSupplyNameElement = document.getElementById('powersupply-name');
                    if (powerSupplyNameElement) {
                        powerSupplyNameElement.textContent = `PowerSupply: ${matchingPowerSupply.name}`;
                    }
                }
            }
        } catch (error) {
            console.error("Fehler beim Laden des Warenkorbs:", error);
        }
    }

    async addPowerSupply(powerSupplyId: number, powerSupplyName: string) {
        console.log("PowerSupply ID hinzugefügt:", powerSupplyId);
        this.addedPowerSupplyId = powerSupplyId;
        this.renderPowerSupplies(this.powerSupplies);  // Jetzt nach dem Hinzufügen neu rendern

        const powerSupplyNameElement = document.getElementById('powerSupply-name');
        if (powerSupplyNameElement) {
            powerSupplyNameElement.textContent = `PowerSupply: ${powerSupplyName}`;
        }

        // API-Aufruf zum Hinzufügen des PowerSupplies zum Warenkorb
        this.updateShoppingCart(powerSupplyId);
    }

    async updateShoppingCart(powerSupplyId: number) {
        console.log("Aktualisiere Warenkorb mit PowerSupply ID:", powerSupplyId);

        try {
            const response = await fetch(`http://localhost:8080/api/shoppingcart/update-cart/${model.shoppingCartId}/psu/${powerSupplyId}`, {
                method: 'PUT', // POST oder PUT je nach API-Design
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Fehler beim Aktualisieren des Warenkorbs.');
            }

            const data = await response.json();
            console.log('Warenkorb erfolgreich aktualisiert:', data);
        } catch (error) {
            console.error('Fehler beim Aktualisieren des Warenkorbs:', error);
        }
    }

    async removePowerSupply(powerSupplyId: number) {
        console.log("Entferne PowerSupply ID:", powerSupplyId);

        // API-Aufruf zum Entfernen des PowerSupplies aus dem Warenkorb
        try {
            const response = await fetch(`http://localhost:8080/api/shoppingcart/remove-component/${model.shoppingCartId}/psu`, {
                method: 'DELETE', // DELETE-Methode für das Entfernen
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Fehler beim Entfernen des PowerSupplies aus dem Warenkorb.');
            }

            const data = await response.json();
            console.log('PowerSupply erfolgreich aus dem Warenkorb entfernt:', data);

            // PowerSupply-ID zurücksetzen, da kein PowerSupply mehr im Warenkorb ist
            this.addedPowerSupplyId = null;

            // Anzeige nach dem Entfernen neu rendern
            this.renderPowerSupplies(this.powerSupplies);

            // Anzeige des Texts zurücksetzen
            const powerSupplyNameElement = document.getElementById('powerSupply-name');
            if (powerSupplyNameElement) {
                powerSupplyNameElement.textContent = `PowerSupply: ———`;
            }
        } catch (error) {
            console.error('Fehler beim Entfernen des PowerSupplies aus dem Warenkorb:', error);
        }
    }
}

customElements.define("powersupply-component", PowerSupplyComponent);
