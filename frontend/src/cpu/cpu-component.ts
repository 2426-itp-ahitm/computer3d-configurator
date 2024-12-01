import { html, render } from "lit-html"
import { loadAllCPUs } from "./cpu-service"
import { CPU } from "src/model"



const tableTemplate = (cpus: CPU[]) => {
    const data = cpus.map(cpu =>
        html`
        <div class="CpuContainer">
    <div class="CpuDetails">
        <p class="CpuName"><strong>${cpu.name}</strong></p>
        <div class="ContentWrapper">
            <div class="Image">
                <img src="${cpu.img}" alt="${cpu.name}">
            </div>
            <div class="Info">
                <p>Preis: ${cpu.price}</p>
                <p>Sockel: ${cpu.socket}</p>
                <button class="addButton" onclick="addCpu(${cpu.cpu_id})">Hinzufügen</button>
            </div>
        </div>
    </div>
</div>        
        `
    )
    return html`
            ${data}
    <style>
       .CpuContainer {
        background-color: rgba(255, 255, 255, 0.409);
        color: white;
        padding: 1vw;
        margin: 1vw;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .CpuDetails {
        color: black;
        display: flex;
        flex-direction: column;
    }

    .CpuName {
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
class CpuComponent extends HTMLElement {

    private cpus: CPU[] = []; // Typisieren und initialisieren

    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }
    async connectedCallback() {
        this.cpus = await loadAllCPUs()
        this.renderCPUs();
    }

    renderCPUs() {
        render(tableTemplate(this.cpus), this.shadowRoot!); // Typ-Anpassung
    }

    updateCPUs(filteredCpus: CPU[]) {
        this.cpus = filteredCpus;
        this.renderCPUs();
    }

}
customElements.define("cpu-component", CpuComponent)