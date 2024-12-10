document.addEventListener('DOMContentLoaded', () => {
    let productos = [];

    function generarTarjetas(datos) {
        const contenedor = document.getElementById('contenedor-tarjetas');
        contenedor.innerHTML = '';
        
        datos.forEach(producto => {
            const card = document.createElement('div');
            card.classList.add('card', 'text-center', 'col', 'm-3', 'p-0');
            card.style.width = '18rem';
        
            const img = document.createElement('img');
            img.classList.add('card-img-top', 'imagen-tarj');
            img.src = producto.imagen;
            img.alt = producto.nombre;
        
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
        
            const title = document.createElement('h5');
            title.classList.add('card-title');
            title.textContent = producto.nombre;
        
            const text = document.createElement('p');
            text.classList.add('card-text');
            text.textContent = producto.descripcion;
        
            const button = document.createElement('a');
            button.classList.add('btn', 'mx-auto');
            button.id = 'btn-self';
            button.textContent = 'Detalles';
            button.dataset.productId = producto.id;

            button.addEventListener('click', (event) => {
                console.log(producto.id);
                window.location.href = `detalles.html?id=${producto.id}`;
            });
            
            cardBody.appendChild(title);
            cardBody.appendChild(text);
            cardBody.appendChild(button);
        
            card.appendChild(img);
            card.appendChild(cardBody);
        
            contenedor.appendChild(card);
        });
    }

    window.filtrarProductos = function(tipo) {
        let productosFiltrados;
        if (tipo === '') {
            productosFiltrados = productos; 
        } else {
            productosFiltrados = productos.filter(producto => producto.tipo === tipo); 
        }
        actualizarBotonesFiltro(tipo);
        generarTarjetas(productosFiltrados); 
    }

    function actualizarBotonesFiltro(tipoSeleccionado) {
        const botonesFiltro = document.querySelectorAll('.filtros button');

        botonesFiltro.forEach(button => {
            button.removeAttribute('id');
            
            if (button.textContent.trim().toLowerCase() === tipoSeleccionado.toLowerCase() || (tipoSeleccionado === '' && button.textContent.trim() === 'Todos')) {
                button.id = 'btn-filt';
            }
        });
    }

    fetch('/productos.json')
        .then(response => response.json())
        .then(data => {
            productos = data;
            generarTarjetas(productos);
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });
});