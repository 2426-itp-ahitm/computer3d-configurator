// Daten abrufen und initiale Anzeige der Motherboards erstellen
fetch('https://my-json-server.typicode.com/2426-itp-AHITM/computer3d-configurator/db')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        createDivs(data);

         // Referenzen für das Suchfeld und die Buttons
         const cpuSearchInput = document.querySelector('#cpu-search');
         const cpuSuggestionsList = document.querySelector('#suggestions-list-cpu');
         const addCpuBtn = document.querySelector('#add-cpu-btn');
         const selectedCpuList = document.querySelector('#selected-cpu-list');
 
         const mbSearchInput = document.querySelector('#motherboard-search');
         const mbSuggestionsList = document.querySelector('#suggestions-list-mb');
         const addMbBtn = document.querySelector('#add-mb-btn');
         const selectedMbList = document.querySelector('#selected-mb-list');
 
         let selectedCpu = null;
         let selectedMotherboard = null;

        // Event-Listener für CPU-Suche
        cpuSearchInput.addEventListener('input', () => {
            const searchTerm = cpuSearchInput.value.toLowerCase().trim();
            cpuSuggestionsList.innerHTML = '';

            if (searchTerm) {
                const matchingCPUs = data.CPUs.filter(cpu =>
                    cpu.name.toLowerCase().includes(searchTerm)
                );

                if (matchingCPUs.length > 0) {
                    matchingCPUs.forEach(cpu => {
                        const listItem = document.createElement('li');
                        listItem.textContent = `${cpu.name} - Socket: ${cpu.socket} - Price: $${cpu.price}`;
                        listItem.addEventListener('click', () => {
                            cpuSearchInput.value = cpu.name;
                            selectedCpu = cpu;
                            cpuSuggestionsList.innerHTML = ''; // Vorschläge zurücksetzen
                        });
                        cpuSuggestionsList.appendChild(listItem);
                    });
                }
            }
        });
        // Event-Listener für Motherboard-Suche
        mbSearchInput.addEventListener('input', () => {
            const searchTerm = mbSearchInput.value.toLowerCase().trim();
            mbSuggestionsList.innerHTML = '';

            if (searchTerm) {
                const matchingMotherboards = data.motherboards.filter(mb =>
                    mb.name.toLowerCase().includes(searchTerm)
                );

                if (matchingMotherboards.length > 0) {
                    matchingMotherboards.forEach(mb => {
                        const listItem = document.createElement('li');
                        listItem.textContent = `${mb.name} - Socket: ${mb.socket} - Price: $${mb.price}`;
                        listItem.addEventListener('click', () => {
                            mbSearchInput.value = mb.name;
                            selectedMotherboard = mb;
                            mbSuggestionsList.innerHTML = ''; // Vorschläge zurücksetzen
                        });
                        mbSuggestionsList.appendChild(listItem);
                    });
                }
            }
        });

        // Event-Listener für das Hinzufügen der CPU zur Liste
        addCpuBtn.addEventListener('click', () => {
            if (selectedCpu) {
                addCpuToList(selectedCpu);
                selectedCpu = null; // Zurücksetzen der Auswahl
                cpuSearchInput.value = ''; // Suchfeld leeren
            } else {
                alert('Please select a CPU before adding.');
            }
        });

        // Event-Listener für das Hinzufügen des Motherboards zur Liste
        addMbBtn.addEventListener('click', () => {
            if (selectedMotherboard) {
                addMotherboardToList(selectedMotherboard);
                selectedMotherboard = null; // Zurücksetzen der Auswahl
                mbSearchInput.value = ''; // Suchfeld leeren
            } else {
                alert('Please select a Motherboard before adding.');
            }
        });

        // Funktion zum Hinzufügen einer CPU zur Liste
        function addCpuToList(cpu) {
            const listItem = document.createElement('li');
            listItem.textContent = `${cpu.name} - Socket: ${cpu.socket} - Price: $${cpu.price}`;
            selectedCpuList.appendChild(listItem);
        }

        // Funktion zum Hinzufügen eines Motherboards zur Liste
        function addMotherboardToList(mb) {
            const listItem = document.createElement('li');
            listItem.textContent = `${mb.name} - Socket: ${mb.socket} - Price: $${mb.price}`;
            selectedMbList.appendChild(listItem);
        }
    })
    .catch(error => console.error('Fehler beim Abrufen der Daten:', error));

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
