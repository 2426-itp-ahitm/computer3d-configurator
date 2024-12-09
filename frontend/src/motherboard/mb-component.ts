import { html, render } from "lit-html"
import { loadAllMotherboards } from "./mb-service"
import { Motherboard } from "src/model"

const styles = html`
    <link rel="stylesheet" href="/components.css">
`

const tableTemplate = (mbs: Motherboard[]) => {
    const data = mbs.map(mb => 
        html`   
        <div class="MbContainer">
    <div class="MbDetails">
        <p class="MbName"><strong>${mb.name}</strong></p>
        <div class="ContentWrapper">
            <div class="Image">
                <img src="${mb.img}" alt="${mb.name}">
            </div>
            <div class="Info">
                <p>Preis: ${mb.price}</p>
                <p>Sockel: ${mb.socket}</p>
                <button class="addButton" onclick="addMotherboard(${mb.motherboard_id})">Hinzufügen</button>
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

class MbComponent extends HTMLElement {
    private motherboards: Motherboard[] = []; // Typisieren und initialisieren

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        this.motherboards = await loadAllMotherboards();
        this.renderMotherboards();
    }

    renderMotherboards() {
        render(tableTemplate(this.motherboards), this.shadowRoot!); // Typ-Anpassung
    }

    updateMotherboards(filteredMotherboards: Motherboard[]) {
        this.motherboards = filteredMotherboards;
        this.renderMotherboards();
    }
}

customElements.define("mb-component", MbComponent);

/*
// Funktion zum Abrufen und Einfügen des Motherboard-Namens
function addMotherboard(mbId) {
    fetch(`/api/motherboards/${mbId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht okay auf den Motherboard fetchcall');
        }
        return response.json();
    })
    .then(data => {
        console.log('Daten erhalten:', data);
        checkValidCPUs(data.socket);
        document.getElementById('motherboard-name').textContent = data.name;
    })
    .catch(error => {
        console.error('Fehler beim Abrufen der Daten:', error);
    });
}
function checkValidCPUs(socket) {
console.log("Überprüfe CPUs für den Socket: " + socket);

fetch(`/api/cpus`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
.then(response => {
    if (!response.ok) {
        throw new Error('Fehler beim Abrufen der CPUs.');
    }
    return response.json();
})
.then(data => {
    const filteredCpus = data.filter(cpu => cpu.socket === socket);
    console.log('Gefilterte CPUs:', filteredCpus);

    const cpuComponent = document.querySelector('cpu-component');
    if (cpuComponent) {
        cpuComponent.updateCPUs(filteredCpus);
    }
})
.catch(error => {
    console.error('Fehler beim Filtern der Motherboards:', error);
});
}*/
