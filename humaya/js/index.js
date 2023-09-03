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
let carrusel = document.querySelectorAll(".card");
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

// const url = "https://beverages-and-desserts.p.rapidapi.com/desserts";     pruebas con apis externas
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "618d245ff0mshf8ed2306b947ee6p1fcdd2jsn139e5673fb6b",
//     "X-RapidAPI-Host": "beverages-and-desserts.p.rapidapi.com",
//   },
// };

// const url = "https://the-birthday-cake-db.p.rapidapi.com/";
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "618d245ff0mshf8ed2306b947ee6p1fcdd2jsn139e5673fb6b",
//     "X-RapidAPI-Host": "the-birthday-cake-db.p.rapidapi.com",
//   },
// };

const containerCard = document.querySelector("#container-card")
const recetas = [];

const retornarCard = (card) => {
  return `<div class="card">
                <div class="card-img"><img src="${card.image}" alt="" /></div>
                <div class="card-info">
                  <h3>${card.title}</h3>
                  <p>${card.description}</p>
                  <button id="${card.id}">PREPARACIÓN</button>
                </div>
              </div>
  `;
}


const recuperar = async () => {
  try {
    const response = await fetch("../productos.json");
    const result = await response.json();
    recetas.push(...result);
    cargarRecetas(recetas)
  } catch (error) {
    console.error(error);
  }
};

recuperar();

const cargarRecetas = (array) => {
  array.forEach((arr) => {
    const data = retornarCard(arr)
    containerCard.innerHTML += data
  });
};
