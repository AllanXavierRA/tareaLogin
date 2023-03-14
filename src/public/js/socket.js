const socket = io();


socket.on()

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch("http://localhost:8080/api/products")
        const data = await res.json()
        
        const tabla =  document.getElementById('tabla');
    
        data.forEach(element => {
        const row = document.createElement('tr');
        
        const idCelda = document.createElement('td');
        idCelda.textContent = element.id;
    
        const titleCelda = document.createElement('td');
        titleCelda.textContent = element.title;
    
        const descriptionCelda = document.createElement('td');
        descriptionCelda.textContent = element.description;
        
        const priceCelda = document.createElement('td');
        priceCelda.textContent = element.price;
    
        const thumbnailCelda = document.createElement('td');
        thumbnailCelda.textContent = element.thumbnail;
    
        const codeCelda = document.createElement('td');
        codeCelda.textContent = element.code;
    
        const stockCelda = document.createElement('td');
        stockCelda.textContent = element.stock;
    
        
        row.appendChild(idCelda)
        row.appendChild(titleCelda)
        row.appendChild(descriptionCelda)
        row.appendChild(priceCelda)
        row.appendChild(thumbnailCelda)
        row.appendChild(codeCelda)
        row.appendChild(stockCelda)
    
    
        tabla.appendChild(row);
        
        });

        console.log(data);

        socket.on('productAdded', (data) => {

          try {
            
            const row = document.createElement('tr');
        
            const idCelda = document.createElement('td');
            idCelda.textContent = data.id;
        
            const titleCelda = document.createElement('td');
            titleCelda.textContent = data.title;
        
            const descriptionCelda = document.createElement('td');
            descriptionCelda.textContent = data.description;
            
            const priceCelda = document.createElement('td');
            priceCelda.textContent = data.price;
        
            const thumbnailCelda = document.createElement('td');
            thumbnailCelda.textContent = data.thumbnail;
        
            const codeCelda = document.createElement('td');
            codeCelda.textContent = data.code;
        
            const stockCelda = document.createElement('td');
            stockCelda.textContent = data.stock;
        
            row.appendChild(idCelda)
            row.appendChild(titleCelda)
            row.appendChild(descriptionCelda)
            row.appendChild(priceCelda)
            row.appendChild(thumbnailCelda)
            row.appendChild(codeCelda)
            row.appendChild(stockCelda)
            tabla.appendChild(row);
          } catch (error) {
            console.log(error);
          }
        });
        socket.on('productRemoved', (productId) => {
          const rows = document.querySelectorAll('#tabla tr');
          for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const idCelda = row.querySelector('td:first-child');
            if (idCelda && idCelda.textContent === productId.toString()) {
              row.remove();
              break;
            }
          }
        });
      
      } catch (error) {
          console.log(error)
      }

    });