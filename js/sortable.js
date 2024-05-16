/*
    -Drag and Drop handler Functions
*/
function dragStart(e) {
    e.dataTransfer.setData("number", e.target.dataset.number); 
    e.dataTransfer.setData("text", e.target.id); 
    e.dataTransfer.effectAllowed = "move"; 
    e.target.classList.add('dragging'); 
  }
  
  function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }
  
  function dragEnter(e) {
    e.target.classList.add('over');
  }
  
  function dragLeave(e) {
    e.target.classList.remove('over');
  }
  
  function dragEnd(e) {
    e.target.classList.remove('dragging');
  }
  
  function drop(e) {
    e.preventDefault();
    const number = e.dataTransfer.getData("number");
    const data = e.dataTransfer.getData("text");
    if (number > e.currentTarget.dataset.number) {
      e.currentTarget.before(document.getElementById(data));
    } else {
      e.currentTarget.after(document.getElementById(data));
    }
    e.currentTarget.classList.remove('over');
   
    numberingTodos();
   
    updateLocalStorage();
  }
  
  /*Drag and Drop Events to each todo*/
  document.querySelectorAll(".todo-list .todo").forEach((li) => {
    li.setAttribute("draggable", true);
    li.lastElementChild.setAttribute("draggable", false);
   
    li.ondragstart = dragStart;
  
    li.ondragover = dragOver;
  
    li.ondragenter = dragEnter;

    li.ondragleave = dragLeave;
    
    li.ondragend = dragEnd;
    
    li.ondrop = drop;
  });