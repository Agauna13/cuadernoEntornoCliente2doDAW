let draggedTask = null;

    function addTask(listId) {
      const list = document.getElementById(listId);
      const task = document.createElement("div");
      task.className = "task";
      task.draggable = true;
      task.innerHTML = `
        <input type="text" value="Nueva tarea" onfocus="this.select()">
      `;

      task.addEventListener("dragstart", () => {
        draggedTask = task;
      });

      task.addEventListener("dragend", () => {
        draggedTask = null;
      });

      list.insertBefore(task, list.querySelector(".add-task"));
    }

    document.querySelectorAll(".list").forEach((list) => {
      list.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      list.addEventListener("drop", () => {
        if (draggedTask) {
          list.insertBefore(draggedTask, list.querySelector(".add-task"));
        }
      });
    });