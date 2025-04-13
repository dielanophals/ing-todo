import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import './components/todo-form/todo-form.js'
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
      --bg-color: #f0f0f0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      margin: 0 auto;
      text-align: center;
    }

    main {
      flex-grow: 1;
      width: 600px;
      max-width:100%;
    }

    .todo-header {
      margin-top: 20px;
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
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
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
  }

  updated(changedProps) {
    if (changedProps.has('todos')) {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    }
  }

  render() {
    return html`
      <main>
        <h1 class="todo-header">To do list</h1>
        <todo-form @submit-todo=${this.addTodo}></todo-form>
        <section class="todo-items">
          ${!this.todos.length ? html`<p>No todos added yet</p>` : ''}
          <ul>
            ${repeat(
              this.todos,
              todo => todo.id, // de unieke key
              todo => html`
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