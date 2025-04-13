import { LitElement, html, css } from 'lit';
import '@lion/ui/define/lion-form.js';
import '@lion/ui/define/lion-input.js';
import { todoFormStyles } from './todo-form.styles.js';

export class TodoForm extends LitElement {
    static properties = {
        todo: { type: String },
    }

    static styles = [todoFormStyles];


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
