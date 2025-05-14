// Reemplaza esta URL con la URL RAW de tu archivo pedidos.json en GitHub
const DATA_URL = 'https://raw.githubusercontent.com/jhonvinasco/seguimiento-pedidos/refs/heads/main/pedidos.jsonn';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsContainer = document.getElementById('results');

let allOrders = []; // Variable para almacenar todos los pedidos una vez cargados

// Función para cargar los datos desde GitHub
async function loadOrders() {
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allOrders = await response.json(); // Guarda los datos cargados
        console.log('Datos de pedidos cargados:', allOrders); // Para depuración
        // Opcional: mostrar todos los pedidos al inicio si la lista no es muy larga
        // displayOrders(allOrders);
    } catch (error) {
        console.error('Error cargando los datos de pedidos:', error);
        resultsContainer.innerHTML = '<p>Error al cargar los datos de seguimiento. Inténtalo de nuevo más tarde.</p>';
    }
}

// Función para mostrar los resultados en la página
function displayOrders(orders) {
    resultsContainer.innerHTML = ''; // Limpia resultados anteriores

    if (orders.length === 0) {
        resultsContainer.innerHTML = '<p>No se encontraron resultados para tu búsqueda.</p>';
        return;
    }

    orders.forEach(order => {
        const orderDiv = document.createElement('div');
        orderDiv.classList.add('order-info');
        orderDiv.innerHTML = `
            <h3>Pedido: ${order.idPedido}</h3>
            <p><strong>Número de Guía:</strong> ${order.numeroGuia}</p>
            <p><strong>Transportadora:</strong> ${order.transportadora}</p>
            <p><strong>Estado:</strong> ${order.estado}</p>
            <p><strong>Última Actualización:</strong> ${order.fechaActualizacion}</p>
            <p><strong>Ubicación:</strong> ${order.ubicacion}</p>
        `;
        resultsContainer.appendChild(orderDiv);
    });
}

// Función para buscar pedidos
function searchOrders() {
    const searchTerm = searchInput.value.toLowerCase();

    if (searchTerm.length === 0) {
         resultsContainer.innerHTML = '<p>Introduce un ID de Pedido o Número de Guía para buscar.</p>';
        // Opcional: mostrar todos los pedidos de nuevo si se borra la búsqueda
        // displayOrders(allOrders);
        return;
    }

    const filteredOrders = allOrders.filter(order =>
        order.idPedido.toLowerCase().includes(searchTerm) ||
        order.numeroGuia.toLowerCase().includes(searchTerm)
    );

    displayOrders(filteredOrders);
}

// Event listeners para el botón y la tecla Enter en el input
searchButton.addEventListener('click', searchOrders);

searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchOrders();
    }
});


// Cargar los datos al iniciar la página
loadOrders();
