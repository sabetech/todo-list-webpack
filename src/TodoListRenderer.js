import _ from 'lodash';

const todoListEl = document.querySelector('.todo-list-el');
export default function renderTodos(todolist = []) {
  todoListEl.innerHTML = '';
  _.orderBy(todolist, ['index'], ['asc']).forEach((todo) => {
    todoListEl.innerHTML += `<li><input type='checkbox'><label class='todo-desc'>${todo.description}</label></li>`;
  });
}