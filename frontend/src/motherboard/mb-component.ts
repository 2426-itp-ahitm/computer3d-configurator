import { html, render } from "lit-html"
import { loadAllMotherboards } from "./mb-service"
import { Motherboard } from "src/model"

const styles = html`
    <link rel="stylesheet" href="/components.css">
`

const tableTemplate = (mbs: Motherboard[]) => {
    const data = mbs.map(mb => 
        html`   
        <div class="MbContainer">
    <div class="MbDetails">
        <p class="MbName"><strong>${mb.name}</strong></p>
        <div class="ContentWrapper">
            <div class="Image">
                <img src="${mb.img}" alt="${mb.name}">
            </div>
            <div class="Info">
                <p>Preis: ${mb.price}</p>
                <p>Sockel: ${mb.socket}</p>
                <button class="addButton" onclick="addMotherboard(${mb.motherboard_id})">Hinzufügen</button>
            </div>
        </div>
    </div>
</div>                 
        `
    )
    return html`
    ${styles}
            ${data}      
`
}

class MbComponent extends HTMLElement {
    private motherboards: Motherboard[] = []; // Typisieren und initialisieren

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        this.motherboards = await loadAllMotherboards();
        this.renderMotherboards();
    }

    renderMotherboards() {
        render(tableTemplate(this.motherboards), this.shadowRoot!); // Typ-Anpassung
    }

    updateMotherboards(filteredMotherboards: Motherboard[]) {
        this.motherboards = filteredMotherboards;
        this.renderMotherboards();
    }
}

customElements.define("mb-component", MbComponent);
