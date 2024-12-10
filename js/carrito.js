function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = carrito.length;
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    const index = carrito.findIndex(item => item.id === producto.id);
    if (index === -1) {
        carrito.push(producto);
    } else {
        carrito[index].cantidad += 1;
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));

    actualizarContadorCarrito();
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cart-icon').addEventListener('click', () => {
        const dropdown = document.getElementById('cart-dropdown');
        dropdown.classList.toggle('show');
        mostrarContenidoCarrito();
    });

    function mostrarContenidoCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const listaCarrito = document.getElementById('cart-items-list');
        listaCarrito.innerHTML = '';

        if (carrito.length === 0) {
            const mensajeVacio = document.createElement('li');
            mensajeVacio.textContent = 'El carrito está vacío.';
            listaCarrito.appendChild(mensajeVacio);
        } else {
            carrito.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.nombre} - $${item.precio} x ${item.cantidad}`;
                listaCarrito.appendChild(li);
            });
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        actualizarContadorCarrito();
        mostrarContenidoCarrito();
    });
});

document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('cart-dropdown');
    const cartIcon = document.getElementById('cart-icon');
    if (!cartIcon.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});
