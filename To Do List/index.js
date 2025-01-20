//Importamos la función creada en el anterior módulo.
import { createLists } from "./createStructure.js";

/*Añadimos un escuchador que tiene en cuenta cuando el Dom está totalmente cargado para empezar a crear
la estructura principal recoger los principales botones y asignar aquellos eventos
que sólo funcionarán si el dom está completamente cargado
*/
document.addEventListener("DOMContentLoaded", () => {
  createLists();

  const toDo = document.getElementById("todoButton");
  const inProgress = document.getElementById("inProgressButton");
  const done = document.getElementById("doneButton");

  const toDoDelete = document.getElementById("toDoDeleteButton");
  const inProgressDelete = document.getElementById("inProgressDeleteButton");
  const doneDelete = document.getElementById("doneDeleteButton");


  //Escuchadores para los botones de añadir elementos a la listao eliminar la lista entera.
  toDo.addEventListener("click", () => {
    addTask("todo");
  });

  inProgress.addEventListener("click", () => {
    addTask("in-progress");
  });

  done.addEventListener("click", () => {
    addTask("done");
  });

  toDoDelete.addEventListener("click", () => {
    deleteList("todo", "task");
  });

  inProgressDelete.addEventListener("click", () => {
    deleteList("in-progress", "task");
  });

  doneDelete.addEventListener("click", () => {
    deleteList("done", "task");
  });


  //Selector de elementos que maneja el estilo que adquiere una lista al pasar por encima con una tarea
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
      }
      list.classList.remove("rojo");
    });
  });
});


/*funcion que maneja la edición de las tareas. al hacer dobleclick, le quitamos 
el atributo 'disabled' que adquiere la primera vez que lo editamos (al crearlo)
y se vuelve a establecer cuando hacemos foco fuera del texto, o cuando apretamos
enter una vez hemos acabado con la edición.*/
function editTask(taskText) {
  taskText.removeAttribute("disabled");
  taskText.focus();


  taskText.addEventListener("blur", () => {
    taskText.setAttribute("disabled", true);
    if (taskText.value.trim() === "") {
      taskText.value = "Nueva Tarea";
    }
  });

  taskText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      console.log("enter");
      taskText.setAttribute("disabled", true);
      taskText.blur();
    }
  });
}

//Funcion que elimina todas las tareas de una lista determinada mediante un querySelectorAll
function deleteList(containerId, className) {
  const container = document.getElementById(containerId);
  const elements = container.querySelectorAll(`.${className}`);
  elements.forEach((element) => {
    element.remove();
  });
}


//Establecemos la tarea que va a ser arrastrada como null para ir guardando aquí
//aquella tarea en la que iniciemos el evento drag.
let draggedTask = null;


/*Funcion para añadir tareas en la que mediante un parámetro, capturamos el id de
la lista a la que añadir la tarea, creamos un div para la tarea y la rellenamos
con un div que nos permite (a futuro) encapsular el evento del doble click y al
cual añadiremos los diferentes escuchadores para manejar la edición de la tarea.*/
function addTask(listId) {
  const list = document.getElementById(listId);
  const task = document.createElement("div");
  task.className = "task";
  task.draggable = true;
  task.innerHTML = `
    <div class="task-content">
      <input class="task-text" value="Nueva Tarea"/>
      <button class="delete-task"> &#10060</button>
    </div>
  `;
  console.log(task);

  task.addEventListener("dragstart", () => {
    draggedTask = task;
  });

  task.addEventListener("dragend", () => {
    draggedTask = null;
  });

  const taskText = task.querySelector(".task-text");
  const deleteButton = task.querySelector(".delete-task");

  task.addEventListener("dblclick", () => {
    console.log("hola");
    editTask(taskText);
  });

  deleteButton.addEventListener("click", () => {
    task.remove();
  });

  list.insertBefore(task, list.querySelector(".add-task"));
}