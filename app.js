document.addEventListener('DOMContentLoaded', () => {
    function generarTarjetasDestacadas(datos) {
        const contenedor = document.getElementById('tarjetas-destacadas');
        
        datos.forEach(producto => {

            if (producto.destacado === true){
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
            
                cardBody.appendChild(title);
            
                card.appendChild(img);
                card.appendChild(cardBody);
            
                contenedor.appendChild(card);
            }
        });
    }

    fetch('https://melissaaime.github.io/projectTT24228/productos.json')
        .then(response => response.json())
        .then(data => {
            generarTarjetasDestacadas(data);
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });
});