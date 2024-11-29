import { html, render } from "lit-html"
import { loadAllMotherboards } from "./mb-service"
import { Motherboard } from "src/model"

const tableTemplate = (mbs: Motherboard[]) => {
    const data = mbs.map(mb => 
        html`    
        <p>
            ${mb.name},
            ${mb.price}, 
            ${mb.socket}</p>          
        `
    )
    return html`
        <p>
            ${data}
        </p>
    </table>
`
}
class MbComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    async connectedCallback() {
        const mbs = await loadAllMotherboards()
        render(tableTemplate(mbs), this.shadowRoot)
        //const head = this.shadowRoot.querySelector("head")
        //console.log("head is", head)
    }
}
customElements.define("mb-component", MbComponent)