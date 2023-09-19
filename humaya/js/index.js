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

let fila = document.querySelector(".container-carrusel");
let derecha = document.getElementById("flecha-derecha");
let izquierda = document.getElementById("flecha-izquierda");

derecha.addEventListener("click", () => {
  fila.scrollLeft += fila.offsetWidth;
  let indicadoractivo = document.querySelector(".indicadores .activo");
  if (indicadoractivo && indicadoractivo.nextElementSibling) {
    indicadoractivo.nextElementSibling.classList.add("activo");
    indicadoractivo.classList.remove("activo");
  }
});

izquierda.addEventListener("click", () => {
  fila.scrollLeft -= fila.offsetWidth;
  let indicadoractivo = document.querySelector(".indicadores .activo");
  if (indicadoractivo && indicadoractivo.previousElementSibling) {
    indicadoractivo.previousElementSibling.classList.add("activo");
    indicadoractivo.classList.remove("activo");
  }
});
const crearIndicadores = () => {
  let carrusel = document.querySelectorAll(".card");
  const numpag = Math.ceil(carrusel.length / 3);
  for (let i = 0; i < numpag; i++) {
    const indicador = document.createElement("button");
    if (i === 0) {
      indicador.classList.add("activo");
    }
    document.querySelector(".indicadores").appendChild(indicador);
    indicador.addEventListener("click", (e) => {
      fila.scrollLeft = i * fila.offsetWidth;
      document.querySelector(".indicadores .activo").classList.remove("activo");
      e.target.classList.add("activo");
    });
  }
};

const containerCard = document.querySelector("#container-card");
const recetas = [];

const retornarCard = (card) => {
  let ingredientesHtml = "";
  let pasosHtml = "";

  card.ingredientes.forEach((ingrediente) => {
    ingredientesHtml += `<li>${ingrediente}</li>`;
  });

  card.Pasos.forEach((paso, index) => {
    pasosHtml += `<div class="container-pasos"> <span>Paso ${
      index + 1
    }:</span> <p>${paso}</p> </div>`;
  });
  return `<div class="card">
                <div class="card-img"><img src="${card.image}" alt="" /></div>
                <div class="card-info">
                  <h3>${card.title}</h3>
                  <p>${card.description}</p>
 <div class="contenidOculto">
           <h4>Ingredientes:</h4>
           <ul>
               ${ingredientesHtml}
           </ul>
             <h4>Pasos:</h4>
             ${pasosHtml}
               </div>
                  <button  class="rotate-btn" id="${card.id}">PREPARACIÓN</button>
                </div>
          </div>
  `;
};

const url = "https://api-humaya.onrender.com";

const recuperar = async () => {
  try {
    const response = await fetch(url);
    const result = await response.json()
    recetas.push(...result);
    cargarRecetas(recetas);
    crearIndicadores();
  } catch (error) {
    console.error(error);
  }
};

recuperar();

const cargarRecetas = (array) => {
  array.forEach((arr) => {
    const data = retornarCard(arr);
    containerCard.innerHTML += data;
  });
  deslizar();
};

const btnInfo = document.querySelectorAll("#btn-info");

btnInfo.forEach((btn) => {
  btn.addEventListener("click", () => {
    const article = btn.closest(".container-gral-banner");
    const visibleContent = article.querySelector(".container-card-banner");
    visibleContent.classList.add("hide");

    const adicional = article.querySelector(".return");
    adicional.classList.add("view");
  });
});

const btnReset = document.querySelectorAll("#btn-reset");

btnReset.forEach((btn) => {
  btn.addEventListener("click", () => {
    const article = btn.closest("article");

    const adicional = article.querySelector(".return");
    adicional.classList.remove("view");

    const visibleContent = article.querySelector(".container-card-banner");
    visibleContent.classList.remove("hide");
  });
});

function deslizar() {
  const cards = document.querySelectorAll(".card");
  cards.forEach(function (card) {
    const rotateBtn = card.querySelector(".rotate-btn");
    const contentHidden = card.querySelector(".contenidOculto");
    let isOpen = false;

    rotateBtn.addEventListener("click", function () {
      isOpen = !isOpen;
      if (isOpen) {
        var contentHeight = contentHidden.scrollHeight + "px";
        contentHidden.style.maxHeight = contentHeight;
        rotateBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
      } else {
        contentHidden.style.maxHeight = "0";
        rotateBtn.textContent = "PREPARACION";
      }
    });
  });
}

const contenedorPrincipal = document.querySelector(".contenedor-principal");
const flechaIzquierda = document.querySelector(".flecha-izquierda");
const flechaDerecha = document.querySelector(".flecha-derecha");

const alturaMaximaFlechas = 435;

function ajustarPosicionFlechas() {
  const alturaContenedor = contenedorPrincipal.clientHeight;
  if (alturaContenedor < alturaMaximaFlechas) {
    flechaIzquierda.style.top = "220px";
    flechaDerecha.style.top = "220px";
  } else {
    flechaIzquierda.style.top = "50%";
    flechaDerecha.style.top = "50%";
  }
}
ajustarPosicionFlechas();
