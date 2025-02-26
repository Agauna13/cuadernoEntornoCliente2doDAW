import { createLists, createButton } from "./createStructure.js";

// Evento que inicializa el tablero cuando el DOM ha cargado completamente.
document.addEventListener("DOMContentLoaded", () => {
  createLists("todo", "Por Hacer");
  createLists("in-progress", "En Progreso");
  createLists("done", "Hechas");
  const newListButton = createButton("addListButton", "addListButton", "+ Añadir Lista");
  let tablero = document.getElementById("tablero");
  tablero.insertAdjacentElement("afterend", newListButton);

  // Evento para crear una nueva lista al hacer clic en el botón de añadir lista.
  newListButton.addEventListener("click", () => {
    let listName = prompt("Título para la lista?");
    let newId = "lista" + Math.floor(Math.random() * 1000);
    createLists(newId, listName);
    let newList = document.getElementById(newId);
    setListEventListeners(newList);
    setTaskEventListeners();
  });

  // Evento para eliminar una tarea específica al hacer clic en el botón de eliminar.
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-task")) {
      const task = e.target.closest(".task");
      if (task) task.remove();
    }
  });

  // Evento para eliminar una lista específica al hacer clic en el botón de eliminar lista.
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-list")) {
      const list = e.target.closest(".list");
      if (list) list.remove();
    }
  });

  // Configura el manejo de arrastrar y soltar para las listas existentes.
  document.querySelectorAll(".list").forEach((list) => {
    list.addEventListener("dragover", (e) => {
      e.preventDefault();
      list.classList.add("rojo");
    });

    list.addEventListener("dragleave", () => {
      list.classList.remove("rojo");
    });

    list.addEventListener("drop", () => {
      if (draggedTask) {
        list.insertBefore(draggedTask, list.querySelector(".add-task"));
        list.classList.remove("rojo");
      }
    });

    list.querySelector(".add-task").addEventListener("click", () => {
      addTask(list.id);
      setTaskEventListeners();
    });

    list.querySelector(".remove-task").addEventListener("click", () => {
      deleteList(list.id, "task");
    });
  });
});

let draggedTask = null; // Variable para almacenar la tarea que se está arrastrando.

// Función para añadir tareas a una lista específica.
function addTask(listId) {
  const list = document.getElementById(listId);
  const task = document.createElement("div");
  task.className = "task";
  task.draggable = true;
  task.innerHTML = `
    <div class="task-content">
      <div class="task-text">Nueva Tarea</div>
      <button class="delete-task"> &#10060</button>
    </div>
  `;

  // Configura eventos de arrastrar para la tarea recién creada.
  task.addEventListener("dragstart", () => {
    draggedTask = task;
  });

  task.addEventListener("dragend", () => {
    draggedTask = null;
  });

  list.insertBefore(task, list.querySelector(".add-task"));
}

// Función para eliminar todos los elementos con una clase específica dentro de un contenedor.
function deleteList(containerId, className) {
  const container = document.getElementById(containerId);
  const elements = container.querySelectorAll(`.${className}`);
  elements.forEach((element) => {
    element.remove();
  });
}

// Función para configurar los eventos de edición y manejo de tareas.
function setTaskEventListeners() {
  document.querySelectorAll(".task-text").forEach((taskText) => {
    // Permite editar el texto de una tarea al hacer doble clic.
    taskText.addEventListener("dblclick", () => {
      taskText.contentEditable = true;
    });

    // Desactiva la edición al perder el foco del texto.
    taskText.addEventListener("blur", (e) => {
      e.preventDefault();
      taskText.contentEditable = false;
    }, true);

    // Finaliza la edición al presionar Enter.
    taskText.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        taskText.contentEditable = false;
      }
    });
  });
}

// Función para configurar eventos de manejo de listas.
function setListEventListeners(newList) {
  console.log(newList);

  // Configura el manejo de arrastrar y soltar para una lista recién creada.
  newList.addEventListener("dragover", (e) => {
    e.preventDefault();
    newList.classList.add("rojo");
  });

  newList.addEventListener("dragleave", () => {
    newList.classList.remove("rojo");
  });

  newList.addEventListener("drop", () => {
    if (draggedTask) {
      newList.insertBefore(draggedTask, newList.querySelector(".add-task"));
      newList.classList.remove("rojo");
    }
  });

  // Configura el evento para añadir tareas a la nueva lista.
  newList.querySelector(".add-task").addEventListener("click", () => {
    addTask(newList.id);
    setTaskEventListeners();
  });

  // Configura el evento para eliminar todas las tareas de la nueva lista.
  newList.querySelector(".remove-task").addEventListener("click", () => {
    deleteList(newList.id, "task");
  });
}
