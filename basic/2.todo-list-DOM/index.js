// Enhanced To-Do List with DOM Manipulation

// Step 1: Define tasks array with task objects
let tasks = [];
let currentFilter = "all";

// Update tasks counter
function updateCounter() {
  const activeTasksCount = tasks.filter((task) => !task.completed).length;
  document.getElementById(
    "tasks-counter"
  ).textContent = `${activeTasksCount} item${
    activeTasksCount !== 1 ? "s" : ""
  } left`;
}

// Apply current filter to tasks
function applyFilter() {
  const taskElements = document.querySelectorAll("#task-list li");
  taskElements.forEach((li) => {
    const taskId = parseInt(li.getAttribute("data-id"));
    const task = tasks.find((t) => t.id === taskId);

    if (
      currentFilter === "all" ||
      (currentFilter === "active" && !task.completed) ||
      (currentFilter === "completed" && task.completed)
    ) {
      li.style.display = "flex";
    } else {
      li.style.display = "none";
    }
  });
}

// Step 2: Function to display all tasks
function showTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML =
      '<li class="empty-message">Your to-do list is empty!</li>';
  } else {
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.setAttribute("data-id", task.id);

      // Create checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => toggleTaskCompletion(task.id));

      // Create task text
      const span = document.createElement("span");
      span.textContent = task.text;
      if (task.completed) {
        span.classList.add("completed");
      }

      // Create delete button
      const removeBtn = document.createElement("button");
      removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
      removeBtn.className = "delete-btn";
      removeBtn.onclick = () => removeTask(task.id);

      // Append elements to list item
      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(removeBtn);
      taskList.appendChild(li);
    });
  }

  applyFilter();
  updateCounter();
}

function generateTaskId() {
  return Math.floor(1000 + Math.random() * 9000);
}

// Step 3: Function to add a task
function addTask(taskText) {
  if (taskText.trim() !== "") {
    const newTask = {
      id: generateTaskId(),
      text: taskText,
      completed: false
    };

    tasks.push(newTask);
    showTasks();
  }
}

// Step 4: Function to remove a task
function removeTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  showTasks();
}

// Step 5: Toggle task completion
function toggleTaskCompletion(taskId) {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  showTasks();
}

// Step 6: Clear completed tasks
function clearCompleted() {
  tasks = tasks.filter((task) => !task.completed);
  showTasks();
}

// Set up event listeners
document.addEventListener("DOMContentLoaded", () => {
  showTasks();

  // Add task event listeners
  document.getElementById("add-task-btn").addEventListener("click", () => {
    const newTaskInput = document.getElementById("new-task");
    addTask(newTaskInput.value);
    newTaskInput.value = "";
  });

  document.getElementById("new-task").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const newTaskInput = document.getElementById("new-task");
      addTask(newTaskInput.value);
      newTaskInput.value = "";
    }
  });

  // Filter buttons event listeners
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      applyFilter();
    });
  });

  // Clear completed button event listener
  document
    .getElementById("clear-completed")
    .addEventListener("click", clearCompleted);
});
