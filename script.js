let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks
    .filter(task => {
      if (currentFilter === "done") return task.completed;
      if (currentFilter === "pending") return !task.completed;
      return true;
    })
    .forEach((task, index) => {
      const li = document.createElement("li");

      li.innerHTML = `
        <span onclick="toggleTask(${index})" class="${task.completed ? 'completed' : ''}">
          ${task.text}
        </span>
        <button onclick="deleteTask(${index})">❌</button>
      `;

      list.appendChild(li);
    });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");

  if (input.value.trim() === "") return;

  tasks.push({
    text: input.value,
    completed: false
  });

  input.value = "";
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function filterTasks(filter) {
  currentFilter = filter;
  renderTasks();
}

renderTasks();