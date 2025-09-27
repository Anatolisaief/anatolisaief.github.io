// Animación de secciones al entrar en vista
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // solo se anima una vez
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));
});


// Animación de tarjetas de proyectos al entrar en vista
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".project-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        // se quita la clase cuando el elemento sale de la vista
        entry.target.classList.remove("visible");
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
});




//Listar proyectos
const cards = document.querySelectorAll(".project-card");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;

// función para mostrar solo la tarjeta actual
function showCard(index) {
  cards.forEach((card, i) => {
    card.classList.toggle("active", i === index);
  });

  // ocultar/mostrar flechas
  prevBtn.style.display = index === 0 ? "none" : "block";
  nextBtn.style.display = index === cards.length - 1 ? "none" : "block";
}

// botones
nextBtn.addEventListener("click", () => {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    showCard(currentIndex);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    showCard(currentIndex);
  }
});

// inicializar mostrando la primera
showCard(currentIndex);

// Nuevo bloque para swipe táctil 
let startX = 0;
let endX = 0;

const carousel = document.querySelector('.carousel');

carousel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener('touchmove', (e) => {
  endX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', () => {
  const diff = startX - endX;

  if (diff > 50) {
    // swipe hacia izquierda → siguiente tarjeta
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      showCard(currentIndex);
    }
  } else if (diff < -50) {
    // swipe hacia derecha → tarjeta anterior
    if (currentIndex > 0) {
      currentIndex--;
      showCard(currentIndex);
    }
  }

  startX = 0;
  endX = 0;
});


// Menú hamburguesa
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const icon = hamburger.querySelector('i');
const navLinks = document.querySelectorAll('#nav-menu a');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Cambiar icono de barras a cruz
    if(icon.classList.contains('fa-bars')){
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark'); // icono de cruz
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    if (!icon.classList.contains('fa-bars')) {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  });
});