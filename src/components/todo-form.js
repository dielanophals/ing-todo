import { LitElement, html, css } from 'lit';

export class TodoForm extends LitElement {
    static properties = {
        todo: { type: String },
    }

    static styles = [
        css`
            form {
                background-color: #f0f0f0;
                margin-top: 30px;
                border-radius: 4px;
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
        if(this.todo){
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
            <form @submit="${this.submitHandler}">
                <input type="text" name="todo" label="Todo" placeholder="Add todo..." .value=${this.todo} @input="${this.changeTodo}" autocomplete="off" />
                <button type="submit">Add todo</button>
            </form>
        `;
    }
}
customElements.define('todo-form', TodoForm);
