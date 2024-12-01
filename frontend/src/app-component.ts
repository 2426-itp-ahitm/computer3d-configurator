import { html, render } from "lit-html"
import "./cpu"
import "./motherboard"

const content = html`
        <h2>CPUs</h2>
        <cpu-component></cpu-component>
        <h2>Motherboards</h2>
        <mb-component></mb-component>
`

class AppComponent extends HTMLElement {
    connectedCallback() {
        render(content, this)
    }
}
customElements.define("app-component", AppComponent)