import { LitElement, html, css } from 'lit';
import { todoItemStyles } from './todo-item.styles.js';
import '@lion/ui/define/lion-icon.js';

export class TodoItem extends LitElement {
    static properties = {
        // Set todo property
        todo: { type: Object }
    }

    static styles = [todoItemStyles];

    constructor() {
        super();
    }

    // Toggle todo item when checkbox is clicked
    toggleCompleteTodoItem = e => {
        this.dispatchEvent(new CustomEvent('toggle-complete-todo-item', {
            detail: {
                checkboxValue: e.target.checked,
                todoId: this.todo.id
            }
        }));
    }

    // Remove todo item when remove button is clicked
    removeTodoItem = id => {
        this.dispatchEvent(new CustomEvent('remove-todo-item', {
            detail: id
        }));
      }

    render() {
        return html`
            <li class="checkbox-area">
                <input type="checkbox" id=${this.todo.id} .checked=${this.todo.isCompleted} @change=${this.toggleCompleteTodoItem} title="Complete item">
                <label for=${this.todo.id} title="Complete item">${this.todo.title}</label>
                <button
                    @click=${() => this.removeTodoItem(this.todo.id)}
                    title="Delete ${this.todo.title}"
                    aria-label="Delete ${this.todo.title}"
                    class="todo-delete"
                >
                    <lion-icon icon-id="ing-app:icons:cross"></lion-icon>
                </button>
            </li>
        `;
    }
}
customElements.define('todo-item', TodoItem);
