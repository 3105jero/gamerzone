// Espera a que todo el contenido del DOM esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

  // -------------------------
  //  FILTRO DE CATEGORÍAS
  // -------------------------
  const categoryItems = document.querySelectorAll('.categories li'); // Selecciona todas las categorías
  const subcategoryLists = document.querySelectorAll('.subcategories'); // Selecciona todas las listas de subcategorías

  // Oculta todas las subcategorías excepto la correspondiente a la categoría activa
  subcategoryLists.forEach(sub => {
    if(sub.dataset.category === document.querySelector('.categories li.active').dataset.category){
      sub.style.display = 'block'; // Mostrar subcategoría de la categoría activa
    } else {
      sub.style.display = 'none'; // Ocultar las demás
    }
  });

  // Agrega evento de click a cada categoría
  categoryItems.forEach(cat => {
    cat.addEventListener('click', () => {
      // Quitar la clase 'active' de todas y agregarla solo a la clickeada
      categoryItems.forEach(c => c.classList.remove('active'));
      cat.classList.add('active');

      // Mostrar la subcategoría correspondiente y ocultar las demás
      subcategoryLists.forEach(sub => {
        if(sub.dataset.category === cat.dataset.category){
          sub.style.display = 'block';
        } else {
          sub.style.display = 'none';
        }
      });

      // Scroll suave hacia la sección de la categoría
      const section = document.getElementById(cat.dataset.category);
      if(section){
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // -------------------------
  // FILTRO POR SUBCATEGORÍA
  // -------------------------
  const products = document.querySelectorAll('.card'); // Selecciona todos los productos

  // Para cada lista de subcategorías
  subcategoryLists.forEach(list => {
    const items = list.querySelectorAll('li'); // Obtiene cada subcategoría
    items.forEach(item => {
      item.addEventListener('click', () => {
        const subcategory = item.textContent.trim().toLowerCase(); // Texto de la subcategoría seleccionada

        // Mostrar u ocultar productos según la subcategoría
        products.forEach(product => {
          const categories = product.getAttribute('data-category').toLowerCase().split(',');
          if(categories.includes(subcategory)){
            product.style.display = 'block'; // Mostrar si coincide
          } else {
            product.style.display = 'none'; // Ocultar si no coincide
          }
        });
      });
    });
  });

  // -------------------------
  //  BUSCADOR DE PRODUCTOS
  // -------------------------
  const buscador = document.getElementById('buscador'); // Input de búsqueda

  buscador.addEventListener('input', () => {
    const filtro = buscador.value.toLowerCase(); // Texto ingresado en minúsculas

    // Mostrar u ocultar productos según coincidencia en el nombre
    products.forEach(card => {
      const nombre = card.querySelector('h3').textContent.toLowerCase();
      if(nombre.includes(filtro)){
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });

  // -------------------------
  //  ORDENAMIENTO DE PRECIOS
  // -------------------------
  const selects = document.querySelectorAll('.content-header select'); // Todos los selects de ordenamiento

  selects.forEach(select => {
    select.addEventListener('change', () => {
      const section = select.closest('.content'); // Encuentra la sección correspondiente
      const grid = section.querySelector('.grid'); // Grid de productos de esa sección
      const cardsArray = Array.from(grid.querySelectorAll('.card')); // Convierte NodeList a array para ordenar

      const opcion = select.value; // Valor seleccionado

      // Ordenar de menor a mayor
      if(opcion === 'Precio menor a mayor'){
        cardsArray.sort((a, b) => {
          let precioA = a.querySelector('.price').textContent.replace(/[^0-9.,]/g, '').replace(',', '.').trim();
          let precioB = b.querySelector('.price').textContent.replace(/[^0-9.,]/g, '').replace(',', '.').trim();
          precioA = parseFloat(precioA) || 0;
          precioB = parseFloat(precioB) || 0;
          return precioA - precioB;
        });

      // Ordenar de mayor a menor
      } else if(opcion === 'Precio mayor a menor'){
        cardsArray.sort((a, b) => {
          let precioA = a.querySelector('.price').textContent.replace(/[^0-9.,]/g, '').replace(',', '.').trim();
          let precioB = b.querySelector('.price').textContent.replace(/[^0-9.,]/g, '').replace(',', '.').trim();
          precioA = parseFloat(precioA) || 0;
          precioB = parseFloat(precioB) || 0;
          return precioB - precioA;
        });

      // Ordenar por popularidad (restaurar orden original)
      } else if(opcion === 'Ordenar por popularidad'){
        // Restaurar HTML original
        grid.innerHTML = originalHTML.get(grid); // originalHTML debe contener copia inicial de cada grid
        return;
      }

      // Aplicar nuevo orden en el DOM
      grid.innerHTML = '';
      cardsArray.forEach(card => grid.appendChild(card));
    });
  });

});
