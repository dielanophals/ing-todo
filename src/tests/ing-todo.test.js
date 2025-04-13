import { fixture, html, expect } from '@open-wc/testing';
import '../ing-todo.js';

describe('<ing-todo>', () => {
  it('Shows "No todos added yet" when there are no todos yet', async () => {
    const el = await fixture(html`<ing-todo></ing-todo>`);
    const p = el.shadowRoot.querySelector('.todo-items p');

    // Check if p tag is shown
    expect(p).to.exist;
    expect(p.textContent).to.include('No todos added yet');
  });

  it('Add new todo with addTodo()', async () => {
    const el = await fixture(html`<ing-todo></ing-todo>`);

    // Add todo
    el.addTodo({ detail: 'Run' });
    await el.updateComplete;

    const items = el.shadowRoot.querySelectorAll('todo-item');

    // Check if new todo item is created
    expect(items.length).to.equal(1);
    expect(items[0].todo.title).to.equal('Run');
  });

  it('Delete a todo with removeTodoItem()', async () => {
    // Set items in localstorage
    const mockTodo = { id: 'abc', title: 'Remove item', isCompleted: false };
    localStorage.setItem('todos', JSON.stringify([mockTodo]));

    const el = await fixture(html`<ing-todo></ing-todo>`);
    await el.updateComplete;

    // Check if todo is created
    const itemsBeforeDelete = el.shadowRoot.querySelectorAll('todo-item');
    expect(itemsBeforeDelete.length).to.equal(1);

    // Remove todo
    el.removeTodoItem({ detail: 'abc' });
    await el.updateComplete;

    // Check if todo is removed
    const items = el.shadowRoot.querySelectorAll('todo-item');
    expect(items.length).to.equal(0);
  });

  it('Toggle todo item with toggleCompleteTodoItem()', async () => {
    const el = await fixture(html`<ing-todo></ing-todo>`);

    // Add new todo
    el.addTodo({ detail: 'Swim' });
    await el.updateComplete;

    // Toggle todo
    el.toggleCompleteTodoItem({ detail: { todoId: el.todos[0].id, checkboxValue: true } });
    await el.updateComplete;

    // Check if todo is set to true
    expect(el.todos[0].isCompleted).to.be.true;
  });
});
