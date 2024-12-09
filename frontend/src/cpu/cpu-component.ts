import { html, render } from "lit-html"
import { loadAllCPUs } from "./cpu-service"
import { CPU } from "src/model"

const styles = html`
    <link rel="stylesheet" href="/components.css">
`

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
        render(this.tableTemplate(this.cpus), this.shadowRoot); // Typ-Anpassung
    }

    // updateCPUs(filteredCpus: CPU[]) {
    //     this.cpus = filteredCpus;
    //     this.renderCPUs();
    // }

    tableTemplate = (cpus: CPU[]) => {
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
                    <!--<button class="addButton" onclick="addCpu(${cpu.cpu_id})">Hinzufügen</button>-->
                    <button class="addButton" @click=${() => this.addCpu(cpu.cpu_id)}>Press me!</button>
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

    addCpu(cpuid:number){
        const event = new CustomEvent("add-cpu", {detail: {cpuid}})
        this.dispatchEvent(event)
    }

}

customElements.define("cpu-component", CpuComponent)