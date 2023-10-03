const input = document.querySelector("#task");
const btn = document.querySelector("#btn");
const ul = document.querySelector("#list");
const empty = document.querySelector(".empty");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const text = input.value;
  const li = document.createElement("li");
  li.textContent = text;
  li.appendChild(addBtn());
  ul.appendChild(li);
  input.value = "";
  empty.style.display = "none";
});

const addBtn = () => {
  const btn = document.createElement("button");
  const icon = document.createElement("i");
  icon.className = "fa-solid fa-trash";
  btn.appendChild(icon);
  btn.addEventListener("click", (e) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Estas por eliminar esta tarea",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const item = e.target.closest("li");
        if (item) {
          ul.removeChild(item);
          const items = document.querySelectorAll("li");
          if (items.length === 0) {
            empty.style.display = "block";
          }
        }
      }
    });
  });
  return btn;
};
