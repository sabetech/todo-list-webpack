import _ from 'lodash';
import './style.css';


const todoListEl = document.querySelector('.todo-list-el');



let todos = [
  {
    description: "Hey",
    completed: false,
    index: 0
  },
  {
    description: "spija koutj",
    completed: false,
    index: 1
  }
]

const showList = () => {
  todos = _.orderBy(todos, ['index'],['asc']);
  todos.map((todo) => {
    const input = document.createElement('input');
    input.id = todo.index
    input.type = "checkbox";

    todoListEl.innerHTML += "<li><input type='checkbox'><label class='todo-desc'>"+ todo.description +"</label></li>";

  });
}

showList();