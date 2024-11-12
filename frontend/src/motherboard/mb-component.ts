import { html, render } from "lit-html"
import { loadAllMotherboards } from "./mb-service"
import { Motherboard } from "src/model"

const tableTemplate = (mbs: Motherboard[]) => {
    const rows = mbs.map(mb => 
        html`
            <tr>
            <th>${mb.motherboard_id}</th>
            <th>${mb.name}</th>
            <th>${mb.price}</th> 
            <th>${mb.socket}</th>         
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
class MbComponent extends HTMLElement {
    async connectedCallback() {
        const todos = await loadAllMotherboards()
        render(tableTemplate(todos), this)
    }
}
customElements.define("mb-component", MbComponent)