// Daten abrufen und initiale Anzeige der Motherboards erstellen
/*fetch('https://my-json-server.typicode.com/2426-itp-AHITM/computer3d-configurator/db')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        createDivs(data);

        // Referenzen für das Suchfeld und die Buttons
        const cpuSearchInput = document.querySelector('#cpu-search');
        const mbSearchInput = document.querySelector('#motherboard-search');
        const suggestionsList = document.querySelector('#suggestions-list');
        const addCpuBtn = document.querySelector('#add-cpu-btn');
        const addMbBtn = document.querySelector('#add-mb-btn');
        const selectedItemsList = document.querySelector('#selected-items-list');

        let selectedCpu = null;
        let selectedMotherboard = null;

        // Event-Listener für die Suche nach Komponenten (CPU oder Motherboard)
        function searchItems() {
            const cpuSearchTerm = cpuSearchInput.value.toLowerCase().trim();
            const mbSearchTerm = mbSearchInput.value.toLowerCase().trim();

            suggestionsList.innerHTML = '';

            if (cpuSearchTerm) {
                // Suchen nach CPUs, die den Suchbegriff entsprechen
                const matchingCPUs = data.CPUs.filter(cpu =>
                    cpu.name.toLowerCase().includes(cpuSearchTerm)
                );

                // Anzeigen der CPU-Vorschläge
                matchingCPUs.forEach(cpu => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${cpu.name} - Socket: ${cpu.socket} - Price: $${cpu.price}`;
                    listItem.addEventListener('click', () => {
                        selectedCpu = cpu;
                        cpuSearchInput.value = cpu.name; // Suchfeld aktualisieren
                        suggestionsList.innerHTML = ''; // Vorschläge zurücksetzen
                    });
                    suggestionsList.appendChild(listItem);
                });
            } else if (mbSearchTerm) {
                // Suchen nach Motherboards, die den Suchbegriff entsprechen
                const matchingMotherboards = data.motherboards.filter(mb =>
                    mb.name.toLowerCase().includes(mbSearchTerm)
                );

                // Anzeigen der Motherboard-Vorschläge
                matchingMotherboards.forEach(mb => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${mb.name} - Socket: ${mb.socket} - Price: $${mb.price}`;
                    listItem.addEventListener('click', () => {
                        selectedMotherboard = mb;
                        mbSearchInput.value = mb.name; // Suchfeld aktualisieren
                        suggestionsList.innerHTML = ''; // Vorschläge zurücksetzen
                    });
                    suggestionsList.appendChild(listItem);
                });
            }
        }

        // Event-Listener für die Suche nach CPUs und Motherboards
        cpuSearchInput.addEventListener('input', searchItems);
        mbSearchInput.addEventListener('input', searchItems);

        // Event-Listener für das Hinzufügen einer CPU zur Liste
        addCpuBtn.addEventListener('click', () => {
            if (selectedCpu) {
                // Entfernen des vorherigen CPU-Elements, falls vorhanden
                const existingCpu = selectedItemsList.querySelector('.cpu-item');
                if (existingCpu) {
                    selectedItemsList.removeChild(existingCpu);
                }

                // Hinzufügen der ausgewählten CPU zur Liste
                addItemToList(selectedCpu, 'cpu');
                selectedCpu = null; // Zurücksetzen der Auswahl
                cpuSearchInput.value = ''; // Suchfeld leeren
            } else {
                alert('Please select a CPU before adding.');
            }
        });

        // Event-Listener für das Hinzufügen eines Motherboards zur Liste
        addMbBtn.addEventListener('click', () => {
            if (selectedMotherboard) {
                // Entfernen des vorherigen Motherboard-Elements, falls vorhanden
                const existingMb = selectedItemsList.querySelector('.motherboard-item');
                if (existingMb) {
                    selectedItemsList.removeChild(existingMb);
                }
                // Hinzufügen des ausgewählten Motherboards zur Liste
                addItemToList(selectedMotherboard, 'motherboard');

                selectedMotherboard = null; // Zurücksetzen der Auswahl
                mbSearchInput.value = ''; // Suchfeld leeren

            } else {
                alert('Please select a Motherboard before adding.');
            }
        });

        let mbsocket = "";
        let cpusocket = "";

        // Funktion zum Hinzufügen eines ausgewählten Elements zur Liste
        function addItemToList(item, type) {
            // Überprüfe die Kompatibilität, bevor etwas hinzugefügt wird
            if (type === 'cpu') {
                if (mbsocket && mbsocket !== item.socket) {
                    alert('MB and CPU not compatible!');
                    return; // Stoppe das Hinzufügen der CPU zur Liste
                }
            } else if (type === 'motherboard') {
                if (cpusocket && cpusocket !== item.socket) {
                    alert('MB and CPU not compatible!');
                    return; // Stoppe das Hinzufügen des Motherboards zur Liste
                }
            }

            // Wenn kompatibel, füge das Element zur Liste hinzu
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - Socket: ${item.socket} - Price: $${item.price}`;
            listItem.classList.add(type + '-item');
            selectedItemsList.appendChild(listItem);

            // Speichern der Sockets für spätere Überprüfungen
            if (type === 'motherboard') {
                mbsocket = item.socket; // Speichere den Socket des Motherboards
            } else if (type === 'cpu') {
                cpusocket = item.socket; // Speichere den Socket der CPU
            }

            // Debugging in der Konsole
            console.log('Motherboard Socket:', mbsocket);
            console.log('CPU Socket:', cpusocket);
        }



    })
    .catch(error => console.error('Fehler beim Abrufen der Daten:', error));

/**
 * Funktion zum Erstellen der Motherboard- und CPU-Elemente
 * @param {*} data - Die Daten, die Motherboards und CPUs enthalten
 */
/*function createDivs(data) {
    let motherboards = data.motherboards;

    const container = document.querySelector('#data-container');
    container.innerHTML = '';

    /**
     * Funktion zum Erstellen der CPU-Elemente als Liste
     * @param {*} cpus - Array von CPUs, die angezeigt werden sollen
     * @param {*} parentElement - Das übergeordnete Element, dem die CPU-Liste hinzugefügt wird
     */
    /*function createCpuList(cpus, parentElement) {
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
            /*itemDiv.addEventListener('click', () => {
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
}*/
