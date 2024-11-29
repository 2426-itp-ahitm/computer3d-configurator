import { html, render } from "lit-html"
import { loadAllCPUs } from "./cpu-service"
import { CPU } from "src/model"

const tableTemplate = (cpus: CPU[]) => {
    const rows = cpus.map(cpu => 
        html`
            <tr>
            <th>${cpu.cpu_id}</th>
            <th>${cpu.name}</th>
            <th>${cpu.price}</th> 
            <th>${cpu.socket}</th>         
            </tr>
        `
    )
    return html`
    <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Socket</th>
            </tr>
        </thead>
        <tbody>
            ${rows}
        </tbody>
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