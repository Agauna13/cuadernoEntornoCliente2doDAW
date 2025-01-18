let draggedTask = null;

const toDo = document.getElementById("todoButton");
const inProgress = document.getElementById("inProgressButton");
const done = document.getElementById("doneButton");

const toDoDelete = document.getElementById("toDoDeleteButton");
const inProgressDelete = document.getElementById("inProgressDeleteButton");
const doneDelete = document.getElementById("doneDeleteButton");

toDo.addEventListener("click", () => {
  addTask("todo");
});

inProgress.addEventListener("click", () => {
  addTask("in-progress");
});

done.addEventListener("click", () => {
  addTask("done");
});

toDoDelete.addEventListener("click", (e) => {
  deleteList("todo", "task");
});

inProgressDelete.addEventListener("click", (e) => {
  deleteList("in-progress", "task");
});

doneDelete.addEventListener("click", (e) => {
  deleteList("done", "task");
});

function addTask(listId) {
  const list = document.getElementById(listId);
  const task = document.createElement("div");
  task.className = "task";
  task.draggable = true;
  task.innerHTML = `
          <div class="task-content" id="task">
            <input type="text" value="Nueva tarea">
            <button class="delete-task"> &#10060</button>
          </div>
      `;

      
  task.addEventListener("dragstart", () => {
    draggedTask = task;
  });

  task.addEventListener("dragend", () => {
    draggedTask = null;
  });

  const deleteButton = task.querySelector(".delete-task");
  deleteButton.addEventListener("click", () => {
    task.remove();
  });

  list.insertBefore(task, list.querySelector(".add-task"));
}

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

function deleteList(containerId, className) {
  const container = document.getElementById(containerId);

  const elements = container.querySelectorAll(`.${className}`);

  elements.forEach((element) => {
    element.remove();
  });
}
