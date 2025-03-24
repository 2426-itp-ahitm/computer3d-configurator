import { html, render } from "lit-html";
import { loadAllInternalHardDrive } from "./internalHardDrive-service";
import { InternalHardDrive } from "./internalHardDrive";
import { model, Model, subscribe } from "../model";  // Importiere auch 'model'

class InternalHardDriveComponent extends HTMLElement {
  addedInternalHardDrivesId: number | null = null; // Initialisieren als null
  internalHardDrives: InternalHardDrive[] = []; // Zu speichernde RAMs, die vom Service geladen werden
  

  async connectedCallback() {
    subscribe((model: Model) => {
      this.render(model);
    });

    // Lade alle RAMs und speichere sie
    this.internalHardDrives = await loadAllInternalHardDrive();

    // Prüfe, ob bereits ein RAM im Warenkorb liegt
    await this.checkInternalHardDriveInCart();

    this.renderInternalHardDrives(this.internalHardDrives);
  }

  render(model: Model) {
    // Falls model.ram kein Array ist, packe es in ein Array
    const internalHardDrives = Array.isArray(model.internalHardDrive) ? model.internalHardDrive : [model.internalHardDrive];
    this.renderInternalHardDrives(internalHardDrives);
  }

  renderInternalHardDrives(internalHardDrives: InternalHardDrive[]) {
    render(this.tableTemplate(internalHardDrives), this);
  }

  tableTemplate(internalHardDrives: InternalHardDrive[]) {
    const data = internalHardDrives.map((internalHardDrive: InternalHardDrive) =>
      html`
        <div class="InternalHardDriveContainer">
          <div class="InternalHardDriveDetails">
            <p class="InternalHardDriveName"><strong>${internalHardDrive.name}</strong></p>
            <div class="ContentWrapper">
              <div class="Image">
                <img src="${internalHardDrive.image}" alt="${internalHardDrive.name}">
              </div>
              <div class="Info">
                <div style="margin-bottom: 1vw">
                  <p>Preis: ${internalHardDrive.price ? internalHardDrive.price + " €" : "N/A"}</p>
                  <br>
                  <p>Typ: ${internalHardDrive.type}</p>
                </div>
                <div id="svgBox">
                  ${
                    this.addedInternalHardDrivesId === internalHardDrive.internalHarddrive_id
                      ? html`
                          <svg
                            @click=${() => this.removeInternalHardDrive(internalHardDrive.internalHarddrive_id)}
                            width="50"
                            height="50"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 12H16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                              stroke="darkred"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        `
                      : html`
                          <svg
                            @click=${() => this.addInternalHardDrive(internalHardDrive.internalHarddrive_id, internalHardDrive.type, internalHardDrive.name)}
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="50"
                            height="50"
                            viewBox="0 0 50 50"
                          >
                            <path
                              d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M37,26H26v11h-2V26H13v-2h11V13h2v11h11V26z"
                            ></path>
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

  // Neue Methode zum Überprüfen, ob bereits ein RAM im Warenkorb liegt
  async checkInternalHardDriveInCart() {
    try {
      const response = await fetch(`http://localhost:8080/api/shoppingcart/get-by-id/${model.shoppingCartId}`);
      if (!response.ok) {
        throw new Error("Fehler beim Abrufen des Warenkorbs.");
      }
      const shoppingCart = await response.json();
      
      // Angenommen, shoppingCart.ram enthält ein Objekt mit den RAM-Daten
      if (shoppingCart.internalHardDrive && shoppingCart.internalHardDrive.name) {
        const matchingInternalHardDrive = this.internalHardDrives.find(internalHardDrive => internalHardDrive.name === shoppingCart.internalHardDrive.name);
        if (matchingInternalHardDrive) {
          this.addedInternalHardDrivesId = matchingInternalHardDrive.internalHarddrive_id;
          
          // Optional: Aktualisiere den angezeigten Namen
          const internalHardDriveNameElement = document.getElementById("internalHardDrive-name");
          if (internalHardDriveNameElement) {
            internalHardDriveNameElement.textContent = `InternalHardDrive: ${matchingInternalHardDrive.name}`;
          }
        }
      }
    } catch (error) {
      console.error("Fehler beim Laden des Warenkorbs:", error);
    }
  }

  updateInternalHardDrives(internalHardDrives: InternalHardDrive[]) {
    this.internalHardDrives = internalHardDrives;
    this.renderInternalHardDrives(internalHardDrives);
  }

  async addInternalHardDrive(internalHardDriveId: number, internalHardDriveType: string, internalHardDriveName: string) {
    console.log("InternalHardDrive ID hinzugefügt:", internalHardDriveId);
    this.addedInternalHardDrivesId = internalHardDriveId;
    this.renderInternalHardDrives(this.internalHardDrives);  // Neu rendern nach dem Hinzufügen
  
    const internalHardDriveNameElement = document.getElementById("internalHardDrive-name");
    if (internalHardDriveNameElement) {
      internalHardDriveNameElement.textContent = `InternalHardDrive: ${internalHardDriveName}`;
    }
  
    // API-Aufruf zum Hinzufügen des RAMs zum Warenkorb
    await this.updateShoppingCart(internalHardDriveId);
  
    // Nutze die neue Methode, um Motherboards basierend auf den im Warenkorb ausgewählten Komponenten zu filtern
    //await this.filterMotherboardsBySelectedComponents();
  }
  

  async updateShoppingCart(internalHardDriveId: number) {
    console.log("Aktualisiere Warenkorb mit InternalHardDrive ID:", internalHardDriveId);

    try {
      const response = await fetch(`http://localhost:8080/api/shoppingcart/update-cart/${model.shoppingCartId}/internalharddrive/${internalHardDriveId}`, {
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

  async removeInternalHardDrive(internalHardDriveId: number) {
    console.log("Entferne internalHardDrive ID:", internalHardDriveId);

    // API-Aufruf zum Entfernen des RAMs aus dem Warenkorb
    try {
      const response = await fetch(`http://localhost:8080/api/shoppingcart/remove-component/${model.shoppingCartId}/internalharddrive`, {
        method: 'DELETE', // DELETE-Methode für das Entfernen
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Fehler beim Entfernen des RAMs aus dem Warenkorb.');
      }

      const data = await response.json();
      console.log('RAM erfolgreich aus dem Warenkorb entfernt:', data);

      // RAM-ID zurücksetzen, da kein RAM mehr im Warenkorb ist
      this.addedInternalHardDrivesId = null;

      // Anzeige nach dem Entfernen neu rendern
      this.renderInternalHardDrives(this.internalHardDrives);

      // Anzeige des Texts zurücksetzen
      const ramNameElement = document.getElementById("internalHardDrive-name");
      if (ramNameElement) {
        ramNameElement.textContent = "InternalHardDrive: ———";
      }
    } catch (error) {
      console.error('Fehler beim Entfernen des RAMs aus dem Warenkorb:', error);
    }
  }
}

customElements.define("internalharddrive-component", InternalHardDriveComponent);
