import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '../components/todo-form/todo-form.js';

describe('<todo-form>', () => {
  it('Is empty at start', async () => {
    const el = await fixture(html`<todo-form></todo-form>`);
    // Check if todo is empty
    expect(el.todo).to.equal('');
  });

  it('Set todo', async () => {
    const el = await fixture(html`<todo-form></todo-form>`);
    el.todo = 'Bike';

    // Check if todo is set to 'Bike'
    expect(el.todo).to.equal('Bike');
  });

  it('Fire submit-todo event on click', async () => {
    const el = await fixture(html`<todo-form></todo-form>`);
    el.todo = 'Afwassen';
    await el.updateComplete;

    // Simulate click event
    const button = el.shadowRoot.querySelector('button');
    setTimeout(() => button.click());

    // Check if event is fired and todo is cleared
    const event = await oneEvent(el, 'submit-todo');
    expect(event.detail).to.equal('Afwassen');
    expect(el.todo).to.equal('');
  });
});
