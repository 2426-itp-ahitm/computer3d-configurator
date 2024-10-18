function createDivs(data) {

    let motherboards = data.motherboards;

    if (data.length == 0) {
        console.error('No data available to display.');
        return;
    }

    const container = document.querySelector('#data-container');

    container.innerHTML = '';

    for (let i = 0; i < motherboards.length; i++) {
        
        const item = motherboards[i];
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Brand: ${item.brand || item.socket}</p>
            <p>Price: $${item.price}</p>
        `;
        container.appendChild(itemDiv);
    }
}

fetch('https://my-json-server.typicode.com/2426-itp-AHITM/computer3d-configurator/db')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        createDivs(data);
    })
    .catch(error => console.error('Fehler beim Abrufen der Daten:', error));