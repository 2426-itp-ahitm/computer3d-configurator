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
        console.log(cpuid);
    }

    /*// Funktion zum Umschalten der Accordion-Sektion
    document.querySelector('.accordion-button').addEventListener('click', function () {
        const content = document.querySelector('.accordion-content');
        content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + 'px';
    });

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

    function addCpu(cpuId) {
        fetch(`/api/cpus/${cpuId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht okay auf den CPU fetchcall');
            }
            return response.json();
        })
        .then(data => {
            console.log('Daten erhalten:', data);
            checkForValidMotherboards(data.socket);
            document.getElementById('cpu-name').textContent = data.name;
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Daten:', error);
        });
    }

    function checkForValidMotherboards(socket) {
    console.log("Überprüfe Motherboards für den Socket: " + socket);

    fetch(`/api/motherboards`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Fehler beim Abrufen der Motherboards.');
        }
        return response.json();
    })
    .then(data => {
        const filteredMotherboards = data.filter(mb => mb.socket === socket);
        console.log('Gefilterte Motherboards:', filteredMotherboards);

        const mbComponent = document.querySelector('mb-component');
        if (mbComponent) {
            mbComponent.updateMotherboards(filteredMotherboards);
        }
    })
    .catch(error => {
        console.error('Fehler beim Filtern der Motherboards:', error);
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

}

customElements.define("cpu-component", CpuComponent)