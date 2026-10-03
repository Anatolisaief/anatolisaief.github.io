'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  if (hamburger && navMenu) {
    document.body.classList.add('js-ready');
    const icon = hamburger.querySelector('i');
    function setMenu(open) {
      navMenu.classList.toggle('active', open);
      hamburger.setAttribute('aria-expanded', String(open));
      hamburger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      if (icon) { icon.classList.toggle('fa-bars', !open); icon.classList.toggle('fa-xmark', open); }
    }
    hamburger.addEventListener('click', () => setMenu(!navMenu.classList.contains('active')));
    navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && navMenu.classList.contains('active')) { setMenu(false); hamburger.focus(); }
    });
    document.addEventListener('click', event => {
      if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) setMenu(false);
    });
    window.matchMedia('(min-width: 761px)').addEventListener('change', () => setMenu(false));
  }
  // Reveal existing project-detail sections. They stay readable if the observer is unsupported.
  const sections = document.querySelectorAll('body:not(.portfolio) section:not(#sobre-mi)');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.05 });
    sections.forEach(section => observer.observe(section));
  } else sections.forEach(section => section.classList.add('visible'));
  // Preserves the image viewer used in the existing detail pages.
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeButton = document.getElementById('lightbox-cerrar');
  if (lightbox && lightboxImg && closeButton) {
    let previousFocus;
    const close = () => { lightbox.classList.remove('active'); lightbox.setAttribute('aria-hidden', 'true'); if (previousFocus) previousFocus.focus(); };
    lightbox.setAttribute('role', 'dialog'); lightbox.setAttribute('aria-modal', 'true'); lightbox.setAttribute('aria-label', 'Vista ampliada de imagen'); lightbox.setAttribute('aria-hidden', 'true');
    if (!closeButton.matches('button,a,[tabindex]')) { closeButton.tabIndex = 0; closeButton.setAttribute('role', 'button'); }
    closeButton.setAttribute('aria-label', 'Cerrar imagen');
    document.querySelectorAll('.imagen-lightbox').forEach(img => {
      const open = () => { previousFocus = document.activeElement; lightboxImg.src = img.currentSrc || img.src; lightboxImg.alt = img.alt; lightbox.classList.add('active'); lightbox.setAttribute('aria-hidden', 'false'); closeButton.focus(); };
      img.tabIndex = 0; img.setAttribute('role', 'button'); img.setAttribute('aria-label', 'Ampliar: ' + (img.alt || 'imagen'));
      img.addEventListener('click', open); img.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
    closeButton.addEventListener('click', close);
    closeButton.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); close(); } });
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') { e.preventDefault(); closeButton.focus(); }
    });
  }
});
