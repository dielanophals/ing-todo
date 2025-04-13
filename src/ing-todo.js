import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import './components/todo-form/todo-form.js'
import './components/todo-item/todo-item.js'
import { ingTodoStyles } from './ing-todo.styles.js';

class IngTodo extends LitElement {
  static properties = {
    todos: { type: Array },
  }

  static styles = [ingTodoStyles];

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