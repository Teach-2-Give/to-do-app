// Drag and Drop handler Functions
function dragStart(e) {
    e.dataTransfer.setData("number", e.target.dataset.number); // Save "data-number" of dragged item in "number"
    e.dataTransfer.setData("text", e.target.id); // Save "id" of dragged Item in "text"
    e.dataTransfer.effectAllowed = "move"; // Make drag effect "move"
  }
  
  function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move"; // Make drop effect "move"
  }
  
  function drop(e) {
    e.preventDefault();
    const number = e.dataTransfer.getData("number");
    const data = e.dataTransfer.getData("text");
    if (number > e.currentTarget.dataset.number) { // Check if number of dragged item > number of dropped item
      e.currentTarget.before(document.getElementById(data)); // Insert dragged item before dropped item
    } else {
      e.currentTarget.after(document.getElementById(data)); // Insert dragged item after dropped item
    }
    // update Numbering Todos
    numberingTodos();
    // update Local Storage
    updateLocalStorage();
  }
  
  // Add Drag and Drop Events to each todo
  document.querySelectorAll(".todo-list .todo").forEach((li) => {
    li.setAttribute("draggable", true);
    li.lastElementChild.setAttribute("draggable", false); // Make delete button not draggable
    // Add Event "dragstart" to each todo
    li.ondragstart = dragStart;
    // Add Event "dragover" to each todo to allow drop
    li.ondragover = dragOver;
    // Add Event "drop" to each todo
    li.ondrop = drop;
  });