import { html, render } from "lit-html";
import { loadAllGPUs } from "./gpu-service";
import { Gpu } from "./gpu";
import { model, Model, subscribe } from "../model";

class GpuComponent extends HTMLElement {
    addedGpuId: number | null = null; // Initialisieren als null
    gpus: Gpu[] = []; // Zu speichernde GPUs, die vom Service geladen werden

    async connectedCallback() {
        subscribe(model => {
            this.render(model);
        });

        // Lade alle GPUs und speichere sie
        this.gpus = await loadAllGPUs();

        // Prüfe, ob bereits eine GPU im Warenkorb liegt
        await this.checkGpuInCart();

        this.renderGPUs(this.gpus);
    }

    render(model: Model) {
        const gpus = Array.isArray(model.gpu) ? model.gpu : [model.gpu];
        this.renderGPUs(gpus);
    }

    renderGPUs(gpus: Gpu[]) {
        render(this.tableTemplate(gpus), this);
    }

    tableTemplate(gpus: Gpu[]) {
        const data = gpus.map(gpu =>
            html`
                <div class="GpuContainer">
                    <div class="GpuDetails">
                        <p class="GpuName"><strong>${gpu.name}</strong></p>
                        <div class="ContentWrapper">
                            <div class="Image">
                                <img src="${gpu.img}" alt="${gpu.name}">
                            </div>
                            <div class="Info">
                            <div style="margin-bottom: 1vw">
                                <p>Preis: ${gpu.price} €</p>
                                <br>
                                <p>Speicher: ${gpu.memory} GB</p>
                            </div>
                            <div id="svgBox">    
                                ${
                                    this.addedGpuId === gpu.gpu_id
                                        ? html`
                                            <svg @click=${() => this.removeGpu(gpu.gpu_id)} width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 12H16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="darkred" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        `
                                        : html`
                                            <svg @click=${() => this.addGpu(gpu.gpu_id, gpu.name)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
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
                .GpuContainer {
                    /* Dein CSS hier */
                }
            </style>
            ${data}
        `;
    }

    updateGPUs(gpus: Gpu[]) {
        this.gpus = gpus;
        this.renderGPUs(gpus);
    }

    // Neue Methode zum Überprüfen, ob bereits eine GPU im Warenkorb liegt
    async checkGpuInCart() {
        try {
            const response = await fetch(`http://localhost:8080/api/shoppingcart/get-by-id/${model.shoppingCartId}`);
            if (!response.ok) {
                throw new Error("Fehler beim Abrufen des Warenkorbs.");
            }
            const shoppingCart = await response.json();
            
            // Angenommen, shoppingCart.gpu enthält ein Objekt mit den GPU-Daten
            if (shoppingCart.gpu && shoppingCart.gpu.name) {
                const matchingGpu = this.gpus.find(gpu => gpu.name === shoppingCart.gpu.name);
                if (matchingGpu) {
                    this.addedGpuId = matchingGpu.gpu_id;
                    
                    // Optional: Aktualisiere den angezeigten Namen
                    const gpuNameElement = document.getElementById('gpu-name');
                    if (gpuNameElement) {
                        gpuNameElement.textContent = `GPU: ${matchingGpu.name}`;
                    }
                }
            }
        } catch (error) {
            console.error("Fehler beim Laden des Warenkorbs:", error);
        }
    }

    async addGpu(gpuId: number, gpuName: string) {
        console.log("GPU ID hinzugefügt:", gpuId);
        this.addedGpuId = gpuId;
        this.renderGPUs(this.gpus);  // Jetzt nach dem Hinzufügen neu rendern

        const gpuNameElement = document.getElementById('gpu-name');
        if (gpuNameElement) {
            gpuNameElement.textContent = `GPU: ${gpuName}`;
        }

        // API-Aufruf zum Hinzufügen der GPU zum Warenkorb
        this.updateShoppingCart(gpuId);
    }

    async removeGpu(gpuId: number) {
        console.log("GPU ID entfernt:", gpuId);
        this.addedGpuId = null;
        this.renderGPUs(this.gpus);  // Alle GPUs wieder rendern

        const gpuNameElement = document.getElementById('gpu-name');
        if (gpuNameElement) {
            gpuNameElement.textContent = "GPU: ———";
        }

        // API-Aufruf zum Entfernen der GPU aus dem Warenkorb
        this.removeFromShoppingCart(gpuId);
    }

    // Funktion zum Aktualisieren des Warenkorbs (GPU hinzufügen)
    async updateShoppingCart(gpuId: number) {
        console.log("Aktualisiere Warenkorb mit GPU ID:", gpuId);

        try {
            const response = await fetch(`http://localhost:8080/api/shoppingcart/update-cart/${model.shoppingCartId}/gpu/${gpuId}`, {
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

    // Funktion zum Entfernen der GPU aus dem Warenkorb
    async removeFromShoppingCart(gpuId: number) {
        console.log("Entferne GPU ID aus dem Warenkorb:", gpuId);

        try {
            const response = await fetch(`http://localhost:8080/api/shoppingcart/remove-component/${model.shoppingCartId}/gpu`, {
                method: 'DELETE', // DELETE-Methode für das Entfernen
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Fehler beim Entfernen der GPU aus dem Warenkorb.');
            }

            const data = await response.json();
            console.log('GPU erfolgreich aus dem Warenkorb entfernt:', data);

            // GPU-ID zurücksetzen, da keine GPU mehr im Warenkorb ist
            this.addedGpuId = null;

            // Anzeige nach dem Entfernen neu rendern
            this.renderGPUs(this.gpus);

            // Anzeige des Texts zurücksetzen
            const gpuNameElement = document.getElementById("gpu-name");
            if (gpuNameElement) {
                gpuNameElement.textContent = "GPU: ———";
            }
        } catch (error) {
            console.error('Fehler beim Entfernen der GPU aus dem Warenkorb:', error);
        }
    }
}

customElements.define("gpu-component", GpuComponent);
