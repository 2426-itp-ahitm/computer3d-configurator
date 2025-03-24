import { html, render } from "lit-html";
import "../app-component";  // Die app-component muss importiert werden
import {model, Model} from "../feature/model"

class ShoppingCartComponent extends HTMLElement {
    shoppingCartId = null;

    connectedCallback() {
        this.render();
    }

    async createShoppingCart() {
        try {
            const response = await fetch("http://localhost:8080/api/shoppingcart/createShoppingCart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: null, 
                }),
            });

            if (!response.ok) {
                throw new Error("Fehler beim Erstellen des Warenkorbs");
            }

            const data = await response.json();
            console.log(data)
            this.shoppingCartId = data.id;  // ID aus der API-Antwort erhalten
            
            //localStorage.setItem("shoppingCartId", this.shoppingCartId.toString());
            model.shoppingCartId = this.shoppingCartId;  // Modell aktualisieren

            // Jetzt rendern wir die app-component, nachdem der Warenkorb erstellt wurde
            this.render();
        } catch (error) {
            console.error("Fehler beim Erstellen des Warenkorbs:", error);
        }
    }

    render() {
        // Wenn eine Warenkorb-ID existiert, rendern wir die app-component
        if (this.shoppingCartId) {
            render(html`<app-component></app-component>`, this);
        } else {
            // Andernfalls rendern wir den Button zum Erstellen des Warenkorbs
            render(html`
                <button @click=${() => this.createShoppingCart()}>Warenkorb erstellen</button>
            `, this);
        }
    }
}

customElements.define("shopping-cart-component", ShoppingCartComponent);
