document.addEventListener("DOMContentLoaded", () => {
  const inputTodo = document.getElementById("input-todo");
  const buttonTodo = document.getElementById("button-todo");
  const buttonDeleteAll = document.getElementById("button-delete-all");
  const ulTodo = document.getElementById("ul-todo");

  buttonTodo.addEventListener("click", () => {
    const text = inputTodo.value.trim();
    if (!text) return;

    createTodo(text);
    inputTodo.value = "";
    saveAllTodo();
  });

  const createTodo = (task) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span class="text-todo">${task}</span>
      <input type="text" class="edit-input form-control d-none" value="${task}">
      <div class="btn-group">
        <button type="button" class="btn btn-success d-none save-btn">Save</button>
        <button type="button" class="btn btn-danger edit-btn">Edit</button>
        <button type="button" class="btn btn-warning delete-btn">Delete</button>
      </div>`;

    ulTodo.appendChild(li);
  };

  ulTodo.addEventListener("click", (e) => {
    const li = e.target.closest(".list-group-item");

    if (e.target.classList.contains("delete-btn")) {
      if (confirm("Are you sure you want to delete this task?")) {
        li.remove();
        saveAllTodo();
      }
    }

    if (e.target.classList.contains("edit-btn")) {
      const textSpan = li.querySelector(".text-todo");
      const editInput = li.querySelector(".edit-input");
      const saveBtn = li.querySelector(".save-btn");

      // Toggle visibility
      textSpan.classList.add("d-none");
      editInput.classList.remove("d-none");
      saveBtn.classList.remove("d-none");
      e.target.classList.add("d-none");
    }

    if (e.target.classList.contains("save-btn")) {
      const textSpan = li.querySelector(".text-todo");
      const editInput = li.querySelector(".edit-input");
      const editBtn = li.querySelector(".edit-btn");

      textSpan.textContent = editInput.value;
      textSpan.classList.remove("d-none");
      editInput.classList.add("d-none");
      e.target.classList.add("d-none");
      editBtn.classList.remove("d-none");

      saveAllTodo();
    }
  });

  buttonDeleteAll.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
      ulTodo.innerHTML = "";
      localStorage.removeItem("allTodos");
    }
  });

  const saveAllTodo = () => {
    const allTodos = [...document.querySelectorAll(".text-todo")].map(
      (task) => task.textContent
    );

    localStorage.setItem("allTodos", JSON.stringify(allTodos));
  };

  const loadAllTodo = () => {
    const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
    allTodos.forEach((task) => createTodo(task));
  };

  loadAllTodo();
});
