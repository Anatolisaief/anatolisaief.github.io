const cards = document.querySelectorAll(".project-card");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;
let startX = 0;
let endX = 0;
let isTouchOnLink = false;

const carousel = document.querySelector('.carousel');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const icon = hamburger ? hamburger.querySelector('i') : null;
const navLinks = document.querySelectorAll('#nav-menu a');



// Animación de secciones al entrar en vista
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section:not(#sobre-mi)");

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

// función para mostrar solo la tarjeta actual
// Listar proyectos
function showCard(index) {
  cards.forEach((card, i) => {
    card.classList.toggle("active", i === index);
  });

  if (prevBtn && nextBtn) {
    prevBtn.style.display = index === 0 ? "none" : "block";
    nextBtn.style.display = index === cards.length - 1 ? "none" : "block";
  }
}

if (carousel && prevBtn && nextBtn && cards.length > 0) {
  showCard(currentIndex);

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

  carousel.addEventListener("touchstart", (e) => {
    isTouchOnLink = e.target.closest("a") !== null;
    startX = e.touches[0].clientX;
    endX = startX;
  });

  carousel.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", () => {
    if (isTouchOnLink) {
      isTouchOnLink = false;
      return;
    }

    const diff = startX - endX;

    if (diff > 50 && currentIndex < cards.length - 1) {
      currentIndex++;
      showCard(currentIndex);
    } else if (diff < -50 && currentIndex > 0) {
      currentIndex--;
      showCard(currentIndex);
    }

    startX = 0;
    endX = 0;
  });
}

// Menú hamburguesa
if (hamburger && navMenu && icon) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    if (icon.classList.contains("fa-bars")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");

      if (!icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    });
  });
}


// Lightbox
const imagenesLightbox = document.querySelectorAll(".imagen-lightbox");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const cerrarLightbox = document.getElementById("lightbox-cerrar");

if (imagenesLightbox.length > 0 && lightbox && lightboxImg && cerrarLightbox) {
  imagenesLightbox.forEach((imagen) => {
    imagen.addEventListener("click", () => {
      lightboxImg.src = imagen.src;
      lightboxImg.alt = imagen.alt;
      lightbox.classList.add("active");
    });
  });

  cerrarLightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      lightbox.classList.remove("active");
    }
  });
}