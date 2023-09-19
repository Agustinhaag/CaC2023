const scients = document.querySelector("#scients");
const Calc = document.querySelector("#calc");
const container = document.querySelector(".container");
const cientifica = document.querySelector("#calcScien");
scients.addEventListener("click", () => {
  cientifica.className = "mostrar";
  scients.classList.add("cientifica");
  Calc.classList.remove("cientifica");
  container.style.width = "50%";
});

Calc.addEventListener("click", () => {
  cientifica.className = "cientifica";
  Calc.classList.add("cientifica");
  scients.classList.remove("cientifica");
  container.style.width = "26%";
});

const display = document.querySelector("#display");
const botones = document.querySelectorAll(".boton");

botones.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculadora(btn, display);
  });
});

const calculadora = (boton, display) => {
  switch (boton.innerHTML) {
    case "C":
      borrar(display);
      break;
    case "=":
      calcular(display);
      break;
    case "π":
      pi(display);
      break;
    case "←":
      eliminar(display);
      break;
    case "^":
      potencia(display);
      break;
    case "x^2":
      cuadrado(display);
      break;
    case "√":
      raiz(display);
      break;
    default:
      actualizar(display, boton);
      break;
  }
};

function raiz(display) {
  let content = display.textContent;
  content = Math.sqrt(display.textContent);
  display.textContent = content;
}

function cuadrado(display) {
  let content = display.textContent;
    content = Math.pow(display.textContent, 2);
    display.textContent = content;
}

function potencia(display) {
  if (display.innerHTML == 0) {
    display.innerHTML = "";
  }
  display.innerHTML += "**";
}

function pi(display) {
  if (display.innerHTML == 0) {
    display.innerHTML = "";
  }
  const pi = Math.PI;
  display.innerHTML += pi;
}

function actualizar(display, boton) {
  if (display.innerHTML == 0) {
    display.innerHTML = "";
  }
  display.innerHTML = display.innerHTML + boton.innerHTML;
}
function calcular(display) {
  try {
    display.innerHTML = math.evaluate(display.innerHTML);
  } catch (error) {
    display.textContent = "Inválido";
    console.error(error);
  }
}
function borrar(display) {
  display.innerHTML = 0;
}
const eliminar = (display) => {
  let currentValue = display.textContent;
  if (currentValue.length > 1) {
    currentValue = currentValue.slice(0, -1);
    display.textContent = currentValue;
  } else {
    display.textContent = 0;
  }
};
