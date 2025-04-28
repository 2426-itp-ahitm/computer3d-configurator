import { html, render } from "lit-html";
import { loadAllMotherboards } from "./mb-service";
import { Motherboard } from "./mb";
import { model, Model, subscribe } from "../model";

class MbComponent extends HTMLElement {
    addedMbId: number | null = null; // Initialisieren als null
    motherboards: Motherboard[] = []; // Zu speichernde Motherboards, die vom Service geladen werden

    async connectedCallback() {
        subscribe(model => {
            this.render(model);
        });

        // Lade alle Motherboards und speichere sie
        this.motherboards = await loadAllMotherboards();
        // Prüfe, ob bereits ein Motherboard im Warenkorb liegt
        await this.checkMbInCart();
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
                                ${this.addedMbId === mb.motherboard_id
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

    // Neue Methode zum Überprüfen, ob bereits ein Motherboard im Warenkorb liegt
    // Neue Methode zum Überprüfen, ob bereits ein Motherboard im Warenkorb liegt
    async checkMbInCart() {
        try {
            const response = await fetch(`http://localhost:8080/api/shoppingcart/get-by-id/${model.shoppingCartId}`);
            if (!response.ok) {
                throw new Error("Fehler beim Abrufen des Warenkorbs.");
            }
            const shoppingCart = await response.json();

            // Angenommen, shoppingCart.motherboard enthält ein Objekt mit den Motherboard-Daten
            if (shoppingCart.motherboard && shoppingCart.motherboard.name) {
                const matchingMb = this.motherboards.find(mb => mb.name === shoppingCart.motherboard.name);
                if (matchingMb) {
                    this.addedMbId = matchingMb.motherboard_id;

                    // Optional: Aktualisiere den angezeigten Namen
                    const mbNameElement = document.getElementById('mb-name');
                    if (mbNameElement) {
                        mbNameElement.textContent = `Motherboard: ${matchingMb.name}`;
                    }

                    // Filtere CPUs und RAMs basierend auf dem Sockel und RAM-Typ des gefundenen Motherboards
                    await this.filterComponentsBySocketAndRAM(matchingMb.ramType, matchingMb.socket);
                }
            }
        } catch (error) {
            console.error("Fehler beim Laden des Warenkorbs:", error);
        }
    }


    updateMotherboards(motherboards: Motherboard[]) {
        this.motherboards = motherboards;
        this.renderMotherboards(motherboards);
    }

    async addMotherboard(mbId: number, socket: string, ramType: string, mbName: string) {
        console.log("Motherboard ID hinzugefügt:", mbId);
        this.addedMbId = mbId;
        this.renderMotherboards(this.motherboards);  // Rendern nach dem Hinzufügen

        // API-Aufruf zum Hinzufügen des Motherboards zum Warenkorb
        await this.updateShoppingCart(mbId);

        // Lade die passenden Komponenten für das Motherboard
        await this.filterComponentsBySocketAndRAM(ramType, socket);

        // Aktualisiere den angezeigten Namen des Motherboards
        const mbNameElement = document.getElementById('mb-name');
        if (mbNameElement) {
            mbNameElement.textContent = `Motherboard: ${mbName}`;
        }
    }

    async updateShoppingCart(mbId: number) {
        console.log("Aktualisiere Warenkorb mit Motherboard ID:", mbId);

        try {
            const response = await fetch(`http://localhost:8080/api/shoppingcart/update-cart/${model.shoppingCartId}/motherboard/${mbId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Fehler beim Hinzufügen des Motherboards zum Warenkorb.');
            }

            const data = await response.json();
            console.log('Warenkorb erfolgreich aktualisiert:', data);
        } catch (error) {
            console.error('Fehler beim Aktualisieren des Warenkorbs:', error);
        }
    }

    async filterComponentsBySocketAndRAM(ramType: string, socket: string) {
        console.log("Filtere CPUs, RAMs, Motherboards und Cases für Sockel:", socket, "und RAM-Typ:", ramType);
    
        try {
            // --- CPUs filtern ---
            const cpuResponse = await fetch(`/api/cpus/by-motherboard-socket/${socket}`, { method: 'GET' });
            if (!cpuResponse.ok) throw new Error('Fehler beim Abrufen der CPUs.');
            const cpus = await cpuResponse.json();
            console.log('Gefilterte CPUs:', cpus);
    
            const cpuComponent = document.querySelector('cpu-component');
            if (cpuComponent && typeof (cpuComponent as any).updateCPUs === "function") {
                (cpuComponent as any).updateCPUs(cpus);
            }
    
            // --- RAMs filtern ---
            const ramResponse = await fetch(`/api/rams/by-Motherboard-Type/${ramType}`, { method: 'GET' });
            if (!ramResponse.ok) throw new Error('Fehler beim Abrufen der RAMs.');
            const rams = await ramResponse.json();
            console.log('Gefilterte RAMs:', rams);
    
            const ramComponent = document.querySelector('ram-component');
            if (ramComponent && typeof (ramComponent as any).updateRAMs === "function") {
                (ramComponent as any).updateRAMs(rams);
            }
    
            // --- Cases filtern ---
            // Hier kannst du den passenden CaseType wählen. Ich nehme als Beispiel das erste Mainboard-CaseType "Mid-Tower"
            const caseType = "Mid-Tower"; // Du kannst das auch dynamisch abhängig machen!
    
            const caseResponse = await fetch(`/api/cases/by-CaseType/${caseType}`, { method: 'GET' });
            if (!caseResponse.ok) throw new Error('Fehler beim Abrufen der Cases.');
            const cases = await caseResponse.json();
            console.log('Gefilterte Cases:', cases);
    
            const caseComponent = document.querySelector('case-component');
            if (caseComponent && typeof (caseComponent as any).updateCases === "function") {
                (caseComponent as any).updateCases(cases);
            }
    
            // --- Motherboards filtern ---
            const mbResponse = await fetch(`/api/motherboards/by-RAM-Type-CPU-Socket-Case-Type/${ramType}/${socket}/${caseType}`, { method: 'GET' });
            if (!mbResponse.ok) throw new Error('Fehler beim Abrufen der Motherboards.');
            const motherboards = await mbResponse.json();
            console.log('Gefilterte Motherboards:', motherboards);
    
            this.updateMotherboards(motherboards);
    
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
        this.renderMotherboards(this.motherboards);  // Rendern nach dem Entfernen

        // Name des Motherboards zurücksetzen
        const mbNameElement = document.getElementById('mb-name');
        if (mbNameElement) {
            mbNameElement.textContent = "Motherboard: ———";
        }

        // Entferne das Motherboard aus dem Warenkorb
        this.removeMotherboardFromCart(mbId);

        // Optionally, alle Komponenten zurückladen (CPUs und RAMs)
        this.loadAllCPUs().then(allCPUs => {
            const cpuComponent = document.querySelector('cpu-component');
            if (cpuComponent && typeof (cpuComponent as any).updateCPUs === "function") {
                (cpuComponent as any).updateCPUs(allCPUs);
            }
        });

        this.loadAllRAMs().then(allRAMs => {
            const ramComponent = document.querySelector('ram-component');
            if (ramComponent && typeof (ramComponent as any).updateRAMs === "function") {
                (ramComponent as any).updateRAMs(allRAMs);
            }
        });
    }

    async removeMotherboardFromCart(mbId: number) {
        console.log("Motherboard aus Warenkorb entfernen:", mbId);

        try {
            const response = await fetch(`http://localhost:8080/api/shoppingcart/remove-component/${model.shoppingCartId}/motherboard`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Fehler beim Entfernen des Motherboards aus dem Warenkorb.');
            }

            const data = await response.json();
            console.log('Motherboard erfolgreich aus dem Warenkorb entfernt:', data);
        } catch (error) {
            console.error('Fehler beim Entfernen des Motherboards aus dem Warenkorb:', error);
        }
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

    async loadAllCases() {
        try {
            const response = await fetch(`/api/cases`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Fehler beim Abrufen aller Cases.');
            }
    
            return await response.json();
        } catch (error) {
            console.error('Fehler beim Laden aller Cases:', error);
            return [];
        }
    }
    
}

customElements.define("mb-component", MbComponent);
