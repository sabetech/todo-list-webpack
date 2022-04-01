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
    renderTodos(this);
    this.saveToLocalStorage();
  }

  edit(index, updatedDescription) {
    this.existingTodos.find((todo) => todo.index === index).description = updatedDescription;
    this.saveToLocalStorage();
  }

  delete(index) {
    this.existingTodos = this.existingTodos.filter((todo) => index !== todo.index)
      .map((todo, i) => {
        todo.index = i;
        return todo;
      });

    renderTodos(this);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('tododata', JSON.stringify(this.existingTodos));
  }

  markAsComplete(index) {
    this.existingTodos.find((todo) => todo.index === index).completed = true;
    this.saveToLocalStorage();
  }

  revertMarkAsComplete(index) {
    this.existingTodos.find((todo) => todo.index === index).completed = false;
    this.saveToLocalStorage();
  }

  clearCompletedTasks() {
    this.existingTodos = this.existingTodos.filter((todo) => todo.completed === true);
    this.saveToLocalStorage();
  }
}