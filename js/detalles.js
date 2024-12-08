document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        fetch('/productos.json')
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
    contenedor.innerHTML = ''; // Limpiar el contenido antes de agregar el nuevo producto

    // Crear el contenedor principal de 3 columnas
    const row = document.createElement('div');
    row.classList.add('row');

    // Columna para la imagen grande
    const colImagenGrande = document.createElement('div');
    colImagenGrande.classList.add('col', 'col-6', 'imagen-grande');

    const imgGrande = document.createElement('img');
    imgGrande.src = producto.imagen;  // Usamos la imagen del producto
    imgGrande.alt = producto.nombre;
    imgGrande.classList.add('imagen-grande-i');
    
    colImagenGrande.appendChild(imgGrande);

    // Columna para las imágenes pequeñas
    const colImagenChica = document.createElement('div');
    colImagenChica.classList.add('col', 'col-2', 'imagen-chica');

    // Suponiendo que `producto.imagenes` es un array con varias imágenes para mostrar
    // Aquí generamos imágenes pequeñas como ejemplos (si solo tienes una imagen, puedes adaptarlo)
    producto.imagenes.forEach(imagen => {
        const imgChica = document.createElement('img');
        imgChica.src = imagen;  // Usamos las imágenes pequeñas
        imgChica.alt = producto.nombre;
        imgChica.classList.add('row', 'imagen-chica-i');
        colImagenChica.appendChild(imgChica);
    });

    // Columna para el título y la descripción
    const colTextDetalles = document.createElement('div');
    colTextDetalles.classList.add('col', 'col-4', 'text-detalles');

    const title = document.createElement('h3');
    title.textContent = producto.nombre;

    const description = document.createElement('p');
    description.textContent = producto.descripcion;

    colTextDetalles.appendChild(title);
    colTextDetalles.appendChild(description);

    // Agregar las columnas al contenedor row
    row.appendChild(colImagenGrande);
    row.appendChild(colImagenChica);
    row.appendChild(colTextDetalles);

    // Finalmente, agregar el contenedor row al contenedor principal de detalles
    contenedor.appendChild(row);
}

