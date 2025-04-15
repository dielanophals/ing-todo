import { LitElement, html, css } from 'lit';
import { todoItemStyles } from './todo-item.styles.js';
import '@lion/ui/define/lion-icon.js';

export class TodoItem extends LitElement {
    static properties = {
        // Set todo property
        todo: { type: Object },
        isEditModus: {type: Boolean}
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

      editTodoItem = id => {
        this.isEditModus = true;
      }

      editTitleTodo = (e) => {
        this.todo.title = e.target.value;

        this.dispatchEvent(new CustomEvent('edit-todo-item', {
            detail: {
                title: this.todo.title,
                todoId: this.todo.id
            }
        }));

        this.isEditModus = false;
      }

    render() {
        return html`
            <li>
                ${this.isEditModus ? html`
                <lion-form @submit=${this.editTitleTodo}>
                    <form @submit=${ev => ev.preventDefault()}>
                        <lion-input name="todo" label="Edit todo" .modelValue=${this.todo.title} @input=${this.editTitleTodo} autocomplete="off"></lion-input>
                        <button>Add todo</button>
                    </form>
                </lion-form>
                ` : 
                html`
                    <input type="checkbox" id=${this.todo.id} .checked=${this.todo.isCompleted} @change=${this.toggleCompleteTodoItem} title="Complete item">
                    <label for=${this.todo.id} title="Complete item">${this.todo.title}</label>
                `}

                
                
                <button
                    @click=${() => this.editTodoItem(this.todo.id)}
                    title="Edit ${this.todo.title}"
                    aria-label="Edit ${this.todo.title}"
                    class="todo-delete"
                >
                    <lion-icon icon-id="ing-app:icons:cross"></lion-icon>
                </button>
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
