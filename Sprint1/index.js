/**
* Funktion zum Erstellen der Motherboard- und CPU-Elemente
* @param {*} data - Die Daten, die Motherboards und CPUs enthalten
*/
function createDivs(data) {
    let motherboards = data.motherboards;

    const container = document.querySelector('#data-container');
    container.innerHTML = '';

    /**
     * Funktion zum Erstellen der CPU-Elemente als Liste
     * @param {*} cpus - Array von CPUs, die angezeigt werden sollen
     * @param {*} parentElement - Das übergeordnete Element, dem die CPU-Liste hinzugefügt wird
     */
    function createCpuList(cpus, parentElement) {
        const cpuList = document.createElement('ul');
        cpuList.className = 'cpu-list';

        cpus.forEach(cpu => {
            const cpuItem = document.createElement('li');
            cpuItem.innerHTML = `${cpu.name} - Socket: ${cpu.socket} - Price: $${cpu.price}`;
            cpuList.appendChild(cpuItem);
        });

        parentElement.appendChild(cpuList);
    }

    // Check for motherboards data
    if (motherboards && motherboards.length > 0) {
        motherboards.forEach(mb => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';

            itemDiv.innerHTML = `
                <h3>${mb.name}</h3>
                <p>Socket: ${mb.socket}</p>
                <p>Price: $${mb.price}</p>
            `;

            // Erstelle einen Container für die CPUs (versteckt)
            const cpuContainer = document.createElement('div');
            cpuContainer.className = 'cpu-container';
            itemDiv.appendChild(cpuContainer);

            /**
             * Event-Listener für den Klick auf das Motherboard
             * Wenn das Motherboard geklickt wird, werden die zugehörigen CPUs angezeigt oder versteckt.
             */
            itemDiv.addEventListener('click', () => {
                if (cpuContainer.style.maxHeight) {
                    // Verstecke den CPU-Container, wenn er bereits sichtbar ist
                    cpuContainer.style.maxHeight = null;
                } else {
                    const matchingCPUs = data.CPUs.filter(cpu => cpu.socket === mb.socket);

                    // Entferne bisherige CPUs, falls vorhanden
                    cpuContainer.innerHTML = '';
                    createCpuList(matchingCPUs, cpuContainer);

                    // Zeige den CPU-Container an
                    cpuContainer.style.maxHeight = cpuContainer.scrollHeight + 'px';
                }
            });

            container.appendChild(itemDiv);
        });
    } else {
        console.error('No motherboards data available to display.');
    }
}

fetch('https://my-json-server.typicode.com/2426-itp-AHITM/computer3d-configurator/db')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        createDivs(data);
    })
    .catch(error => console.error('Fehler beim Abrufen der Daten:', error));