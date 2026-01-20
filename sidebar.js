//  Seleccionamos todas las categorías y subcategorías
const categoryItems = document.querySelectorAll('.categories li');
const subcategoryLists = document.querySelectorAll('.subcategories');

//  Al iniciar, ocultamos todas las subcategorías excepto la de la categoría activa
subcategoryLists.forEach(sub => {
  if(sub.dataset.category === document.querySelector('.categories li.active').dataset.category){
    sub.style.display = 'block';
  } else {
    sub.style.display = 'none';
  }
});

// 3️⃣ Evento click en cada categoría
categoryItems.forEach(cat => {
  cat.addEventListener('click', () => {

    // a) Activar la categoría seleccionada
    categoryItems.forEach(c => c.classList.remove('active'));
    cat.classList.add('active');

    // b) Mostrar la subcategoría correspondiente y ocultar las demás
    subcategoryLists.forEach(sub => {
      if(sub.dataset.category === cat.dataset.category){
        sub.style.display = 'block';
      } else {
        sub.style.display = 'none';
      }
    });

    // c) Scroll suave a la sección correspondiente
    const section = document.getElementById(cat.dataset.category);
    if(section){
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
