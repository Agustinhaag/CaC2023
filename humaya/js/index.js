let menu = document.getElementById("menu");
let mostrar = document.getElementById("mostrar");
let ocultar = document.getElementById("ocultar");
let enlaces = document.querySelectorAll('nav a[href^="#"]');

function updateMostrarVisibility() {
  if (window.innerWidth <= 768 && !menu.classList.contains("visible")) {
    mostrar.style.display = "block";
  } else {
    mostrar.style.display = "none";
  }
}

mostrar.addEventListener("click", () => {
  menu.classList.add("visible");
  menu.style.transition = "0.6s";
  updateMostrarVisibility();
});

ocultar.addEventListener("click", () => {
  menu.classList.remove("visible");
  updateMostrarVisibility();
});

enlaces.forEach((enlace) => {
  enlace.addEventListener("click", () => {
    menu.classList.remove("visible");
    updateMostrarVisibility();
  });
});

window.addEventListener("resize", updateMostrarVisibility); 