import { html, render } from "lit-html"
import { loadAllMotherboards } from "./mb-service"
import { Motherboard } from "src/model"

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
            ${data}      
    <style>
         .MbContainer {
            background-color: rgba(255, 255, 255, 0.409);
        color: white;
        padding: 1vw;
        margin: 1vw;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .MbDetails {
        color: black;
        display: flex;
        flex-direction: column;
    }

    .MbName {
        color: white;
        font-size: 1.5vw;
        margin-bottom: 1vw;
    }

    .ContentWrapper {
        display: flex;
        align-items: center;
    }

    .Image img {
        mix-blend-mode: multiply;
        width: 10vw;
        height: auto;
        margin-right: 1.5vw;
    }

    .Info {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .addButton {
        background-color: black;
        color: white;
        border: none;
        padding: 0.8vw 1.5vw;
        font-size: 1vw;
        cursor: pointer;
        border-radius: 1vw;
        margin-top: 1vw;
    }

    .addButton:hover {
        background-color: #444;
    }
    </style>
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
