"use strict";
// Solo actúa dentro de la página de Arcanira. El contenido sigue visible sin JavaScript.
document.addEventListener("DOMContentLoaded", () => {
    if (!document.body.classList.contains("arcanira-page")) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if ("IntersectionObserver" in window && !reduceMotion) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("arc-reveal");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0, rootMargin: "0px 0px -30px 0px" });
        document.querySelectorAll(".arc-section").forEach(section => observer.observe(section));
    }
    const dialog = document.querySelector(".arc-lightbox");
    if (!dialog || typeof dialog.showModal !== "function") return;
    const expandedImage = dialog.querySelector("img");
    document.querySelectorAll(".arc-capture-button").forEach(button => {
        button.addEventListener("click", () => {
            const image = button.querySelector("img");
            if (!image || !image.getAttribute("src")) return;
            expandedImage.src = image.currentSrc || image.src;
            expandedImage.alt = image.alt;
            dialog.showModal();
        });
    });
    dialog.querySelector(".arc-lightbox-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", event => {
        if (event.target !== dialog) return;
        const box = dialog.getBoundingClientRect();
        if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    });
});
