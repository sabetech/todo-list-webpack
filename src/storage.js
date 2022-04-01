import TodoTask from './todotask.js';
import renderTodos from './TodoListRenderer.js';

export default class TodoStorage {
  constructor() {
    this.existingTodos = JSON.parse(localStorage.getItem('tododata')) || [];
  }

  getExistingTodos() {
    return this.existingTodos;
  }

  saveTodoEntry(tododescription) {
    const myNewTodoTask = new TodoTask(tododescription, this.existingTodos.length);
    this.existingTodos.push(myNewTodoTask);

    console.log(this.existingTodos);

    renderTodos(this.existingTodos);
  }
}