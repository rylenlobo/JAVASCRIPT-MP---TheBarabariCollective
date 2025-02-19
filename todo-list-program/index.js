// Simple To-Do List (Console-Based)

// Step 1: Define an empty array to store tasks
let tasks = [];

// Step 2: Function to display all tasks
function showTasks() {
  if (tasks.length === 0) {
    console.log("Your to-do list is empty!");
  } else {
    console.log("\nYour To-Do List:");
    for (let i = 0; i < tasks.length; i++) {
      console.log(`${i + 1}. ${tasks[i]}`);
    }
  }
}

// Step 3: Function to add a task
function addTask(task) {
  tasks.push(task);
  console.log(`Task "${task}" added successfully!`);
}

// Step 4: Function to remove a task
function removeTask(index) {
  if (index > 0 && index <= tasks.length) {
    let removed = tasks.splice(index - 1, 1);
    console.log(`Task "${removed}" removed successfully!`);
  } else {
    console.log("Invalid task number! Please try again.");
  }
}

// Step 5: Main program loop using while
function startToDoApp() {
  console.log("Welcome to the To-Do List App! Type 'exit' to quit.");
  while (true) {
    console.log(
      "\nChoose an option: \n1. View Tasks \n2. Add Task \n3. Remove Task \n4. Exit"
    );
    let choice = prompt("Enter a number: "); // Simulating user input

    if (choice === "1") {
      showTasks();
    } else if (choice === "2") {
      let newTask = prompt("Enter a new task: ");
      addTask(newTask);
    } else if (choice === "3") {
      showTasks();
      let taskNum = prompt("Enter the number of the task to remove: ");
      removeTask(parseInt(taskNum));
    } else if (choice === "4" || choice.toLowerCase() === "exit") {
      console.log("Goodbye! Exiting the To-Do List App.");
      break;
    } else {
      console.log("Invalid choice! Please enter a number between 1 and 4.");
    }
  }
}

// Run the To-Do List App
startToDoApp();
