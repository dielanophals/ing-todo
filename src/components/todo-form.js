import { LitElement, html, css } from 'lit';

export class TodoForm extends LitElement {
    static properties = {
        todo: { type: String },
    }

    static styles = [
        css`
            :host {
                display: block;
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
                <input type="text" name="lastName" label="Todo" placeholder="Add todo..." .value=${this.todo} @input="${this.changeTodo}"></lion-input>
                <button>Add todo</button>
            </form>
        `;
    }
}
customElements.define('todo-form', TodoForm);
