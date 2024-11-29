import { html, render } from "lit-html"
import { loadAllCPUs } from "./cpu-service"
import { CPU } from "src/model"

const tableTemplate = (cpus: CPU[]) => {
    const rows = cpus.map(cpu => 
        html`
            <p>
            ${cpu.name},
            ${cpu.price},
            ${cpu.socket}</p>         
        `
    )
    return html`
            ${rows}
    </table>
`
}
class CpuComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    async connectedCallback() {
        const cpus = await loadAllCPUs()
        render(tableTemplate(cpus), this.shadowRoot)
        //const head = this.shadowRoot.querySelector("head")
        //console.log("head is", head)
    }
}
customElements.define("cpu-component", CpuComponent)