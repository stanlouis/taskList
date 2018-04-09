// Define UI Vars
const form = document.querySelector(".task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

//load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener("DOMContentLoaded", getLocalStorageTasks);
  // Add task event
  form.addEventListener("submit", getTaskInput);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear task event
  clearBtn.addEventListener("click", clearTasks);
  // Filter Tasks
  filter.addEventListener("keyup", filterTasks);
}

// Add task to The Dom
function addTaskToDOM(item) {
  // Create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // Create text node and append to li
  li.appendChild(document.createTextNode(item));
  // Create new link element
  const link = document.createElement("a");
  // Add a class
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);
}

// Get Tasks from local storage
function getLocalStorageTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(task => {
    addTaskToDOM(task);
  });
}

// Get Task Input
function getTaskInput(e) {
  if (!(taskInput.value && taskInput.value.trim().length)) {
    alert("Add a task");
    e.preventDefault();
  } else {
    addTaskToDOM(taskInput.value);

    // Store task in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = "";
  }
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      let taskToDelete = e.target.parentElement.parentElement;
      taskToDelete.remove();
      // Remove from local storage
      removeTaskFromLocalStorage(taskToDelete);
    }
  }
}

// Remove from local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Clear Task
function clearTasks() {
  // taskList.innerHTML = '';

  // Faster https://jsperf.com/innerhtml-vs-removechild/47
  while (taskList.firstChild) taskList.removeChild(taskList.firstChild);

  // Clear from local storage
  clearTasksFromLocalStorage();
}

// Clear Tasks from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(task => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = "block";
    } else task.style.display = "none";
  });
}
