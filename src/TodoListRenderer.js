import _ from 'lodash';
import threedots from './icons8-menu-vertical-30.png';
import trashcan from './icons8-trash-can-50.png';

const todoListEl = document.querySelector('.todo-list-el');
export default function renderTodos(todolist = []) {
  todoListEl.innerHTML = '';
  _.orderBy(todolist, ['index'], ['asc']).forEach((todo) => {
    todoListEl.innerHTML += `<li id='lst_${todo.index}'>
            <input id='chk_${todo.index}' type='checkbox' class='checkbox-item' >
            <input id='txt_${todo.index}' type='text' class='todo-desc' value='${todo.description}' >
            <img id='img_${todo.index}' class='list-action-icon' alt='action icon' src='${threedots}'>
        </li>`;
  });

  const taskItemCheckboxes = document.querySelectorAll('.checkbox-item');
  const taskitemLabelInputs = document.querySelectorAll('.todo-desc');

  taskItemCheckboxes.forEach((checkboxItem) => {
    checkboxItem.addEventListener('click', (ev) => {
      if (ev.target.checked) {
        document.querySelector(`#txt_${ev.target.id.substring(ev.target.id.indexOf('_') + 1)}`).classList.add('strikethrough-text');
      } else {
        document.querySelector(`#txt_${ev.target.id.substring(ev.target.id.indexOf('_') + 1)}`).classList.remove('strikethrough-text');
      }
    });
  });

  taskitemLabelInputs.forEach((labelInput) => {
    labelInput.addEventListener('focus', (ev) => {
      labelInput.parentElement.classList.add('li-background-highlight-edit');
      labelInput.classList.add('li-background-highlight-edit');
      document.querySelector(`#img_${ev.target.id.split('_')[1]}`).src = trashcan;
    });

    labelInput.addEventListener('blur', (ev) => {
      labelInput.parentElement.classList.remove('li-background-highlight-edit');
      labelInput.classList.remove('li-background-highlight-edit');
      document.querySelector(`#img_${ev.target.id.split('_')[1]}`).src = threedots;
    });

    labelInput.addEventListener('keypress', (ev) => {
      if ((ev.key === 'Enter') && (ev.target.value !== '')) {
        todolist.find((todo) => todo.index === parseInt(ev.target.id.split('_')[1], 10)).description = ev.target.value;
        ev.target.blur();
      }
    });
  });
}