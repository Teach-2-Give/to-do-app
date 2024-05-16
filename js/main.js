const todoApp = document.querySelector(".todo-app");
const headerImg = document.querySelectorAll("header img");
const input = document.querySelector(".input-field input");
const todoListUl = document.querySelector(".todo-list ul");
const controls = document.querySelector(".controls");
const filterBtns = document.querySelectorAll(".controls .filters li");
const leftItemsNumberCount = document.querySelector(".left-items .number");
const clearCompleted = document.querySelector(".controls .clear-completed");


if (localStorage.length !== 0) {

/*
    - Calculate Number of Todos that were saved in Local Storage
    - Get Keys of Todos and Save them in Array
  */
  let numberOfSavedTodos = 0;
  let arrKeys = [];
  for (let [key, val] of Object.entries(localStorage)) {
    if (key.startsWith("todo-")) {
      numberOfSavedTodos += 1;
      arrKeys.push(key);
    }
  }
/*
   - console.log("Number of Saved Todos = " + numberOfSavedTodos); // debug
   - console.log(arrKeys); // debug
*/
  if (numberOfSavedTodos > 0) {
    
    for (let i = 1; i <= arrKeys.length; i++) {
      let data = JSON.parse(localStorage.getItem(`todo-${i}`));

      
      addTodo(data.text, data.class);
    }
  }
}


input.onfocus = function () {
  this.placeholder = ""; 
  this.parentElement.classList.add("focused");
};
input.onblur = function () {
  if (this.value.trim() !== "") { 

    addTodo(this.value);
  
    updateLocalStorage();
  }
  this.value = ""; 
  this.placeholder = this.dataset.placeholder; 
  this.parentElement.classList.remove("focused"); 
};

input.addEventListener("keyup", function (e) {
    if (e.key === "Enter" && this.value.trim() !== "") {
        
        addTodo(this.value);
        
        updateLocalStorage();
        this.value = ""; 
        this.placeholder = this.dataset.placeholder; 
        this.parentElement.classList.remove("focused"); 
    }
});
/*
  -When you click on icon button or P Element, toggle between Classes "active", "completed" to its Parent li.todo,
  -When you click on delete button, remove its entire Parent li.todo
*/
todoListUl.addEventListener("click", function (e) {
  if (e.target.className === "icon" || e.target.tagName === "P") {
    e.target.parentElement.classList.toggle("active");
    e.target.parentElement.classList.toggle("completed");

    updateLeftItemsNumber();

    updateFilter();

    updateLocalStorage();
  }
  if (e.target.className === "delete") {
    e.target.parentElement.remove();

    localStorage.removeItem(`${e.target.parentElement.id}`);

 
    updateLeftItemsNumber();

    updateFilter();

    numberingTodos();

    updateLocalStorage();
  }
});


/* When you click on filter button:
  - Remove Class "selected" from all btns
  - Add Class "selected" to clicked btn
  - Filter todos [All, Active, Completed]
*/
filterBtns.forEach(btn => {
  btn.onclick = function () {

    filterBtns.forEach(btn => {
      btn.classList.remove("selected");
    });

    this.classList.add("selected");

    makeFilter(this.dataset.filter);
  };
});


/*"Clear Completed"*/
clearCompleted.onclick = function () {
  document.querySelectorAll(".todo-list .todo").forEach(todo => {
    if (todo.classList.contains("completed")) {
      todo.remove();
      localStorage.removeItem(`${todo.id}`);


      numberingTodos();

      updateLocalStorage();
    }
  });
};


/** Helper Functions */

function applyTheme(newTheme) {
  let lastTheme = todoApp.classList.item(1);
  todoApp.classList.remove(lastTheme); 
  todoApp.classList.add(newTheme); 
  document.querySelector(`[data-theme="${newTheme}"]`).classList.remove("available");
  document.querySelector(`[data-theme="${lastTheme}"]`).classList.add("available");
}


/*dd a new todo*/
function addTodo(textParam, classParam) {
  const li = document.createElement("li"); 
  li.id = `todo-${document.querySelectorAll(".todo").length + 1}`;
  li.className = classParam || "todo active"; 
 
  li.innerHTML = `
    <span class="icon"><img class="check" src="images/icon-check.svg" alt="icon-check"></span>
    <p>${textParam}</p>
    <img class="delete" src="images/icon-cross.svg" alt="icon-cross">
  `;

  todoListUl.appendChild(li);

  updateLeftItemsNumber();

  numberingTodos();
}



function updateLeftItemsNumber() {
  leftItemsNumberCount.innerHTML = document.querySelectorAll(".todo.active").length; 
}

updateLeftItemsNumber();


/*Make filter*/
function makeFilter(filtered) {
  document.querySelectorAll(".todo-list .todo").forEach(todo => {
    if (!todo.classList.contains(filtered)) {
      todo.classList.add("hidden"); 
    } else {
      todo.classList.remove("hidden"); 
    }
  });
}


/*Update filter*/
function updateFilter() {
  for (btn of filterBtns) {
    if(btn.classList.contains("selected")) {
      makeFilter(btn.dataset.filter);
    }
  }
}


/*Numbering Todos [both data-number and id]*/
function numberingTodos() {
  document.querySelectorAll(".todo-list .todo").forEach((todo, i) => {
    todo.setAttribute("data-number", i + 1);
    todo.id = `todo-${i + 1}`;
  });
}
numberingTodos();


/*Update Local Storage*/
function updateLocalStorage() {
  
  for (let [key, val] of Object.entries(localStorage)) {
    if (key.startsWith("todo-")) {
      localStorage.removeItem(key);
    }
  }

  document.querySelectorAll(".todo-list .todo").forEach(todo => {
    let data = {
      "class": todo.className,
      "text": todo.textContent.trim()
    }
    localStorage.setItem(todo.id, JSON.stringify(data));
  });
}

/* Placeholder tasks*/
const placeholderTasks = ["Complete online JavaScript course", "Jog around the park 3x", "10 minutes meditation", "Complete Todo App on Frontend Mentor"];


let hasTasksInLocalStorage = false;
for (let i = 0; i < localStorage.length; i++) {
  if (localStorage.key(i).startsWith("todo-")) {
    hasTasksInLocalStorage = true;
    break;
  }
}

if (!hasTasksInLocalStorage) {
  placeholderTasks.forEach(task => addTodo(task));
}