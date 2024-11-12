import { html, render } from "lit-html"
import "./cpu"
import "./motherboard"

const content = html`
    <div class="container">
        <cpu-component></cpu-component>
    </div>
    <div class="container">
        <mb-component></mb-component>
    </div>
`

class AppComponent extends HTMLElement {
    connectedCallback() {
        render(content, this)
    }
}
customElements.define("app-component", AppComponent)