/**
 * @jest-environment jsdom
 */
import TodoStorage from './storage.js';

const storage = new TodoStorage();

document.body.innerHTML = '<div>'
    + '  <ul class="todo-list-el"></li>'
    + '</div>'
    + '<div class="clear-all-selected">'
    + '<a id="clear-selected-todos">Clear all Selected</a>'
    + '</div>';

window.localStorage = Storage.prototype;
describe('Testing the Add Todo Item functionality', () => {
  test('adding todo should add list item to UI', () => {
    storage.saveTodoEntry('Test Entry 1');
    const list = document.querySelectorAll('.todo-list-el li');
    expect(list).toHaveLength(1);
  });

  test('storage array should have length of 2', () => {
    storage.saveTodoEntry('Test Entry 2');
    expect(storage.existingTodos.length).toBe(2);
  });
});

describe('Testing Remove Todo Functionality', () => {
  test('remove todo should reduce UI list by 1', () => {
    storage.delete(0);
    const list = document.querySelectorAll('.todo-list-el li');
    expect(list).toHaveLength(1);
  });

  test('remove todo should reduce array to 0', () => {
    storage.delete(0);
    expect(storage.existingTodos.length).toBe(0);
  });

  test('clear completed should remove all completed items', () => {
    storage.saveTodoEntry('Test Entry 1');
    storage.saveTodoEntry('Test Entry 2');
    storage.saveTodoEntry('Test Entry 3');

    storage.markAsComplete(0);
    storage.markAsComplete(1);

    storage.clearCompletedTasks();

    expect(storage.existingTodos.length).toBe(1);
  });
});

describe('Testing Updates on Todo Functionality', () => {
  test('update todo index 0 to completed:true', () => {
    storage.saveTodoEntry('Test Entry 1');
    storage.markAsComplete(0);
    expect(storage.getExistingTodos()[0].completed).toBe(true);
  });
});