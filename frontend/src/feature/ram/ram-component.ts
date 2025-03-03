import { html, render } from "lit-html";
import { loadAllRams } from "./ram-service";
import { Ram } from "./ram";
import { model, Model, subscribe } from "../model";  // Importiere auch 'model'

class RamComponent extends HTMLElement {
  addedRamId: number | null = null; // Initialisieren als null
  rams: Ram[] = []; // Zu speichernde RAMs, die vom Service geladen werden
  filteredMotherboards: any[] = []; // Array für gefilterte Motherboards

  async connectedCallback() {
    subscribe((model: Model) => {
      this.render(model);
    });

    // Lade alle RAMs und speichere sie
    this.rams = await loadAllRams();

    // Prüfe, ob bereits ein RAM im Warenkorb liegt
    await this.checkRamInCart();

    this.renderRAMs(this.rams);
  }

  render(model: Model) {
    // Falls model.ram kein Array ist, packe es in ein Array
    const rams = Array.isArray(model.ram) ? model.ram : [model.ram];
    this.renderRAMs(rams);
  }

  renderRAMs(rams: Ram[]) {
    render(this.tableTemplate(rams), this);
  }

  tableTemplate(rams: Ram[]) {
    const data = rams.map((ram: Ram) =>
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
                          <svg
                            @click=${() => this.removeRam(ram.ram_id)}
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
                            @click=${() => this.addRam(ram.ram_id, ram.type, ram.name)}
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
  async checkRamInCart() {
    try {
      const response = await fetch("http://localhost:8080/api/shoppingcart/get-by-id/1");
      if (!response.ok) {
        throw new Error("Fehler beim Abrufen des Warenkorbs.");
      }
      const shoppingCart = await response.json();
      
      // Angenommen, shoppingCart.ram enthält ein Objekt mit den RAM-Daten
      if (shoppingCart.ram && shoppingCart.ram.name) {
        const matchingRam = this.rams.find(ram => ram.name === shoppingCart.ram.name);
        if (matchingRam) {
          this.addedRamId = matchingRam.ram_id;
          
          // Optional: Aktualisiere den angezeigten Namen
          const ramNameElement = document.getElementById("ram-name");
          if (ramNameElement) {
            ramNameElement.textContent = `RAM: ${matchingRam.name}`;
          }
        }
      }
    } catch (error) {
      console.error("Fehler beim Laden des Warenkorbs:", error);
    }
  }

  updateRAMs(rams: Ram[]) {
    this.rams = rams;
    this.renderRAMs(rams);
  }

  async addRam(ramId: number, ramType: string, ramName: string) {
    console.log("RAM ID hinzugefügt:", ramId);
    this.addedRamId = ramId;
    this.renderRAMs(this.rams);  // Neu rendern nach dem Hinzufügen
  
    const ramNameElement = document.getElementById("ram-name");
    if (ramNameElement) {
      ramNameElement.textContent = `RAM: ${ramName}`;
    }
  
    // API-Aufruf zum Hinzufügen des RAMs zum Warenkorb
    await this.updateShoppingCart(ramId);
  
    // Nutze die neue Methode, um Motherboards basierend auf den im Warenkorb ausgewählten Komponenten zu filtern
    await this.filterMotherboardsBySelectedComponents();
  }
  

  async updateShoppingCart(ramId: number) {
    console.log("Aktualisiere Warenkorb mit RAM ID:", ramId);

    try {
      const response = await fetch(`http://localhost:8080/api/shoppingcart/update-cart/${model.shoppingCartId}/ram/${ramId}`, {
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

  async filterMotherboardsBySelectedComponents() {
    try {
      // Hole den Warenkorb, um die ausgewählten Komponenten zu ermitteln
      const response = await fetch("http://localhost:8080/api/shoppingcart/get-by-id/1");
      if (!response.ok) {
        throw new Error("Fehler beim Abrufen des Warenkorbs.");
      }
      const shoppingCart = await response.json();
  
      // Prüfe, ob ein RAM ausgewählt wurde
      if (shoppingCart.ram && shoppingCart.ram.type) {
        const ramType = shoppingCart.ram.type;
        let endpoint: string;
  
        // Falls eine CPU ausgewählt wurde, filtere nach CPU-Socket und RAM-Typ
        if (shoppingCart.cpu && shoppingCart.cpu.socket) {
          const cpuSocket = shoppingCart.cpu.socket;
          console.log("Filtere Motherboards mit CPU-Socket:", cpuSocket, "und RAM-Typ:", ramType);
          endpoint = `http://localhost:8080/api/motherboards/by-RAM-Type-And-CPU-Socket/${ramType}/${cpuSocket}`;
        } else {
          // Falls keine CPU ausgewählt wurde, filtere nur nach RAM-Typ
          console.log("Nur RAM ausgewählt. Filtere Motherboards nur nach RAM-Typ:", ramType);
          endpoint = `http://localhost:8080/api/motherboards/by-RAM-Type/${ramType}`;
        }
  
        const filterResponse = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!filterResponse.ok) {
          throw new Error("Fehler beim Abrufen der gefilterten Motherboards.");
        }
        const filteredMotherboards = await filterResponse.json();
        console.log("Gefilterte Motherboards:", filteredMotherboards);
  
        // Übergib die gefilterten Motherboards an das mb-component
        const mbComponent = document.querySelector("mb-component");
        if (mbComponent && typeof (mbComponent as any).updateMotherboards === "function") {
          (mbComponent as any).updateMotherboards(filteredMotherboards);
        }
      } else {
        console.error("Kein RAM ausgewählt. Filterung kann nicht durchgeführt werden.");
      }
    } catch (error) {
      console.error("Fehler beim Filtern der Motherboards:", error);
    }
  }
  
  

  async filterMotherboardsByRamType(ramType: string) {
    // Ermitteln des ausgewählten CPU-Sockets aus dem globalen Model
    const selectedCpuSocket = model.cpuSocket;
    if (!selectedCpuSocket) {
      console.error("Kein CPU-Socket ausgewählt, daher kann die Filterung nicht erfolgen.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/api/motherboards/by-RAM-Type-And-CPU-Socket/${ramType}/${selectedCpuSocket}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Fehler beim Abrufen der Motherboards.");
      }
      const filteredMotherboards = await response.json();
      console.log("Gefilterte Motherboards:", filteredMotherboards);
      const mbComponent = document.querySelector("mb-component");
      if (mbComponent && typeof (mbComponent as any).updateMotherboards === "function") {
        (mbComponent as any).updateMotherboards(filteredMotherboards);
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der gefilterten Motherboards:", error);
    }
  }

  async removeRam(ramId: number) {
    console.log("Entferne RAM ID:", ramId);

    // API-Aufruf zum Entfernen des RAMs aus dem Warenkorb
    try {
      const response = await fetch(`http://localhost:8080/api/shoppingcart/remove-component/${model.shoppingCartId}/ram`, {
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
      this.addedRamId = null;

      // Anzeige nach dem Entfernen neu rendern
      this.renderRAMs(this.rams);

      // Anzeige des Texts zurücksetzen
      const ramNameElement = document.getElementById("ram-name");
      if (ramNameElement) {
        ramNameElement.textContent = "RAM: ———";
      }
    } catch (error) {
      console.error('Fehler beim Entfernen des RAMs aus dem Warenkorb:', error);
    }
  }
}

customElements.define("ram-component", RamComponent);
