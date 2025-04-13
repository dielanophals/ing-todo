import { LitElement, html, css } from 'lit';
import { todoItemStyles } from './todo-item.styles.js';

const cross = new URL('../../../assets/icons/cross.svg', import.meta.url).href;

export class TodoItem extends LitElement {
    static properties = {
        todo: { type: Object }
    }

    static styles = [todoItemStyles];

    constructor() {
        super();
    }

    toggleCompleteTodoItem = e => {
        this.dispatchEvent(new CustomEvent('toggle-complete-todo-item', {
            detail: {
                checkboxValue: e.target.checked,
                todoId: this.todo.id
            }
        }));
    }

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
                    title="Delete item"
                    aria-label="Delete todo"
                    class="todo-delete"
                >
                    <img src=${cross} alt="" />
                </button>
            </li>
        `;
    }
}
customElements.define('todo-item', TodoItem);
