import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '../components/todo-item/todo-item.js';
import { icons } from '@lion/ui/icon.js';

before( async () => {
    function resolveLionIcon(iconset, name) {
        switch (iconset) {
            case 'icons':
            return import('../icons/iconset-icons.js').then(module => {
                return module[name]
            });
            default:
            throw new Error(`Unknown iconset ${iconset}`);
        }
    }

    icons.addIconResolver('ing-app', resolveLionIcon);
});

describe('<todo-item>', () => {
    // Create Sample todo item
    const sampleTodo = {
        id: '123',
        title: 'Test task',
        isCompleted: false
    };

    it('Shows correct title of todo', async () => {
        const el = await fixture(html`<todo-item .todo=${sampleTodo}></todo-item>`);
        
        // Check if label is name of todo item
        const label = el.shadowRoot.querySelector('label');
        expect(label.textContent).to.include('Test task');
    });

    it('Set checkbox to true when item is completed', async () => {
        const completedTodo = { ...sampleTodo, isCompleted: true };
        const el = await fixture(html`<todo-item .todo=${completedTodo}></todo-item>`);
        
        // Checkbox is checked
        const checkbox = el.shadowRoot.querySelector('input[type=checkbox]');
        expect(checkbox.checked).to.be.true;
    });

    it('Send event when todo is changed', async () => {
        const el = await fixture(html`<todo-item .todo=${sampleTodo}></todo-item>`);
        const checkbox = el.shadowRoot.querySelector('input[type=checkbox]');

        setTimeout(() => checkbox.dispatchEvent(new Event('change')));

        // Check if event is fired when toggled
        const event = await oneEvent(el, 'toggle-complete-todo-item');
        expect(event.detail.todoId).to.equal(sampleTodo.id);
    });

    it('Delete todo item and check sent id', async () => {
        const el = await fixture(html`<todo-item .todo=${sampleTodo}></todo-item>`);
        const deleteBtn = el.shadowRoot.querySelector('lion-icon');

        setTimeout(() => deleteBtn.click());

        // Check if event is fired when deleted
        const event = await oneEvent(el, 'remove-todo-item');
        expect(event.detail).to.equal(sampleTodo.id);
    });
});
