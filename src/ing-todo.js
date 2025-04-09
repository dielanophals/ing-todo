import { LitElement, html, css } from 'lit';
import './components/todo-form.js'
import './components/todo-item.js'

class IngTodo extends LitElement {
  static properties = {
    todos: { type: Array },
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
    }

    :host {
      --ing-color: #ff6200;
      --font-color: #333;
      --bg-color: #f0f0f0;;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: calc(10px + 2vmin);
      margin: 0 auto;
      text-align: center;
    }

    main {
      flex-grow: 1;
      max-width: 1024px;
    }

    .todo-items {
      margin-top: 20px;
    }

    .todo-items p {
      color: var(--font-color);
      font-size: 20px;
    }
  `;

  constructor() {
    super();
    this.todos = [];
  }

  addTodo = e => {
    this.todos = [...this.todos, {
      id: crypto.randomUUID(),
      title: e.detail,
      isCompleted: false
    }];
  }

  removeTodoItem = e => {
    this.todos = this.todos.filter(todo => todo.id !== e.detail);
  }

  toggleCompleteTodoItem = e => {
    this.todos = this.todos.map(todo => {
      if(todo.id == e.detail.todoId) {
        return {...todo, isCompleted: e.detail.checkboxValue}
      }

      return todo;
    });

    console.log(this.todos);
  }

  render() {
    return html`
      <main>
        <todo-form @submit-todo=${this.addTodo}></todo-form>
        <section class="todo-items">
          <p>${!this.todos.length && "No todos added yet" || ''}</p>
          <ul>
            ${this.todos.map(todo => html`
              <todo-item
                .todo=${todo}
                @remove-todo-item=${this.removeTodoItem}
                @toggle-complete-todo-item=${this.toggleCompleteTodoItem}
              ></todo-item>
            `)}
          </ul>
        </section>
      </main>
    `;
  }
}

customElements.define('ing-todo', IngTodo);