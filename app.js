let todos = document.querySelector("ul");

//checking if local storage has items
const checkLocalTodos = () => {
  let todosNew;
  if (localStorage.getItem("todos")) {
    todosNew = JSON.parse(localStorage.getItem("todos"));
    return todosNew;
  } else {
    todosNew = [];
    return todosNew;
  }
};
const saveLocalTodos = (todo) => {
  const todosNew = checkLocalTodos();
  todosNew.push(todo);
  localStorage.setItem("todos", JSON.stringify(todosNew));
};

//display the local storage items
const displayLocalTodos = () => {
  const todosNew = checkLocalTodos();
  if (todosNew.length)
    todosNew.forEach((todo) => {
      let html = `
    <span>${todo}</span>
    <i class="fas fa-trash-alt delete" aria-hidden="true"></i>
    `;
      let newLi = document.createElement("li");
      newLi.classList =
        "list-group-item d-flex justify-content-between align-items-center";
      newLi.innerHTML = html;
      todos.appendChild(newLi);
    });
};

//delete local storage items
const deleteLocalTodos = (todo) => {
  const todosNew = checkLocalTodos();
  console.log(todo.children[0].innerText);
  todosNew.splice(todosNew.indexOf(todo.children[0].innerText), 1);
  localStorage.setItem("todos", JSON.stringify(todosNew));
};
//display todos saved in local storage
document.addEventListener("DOMContentLoaded", displayLocalTodos);

//delete a todo
todos.addEventListener("click", (e) => {
  if (e.target.tagName === "I") {
    deleteLocalTodos(e.target.parentNode);
    e.target.parentNode.remove();
  }
});

// add a new todo
let addTodo = document.querySelector(".add-form");
addTodo.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = addTodo.add.value.trim();
  if (name.length) {
    let html = `
    <span>${name}</span>
    <i class="fas fa-trash-alt delete" aria-hidden="true"></i>
    `;
    let newLi = document.createElement("li");
    newLi.classList =
      "list-group-item d-flex justify-content-between align-items-center";
    newLi.innerHTML = html;
    saveLocalTodos(name);
    todos.appendChild(newLi);
    addTodo.reset();
  }
});

//search todos
let search = document.forms["search"].search;
search.addEventListener("keyup", (e) => {
  let value = e.target.value.trim().toLowerCase();
  let lis = todos.querySelectorAll("li");

  lis.forEach((li) => {
    let todo = li.firstElementChild.textContent.toLowerCase();
    if (!todo.includes(value)) {
      li.classList.add("hide");
    } else {
      li.classList.remove("hide");
    }
  });
});
