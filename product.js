// -------------------------
//  FILTRO DE CATEGORÍAS
// -------------------------

const categoryItems = document.querySelectorAll('.categories li');
const subcategoryLists = document.querySelectorAll('.subcategories');

// Ocultar todas las subcategorías excepto la activa
subcategoryLists.forEach(sub => {
  if(sub.dataset.category === document.querySelector('.categories li.active').dataset.category){
    sub.style.display = 'block';
  } else {
    sub.style.display = 'none';
  }
});

// Click en categorías
categoryItems.forEach(cat => {
  cat.addEventListener('click', () => {
    categoryItems.forEach(c => c.classList.remove('active'));
    cat.classList.add('active');

    subcategoryLists.forEach(sub => {
      if(sub.dataset.category === cat.dataset.category){
        sub.style.display = 'block';
      } else {
        sub.style.display = 'none';
      }
    });

    const section = document.getElementById(cat.dataset.category);
    if(section){
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// -------------------------
//  BUSCADOR DE PRODUCTOS
// -------------------------

const buscador = document.getElementById('buscador');
const cards = document.querySelectorAll('.grid .card');

buscador.addEventListener('input', () => {
  const filtro = buscador.value.toLowerCase();

  cards.forEach(card => {
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

const selects = document.querySelectorAll('.content-header select');

selects.forEach(select => {
  select.addEventListener('change', () => {
    const section = select.closest('.content');
    const grid = section.querySelector('.grid');
    const cardsArray = Array.from(grid.querySelectorAll('.card'));

    const opcion = select.value;

    if(opcion === 'Precio menor a mayor'){
      cardsArray.sort((a, b) => {
        let precioA = a.querySelector('.price').textContent.replace(/[^0-9.,]/g, '').replace(',', '.').trim();
        let precioB = b.querySelector('.price').textContent.replace(/[^0-9.,]/g, '').replace(',', '.').trim();
        precioA = parseFloat(precioA) || 0;
        precioB = parseFloat(precioB) || 0;
        return precioA - precioB;
      });
    } else if(opcion === 'Precio mayor a menor'){
      cardsArray.sort((a, b) => {
        let precioA = a.querySelector('.price').textContent.replace(/[^0-9.,]/g, '').replace(',', '.').trim();
        let precioB = b.querySelector('.price').textContent.replace(/[^0-9.,]/g, '').replace(',', '.').trim();
        precioA = parseFloat(precioA) || 0;
        precioB = parseFloat(precioB) || 0;
        return precioB - precioA;
      });
    } else if(opcion === 'Ordenar por popularidad'){
      // Restaurar HTML original
      grid.innerHTML = originalHTML.get(grid);
      return;
    }

    // Aplicar nuevo orden
    grid.innerHTML = '';
    cardsArray.forEach(card => grid.appendChild(card));
  });
});
