import { html, render } from "lit-html"
import "./cpu"
import "./motherboard"

const content = html`
        <h2 class="headerTitle">CPUs</h2>
        <cpu-component id="cpuAllBox"></cpu-component>
        <h2 class="headerTitle">Motherboards</h2>
        <mb-component id="mbAllBox"></mb-component>
`

class AppComponent extends HTMLElement {
    connectedCallback() {
        render(content, this)
    }
}
customElements.define("app-component", AppComponent)