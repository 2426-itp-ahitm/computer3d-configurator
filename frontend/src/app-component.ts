import { html, render } from "lit-html"
import "./feature/cpu/cpu-component"
import "./feature/motherboard/mb-component"

const content = html`
        <h3 class="headerTitle">CPUs</h2>
        <cpu-component id="cpuAllBox"></cpu-component>
        <h3 class="headerTitle">Motherboards</h2>
        <mb-component id="mbAllBox"></mb-component>
`

class AppComponent extends HTMLElement {
    connectedCallback() {
        render(content, this)
    }
}
customElements.define("app-component", AppComponent)