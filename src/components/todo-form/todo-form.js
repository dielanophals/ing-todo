import { LitElement, html, css } from 'lit';
import '@lion/ui/define/lion-form.js';
import '@lion/ui/define/lion-input.js';
import { todoFormStyles } from './todo-form.styles.js';

export class TodoForm extends LitElement {
    static properties = {
        // Set todo property
        todo: { type: String }
    }

    static styles = [todoFormStyles];

    // Change value of todo
    changeTodo = e => {
        this.todo = e.target.value
    }

    // Send custom event when form is submitted
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
                    <lion-input name="todo" label="New todo" .modelValue=${this.todo} @input=${this.changeTodo} autocomplete="off"></lion-input>
                    <button>Add todo</button>
                </form>
            </lion-form>
        `;
    }
}
customElements.define('todo-form', TodoForm);
