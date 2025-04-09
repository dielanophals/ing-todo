import { LitElement, html, css } from 'lit';

const cross = new URL('../../assets/icons/cross.svg', import.meta.url).href;

export class TodoItem extends LitElement {
    static properties = {
        todo: { type: Object }
    }

    static styles = [
        css`
            li {
                list-style: none;
                width: 500px;
                max-width:100%;
                text-align: left;
                display: flex;
                align-items: center;
                border-radius: 8px;
                padding: 12px 15px;
                background-color: var(--bg-color);;
                margin: 10px 0;
                word-break: break-word;
                box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px, rgba(0, 0, 0, 0.2) 0px 1px 5px 0px;
            }

            input[type=checkbox] {
                width: 24px;
                height: 24px;
                accent-color: var(--ing-color);
                flex: 0 0 auto;
            }

            li label {
                font-size: 16px;
                flex: 1;
                margin: 0 15px;
            }

            input[type="checkbox"]:checked + label {
                color: var(--ing-color);
                font-weight: bold;
                text-decoration: line-through;
            }

            li img {
                width:20px;
                cursor: pointer;
            }
        `
    ];

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
                <input type="checkbox" id="todo-checkbox" .checked=${this.todo.isCompleted} @change=${this.toggleCompleteTodoItem}>
                <label for="todo-checkbox">${this.todo.title}</label>
                <img src=${cross} alt="Delete todo item" @click=${() => this.removeTodoItem(this.todo.id)}/>
            </li>
        `;
    }
}
customElements.define('todo-item', TodoItem);
