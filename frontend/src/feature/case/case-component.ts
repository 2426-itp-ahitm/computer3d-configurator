import { html, render } from "lit-html";
import { loadAllCases } from "./case-service";
import { Case } from "./case";
import { Model, subscribe } from "../model";
import { model } from "../model";

class CaseComponent extends HTMLElement {
  addedCaseId: number | null = null;
  cases: Case[] = [];

  async connectedCallback() {
    // Reagiere auf Model-Updates
    subscribe((model: Model) => {
      this.render(model);
    });

    // Lade alle Cases über die API: http://localhost:8080/api/cases
    this.cases = await loadAllCases();

    // Prüfe, ob bereits ein Case im Warenkorb liegt
    await this.checkCaseInCart();

    // Render die Cases
    this.renderCases(this.cases);
  }

  render(model: Model) {
    // Annahme: model.case kann ein einzelnes Objekt oder ein Array sein
    const cases = Array.isArray(model.case) ? model.case : [model.case];
    this.renderCases(cases);
  }

  renderCases(cases: Case[]) {
    render(this.tableTemplate(cases), this);
  }

  tableTemplate(cases: Case[]) {
    const data = cases.map((c) =>
      html`
        <div class="CaseContainer">
          <div class="CaseDetails">
            <p class="CaseName"><strong>${c.name}</strong></p>
            <div class="ContentWrapper">
              <div class="Image">
                <img src="${c.img}" alt="${c.name}" />
              </div>
              <div class="Info">
                <div style="margin-bottom: 1vw">
                  <p>Preis: ${c.price} €</p>
                  <br />
                  <p>Typ: ${c.type}</p>
                  <br />
                  <p>Farbe: ${c.color}</p>
                </div>
                <div id="svgBox">
                  ${this.addedCaseId === c.case_id
                    ? html`
                        <svg
                          @click=${() => this.removeCase(c.case_id)}
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
                          @click=${() =>
                            this.addCase(c.case_id, c.name)}
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
                      `}
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    );
    return html`
      <style>
        /* Hier kannst du das Styling einfügen */
      </style>
      ${data}
    `;
  }

  // Prüft, ob bereits ein Case im Warenkorb liegt (Anpassung analog zu CPU)
  async checkCaseInCart() {
    try {
      const response = await fetch("http://localhost:8080/api/shoppingcart/get-by-id/1");
      if (!response.ok) {
        throw new Error("Fehler beim Abrufen des Warenkorbs.");
      }
      const shoppingCart = await response.json();

      // Annahme: shoppingCart.case enthält ein Objekt mit Case-Daten
      if (shoppingCart.case && shoppingCart.case.name) {
        const matchingCase = this.cases.find((c) => c.name === shoppingCart.case.name);
        if (matchingCase) {
          this.addedCaseId = matchingCase.case_id;
          const caseNameElement = document.getElementById("case-name");
          if (caseNameElement) {
            caseNameElement.textContent = `Case: ${matchingCase.name}`;
          }
        }
      }
    } catch (error) {
      console.error("Fehler beim Laden des Warenkorbs:", error);
    }
  }

  async addCase(caseId: number, caseName: string) {
    console.log("Case ID hinzugefügt:", caseId);
    this.addedCaseId = caseId;
    this.renderCases(this.cases);
    const caseNameElement = document.getElementById("case-name");
    if (caseNameElement) {
      caseNameElement.textContent = `Case: ${caseName}`;
    }
    // API-Aufruf zum Hinzufügen des Cases zum Warenkorb
    await this.updateShoppingCart(caseId);
  }

  async updateShoppingCart(caseId: number) {
    console.log("Aktualisiere Warenkorb mit Case ID:", caseId);
    try {
      const response = await fetch(
        `http://localhost:8080/api/shoppingcart/update-cart/${model.shoppingCartId}/case/${caseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Fehler beim Aktualisieren des Warenkorbs.");
      }
      const data = await response.json();
      console.log("Warenkorb erfolgreich aktualisiert:", data);
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Warenkorbs:", error);
    }
  }

  async removeCase(caseId: number) {
    console.log("Entferne Case ID:", caseId);
    try {
      const response = await fetch(
        `http://localhost:8080/api/shoppingcart/remove-component/${model.shoppingCartId}/case`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Fehler beim Entfernen des Cases aus dem Warenkorb.");
      }
      const data = await response.json();
      console.log("Case erfolgreich aus dem Warenkorb entfernt:", data);
      this.addedCaseId = null;
      this.renderCases(this.cases);
      const caseNameElement = document.getElementById("case-name");
      if (caseNameElement) {
        caseNameElement.textContent = `Case: ———`;
      }
    } catch (error) {
      console.error("Fehler beim Entfernen des Cases aus dem Warenkorb:", error);
    }
  }
}

customElements.define("case-component", CaseComponent);
