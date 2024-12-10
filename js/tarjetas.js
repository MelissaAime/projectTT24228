document.addEventListener('DOMContentLoaded', () => {
    function generarTarjetas(datos) {
        const contenedor = document.getElementById('contenedor-tarjetas');
        
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
            button.classList.add('btn');
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

    fetch('/productos.json')
        .then(response => response.json())
        .then(data => {
            generarTarjetas(data);
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });
});