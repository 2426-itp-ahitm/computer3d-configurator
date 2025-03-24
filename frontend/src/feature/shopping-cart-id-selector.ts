import { html, render } from "lit-html";
import { model } from "./model";  // Importiere das Modell, um auf das globale Model zuzugreifen

class ShoppingCartIdSelectorComponent extends HTMLElement {
    newShoppingCartId: number = 0;  // Speichert die neue Warenkorb-ID des Benutzers, immer eine Zahl

    connectedCallback() {
        this.render();
    }

    // Funktion, um die ID im Modell zu setzen und weiterzuleiten
    setShoppingCartId() {
        // Überprüfe, ob newShoppingCartId eine gültige Zahl ist
        if (this.newShoppingCartId !== undefined) {
            // Setze die neue ID im Modell über den Proxy
            model.shoppingCartId = this.newShoppingCartId;

            // Rückmeldung für den Benutzer
            console.log(`Warenkorb-ID auf ${this.newShoppingCartId} gesetzt`);

            // Rufe render auf, um die app-component anzuzeigen
            this.render();
        } else {
            console.log('Ungültige Warenkorb-ID');
        }
    }

    // Rendern der Komponente
    render() {
        // Wenn eine Warenkorb-ID existiert, rendern wir die app-component und entfernen shopping-cart-id-selector
        if (this.newShoppingCartId > 0) {
            // Entferne diese Komponente, da sie nicht mehr benötigt wird
            this.remove();
            // Render die app-component
            const appComponent = document.createElement("app-component");
            document.body.appendChild(appComponent);
        } else {
            // Andernfalls rendern wir das Formular zum Setzen der Warenkorb-ID
            render(html`
                <div>
                    <label for="cartIdInput">Warenkorb-ID:</label>
                    <input
                        type="number"
                        id="cartIdInput"
                        .value=${this.newShoppingCartId}
                        @input=${(e: Event) => {
                            const value = (e.target as HTMLInputElement).value;
                            const parsedValue = parseInt(value, 10);

                            // Setze den Wert direkt, wenn er eine gültige Zahl ist
                            this.newShoppingCartId = isNaN(parsedValue) ? 0 : parsedValue;
                            console.log('Aktualisierte ID:', this.newShoppingCartId);
                        }}
                    />
                    <button @click=${() => this.setShoppingCartId()}>Warenkorb-ID setzen</button>
                </div>
            `, this);
        }
    }
}

customElements.define("shopping-cart-id-selector", ShoppingCartIdSelectorComponent);
