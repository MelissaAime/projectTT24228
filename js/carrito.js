function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
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

function actualizarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

// Mostrar productos en el carrito
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const listaCarrito = document.getElementById('carrito-detalle');
    listaCarrito.innerHTML = ''; // Limpiar la lista antes de agregar nuevas cards

    if (carrito.length === 0) {
        const mensajeVacio = document.createElement('div');
        mensajeVacio.classList.add('alert', 'alert-warning');
        mensajeVacio.textContent = 'El carrito está vacío.';
        listaCarrito.appendChild(mensajeVacio);
    } else {
        carrito.forEach((item, index) => {
            // Crear la card para cada producto
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('container', 'col-md-8', 'mb-3');

            cardDiv.innerHTML = `
                <div class="card">
                     <div class="row g-0">
                         <div class="col-md-4">
                             <img src="${item.imagen || 'imagen-predeterminada.jpg'}" class="img-fluid rounded-start" alt="${item.nombre}">
                         </div>
                         <div class="col-md-8">
                             <div class="card-body">
                                <h5 class="card-title">${item.nombre}</h5>
                                <p class="card-text">Cantidad: 
                                    <input type="number" id="input-cantidad-${index}" value="${item.cantidad}" min="1" class="form-control" style="width: 80px; display: inline-block;">
                                </p>
                                <p class="card-text">Precio total: $${(item.precio * item.cantidad).toFixed(2)}</p>
                                <div class="d-flex justify-content-end gap-2 mt-auto">
                                    <button class="btn btn-warning btn-sm" onclick="guardarCantidad(${index})">Guardar Cantidad</button>
                                    <button class="btn btn-danger btn-sm" onclick="borrarProducto(${index})">Borrar Producto</button>
                                </div>
                             </div>
                         </div>
                     </div>
                 </div>
            `;
            listaCarrito.appendChild(cardDiv);
        });

        // Agregar el total del carrito
        const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        const totalDiv = document.createElement('div');
        totalDiv.classList.add('alert', 'alert-success', 'mt-3');
        totalDiv.textContent = `Total: $${total.toFixed(2)}`;
        listaCarrito.appendChild(totalDiv);
    }
}

// Función para guardar la nueva cantidad
function guardarCantidad(index) {
    const carrito = obtenerCarrito();
    const cantidadNueva = document.getElementById(`input-cantidad-${index}`).value;
    
    if (cantidadNueva && !isNaN(cantidadNueva) && cantidadNueva > 0) {
        carrito[index].cantidad = parseInt(cantidadNueva);
        actualizarCarrito(carrito);
    } else {
        alert('Por favor ingrese un número válido.');
    }
}

// Función para borrar un producto del carrito
function borrarProducto(index) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1); // Eliminar el producto en el índice especificado
    actualizarCarrito(carrito); // Actualizar el carrito en el localStorage
}

// Mostrar el carrito cuando la página cargue
document.addEventListener('DOMContentLoaded', mostrarCarrito);

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = carrito.length;
}

function agregarAlCarrito(producto, cantidad) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    const index = carrito.findIndex(item => item.id === producto.id);
    if (index === -1) {
        producto.cantidad = cantidad;
        carrito.push(producto);
    } else {
        carrito[index].cantidad += cantidad;
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));

    actualizarContadorCarrito();
}


function mostrarMensaje(mensaje) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('prod-agregado');   
    modalMessage.textContent = mensaje;
    modal.style.display = 'block';

    setTimeout(() => {
        modal.style.display = 'none';
    }, 3000);
}

document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('cart-dropdown');
    const cartIcon = document.getElementById('cart-icon');
    if (!cartIcon.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});


// Finalizar compra y borrar el storage
const btnSelf = document.getElementById('btn-self');

// Función para verificar si el carrito tiene productos
function verificarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length > 0) {
        btnSelf.style.display = 'block';
    } else {
        btnSelf.style.display = 'none';
    }
}

verificarCarrito();

btnSelf.addEventListener('click', function() {
    const carritoDetalle = document.getElementById('carrito-detalle');

    localStorage.clear();

    carritoDetalle.innerHTML = "<p>¡Gracias por tu compra!</p>";
    btnSelf.textContent = "Ver productos";
    btnSelf.onclick = function() {
        window.location.href = 'productos.html';
    };
});