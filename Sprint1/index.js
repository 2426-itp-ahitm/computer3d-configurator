function createDivs(data) {

    let motherboards = data.motherboards;

    const container = document.querySelector('#data-container');
    container.innerHTML = '';

    // Funktion zum Erstellen von CPU-Divs
    function createCpuDivs(cpus) {
        cpus.forEach(item => {
            const cpuDiv = document.createElement('div');
            cpuDiv.className = 'item';
            cpuDiv.innerHTML = `
                <h3>${item.name}</h3>
                <p>Socket: ${item.socket}</p>
                <p>Price: $${item.price}</p>
            `;
            container.appendChild(cpuDiv);
        });
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

            // Event-Listener für den Klick auf das Motherboard
            itemDiv.addEventListener('click', () => {
                const matchingCPUs = data.CPUs.filter(cpu => cpu.socket === mb.socket);
                createCpuDivs(matchingCPUs); // Erstelle CPU-Divs für passende CPUs
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