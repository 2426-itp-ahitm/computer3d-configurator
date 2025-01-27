import { html, render } from "lit-html";
import { loadAllCPUs } from "./cpu-service";
import { CPUModel, subscribe } from "../model";
import { CPU } from "src/model";

class CpuComponent extends HTMLElement {
    async connectedCallback() {
        subscribe((model: CPUModel) => {
            this.render(model);
        });
        await loadAllCPUs(); // Lädt die CPUs und aktualisiert das Model
    }

    render(model: CPUModel) {
        const { cpus, addedCpuId } = model;
        render(this.template(cpus, addedCpuId), this);
    }

    template(cpus: CPU[], addedCpuId: number | null) {
        return html`
            <style>
                .CpuContainer {
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 1rem;
                }
                .CpuDetails {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    border: 1px solid #ccc;
                    border-radius: 0.5rem;
                    padding: 1rem;
                    background-color: #f9f9f9;
                }
                .Image img {
                    max-height: 4rem;
                    border-radius: 0.5rem;
                }
                .addButton,
                .deleteButton {
                    cursor: pointer;
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 0.5rem;
                    color: white;
                }
                .addButton {
                    background-color: #4caf50;
                }
                .deleteButton {
                    background-color: #f44336;
                }
            </style>
            <div>
                ${cpus.map(
                    (cpu) => html`
                        <div class="CpuContainer">
                            <div class="CpuDetails">
                                <p class="CpuName"><strong>${cpu.name}</strong></p>
                                <div class="ContentWrapper">
                                    <div class="Image">
                                        <img src="${cpu.img}" alt="${cpu.name}" />
                                    </div>
                                    <div class="Info">
                                        <p>Preis: ${cpu.price} €</p>
                                        <p>Sockel: ${cpu.socket}</p>
                                        ${
                                            addedCpuId === cpu.cpu_id
                                                ? html`
                                                      <button
                                                          class="deleteButton"
                                                          @click=${() => this.removeCpu(cpu.cpu_id)}
                                                      >
                                                          Entfernen
                                                      </button>
                                                  `
                                                : html`
                                                      <button
                                                          class="addButton"
                                                          @click=${() =>
                                                              this.addCpu(cpu.cpu_id, cpu.socket, cpu.name)}
                                                      >
                                                          Hinzufügen
                                                      </button>
                                                  `
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                )}
            </div>
        `;
    }

    async addCpu(cpuId: number, socket: string, cpuName: string) {
        const model = await CPUModel.addCpu(cpuId, socket, cpuName);
        this.render(model);
    }

    async removeCpu(cpuId: number) {
        const model = await CPUModel.removeCpu(cpuId);
        this.render(model);
    }
}

customElements.define("cpu-component", CpuComponent);
