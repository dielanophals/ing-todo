import { LitElement, html, css } from 'lit';
import '@lion/ui/define/lion-form.js';
import '@lion/ui/define/lion-input.js';

export class TodoForm extends LitElement {
    static properties = {
        todo: { type: String },
    }

    static styles = [
        css`
            form {
                background-color: #f0f0f0;
                margin-top: 10px;
                border-radius: 4px;
                display: inline-flex;
            }

            input[type=text], button{
                border-radius: 4px;
                border: none;
                padding: 12px 16px;
                background-color: var(--bg-color);
                font-size: 16px;
                color: var(--font-color);
            }
        
            button {
                color: var(--font-color);
                cursor: pointer;
                margin-left: 10px;
            }

            button:active{
                background-color: #696969;
                color: white;
            }
        `
    ];

    changeTodo = e => {
        this.todo = e.target.value
    }

    submitHandler = e => {
        e.preventDefault();
        if(this.todo.trim()){
            this.dispatchEvent(new CustomEvent('submit-todo', {
                detail: this.todo
            }));
            this.todo = '';
        }
    };

    constructor() {
        super();
        this.todo = '';
    }

    render() {
        return html`
            <lion-form @submit=${this.submitHandler}>
                <form @submit=${ev => ev.preventDefault()}>
                    <lion-input name="todo" label="" .modelValue=${this.todo} @input=${this.changeTodo} autocomplete="off"></lion-input>
                    <button>Add todo</button>
                </form>
            </lion-form>
        `;
    }
}
customElements.define('todo-form', TodoForm);
