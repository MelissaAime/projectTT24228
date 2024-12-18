document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        fetch('https://melissaaime.github.io/projectTT24228/productos.json')
            .then(response => response.json())
            .then(data => {
                const producto = data.find(item => item.id === parseInt(productId));
                if (producto) {
                    detallesProductos(producto);
                } else {
                    console.error('Producto no encontrado');
                }
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
            });
    } else {
        console.error('No se ha proporcionado un id de producto');
    }
});

function detallesProductos(producto) {
    const contenedor = document.getElementById('contenedor-detalles');
    contenedor.innerHTML = ''; 

    const row = document.createElement('div');
    row.classList.add('row');

    const colImagenGrande = document.createElement('div');
    colImagenGrande.classList.add('col', 'col-lg-6', 'col-sm', 'imagen-grande');

    const imgGrande = document.createElement('img');
    imgGrande.src = producto.imagen;
    imgGrande.alt = producto.nombre;
    imgGrande.classList.add('imagen-grande-i');
    
    colImagenGrande.appendChild(imgGrande);

    const colImagenChica = document.createElement('div');
    colImagenChica.classList.add('col', 'col-lg-2', 'imagen-chica');

    producto.imagenes.forEach(imagen => {
        const imgChica = document.createElement('img');
        imgChica.src = imagen;
        imgChica.alt = producto.nombre;
        imgChica.classList.add('row', 'imagen-chica-i', 'p-1');
        colImagenChica.appendChild(imgChica);
    });

    const colTextDetalles = document.createElement('div');
    colTextDetalles.classList.add('col', 'col-lg-4', 'col-sm', 'text-detalles');

    const title = document.createElement('h3');
    title.textContent = producto.nombre;

    const description = document.createElement('p');
    description.textContent = producto.descripcion;

    const price = document.createElement('p');
    price.textContent = "Precio: $ " + producto.precio;

    const cantidadInput = document.createElement('input');
    cantidadInput.type = 'number';
    cantidadInput.id = 'cantidadProducto';
    cantidadInput.name = 'cantidad';
    cantidadInput.value = 1;
    cantidadInput.min = 1; 
    cantidadInput.max = 10;
    cantidadInput.classList.add('form-control', 'm-3'); 

    const botonComprar = document.createElement('a');
    botonComprar.classList.add ('btn', 'mx-auto');
    botonComprar.id = 'btn-self';
    botonComprar.textContent = "Agregar al carrito";

    botonComprar.addEventListener('click', () => {
        const cantidad = parseInt(cantidadInput.value);
        agregarAlCarrito(producto, cantidad);
        mostrarMensaje(`${producto.nombre} x${cantidad} se agregó al carrito`)
    });

    colTextDetalles.appendChild(title);
    colTextDetalles.appendChild(description);
    colTextDetalles.appendChild(price);
    colTextDetalles.appendChild(cantidadInput);
    colTextDetalles.appendChild(botonComprar);

    row.appendChild(colImagenGrande);
    row.appendChild(colImagenChica);
    row.appendChild(colTextDetalles);

    contenedor.appendChild(row);
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
});
