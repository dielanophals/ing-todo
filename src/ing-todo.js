import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import './components/todo-form/todo-form.js'
import './components/todo-item/todo-item.js'
import { ingTodoStyles } from './ing-todo.styles.js';
import { icons } from '@lion/ui/icon.js';
import { resolveLionIcon } from './icon-manager.js';

icons.addIconResolver('ing-app', resolveLionIcon);

class IngTodo extends LitElement {
  static properties = {
    todos: { type: Array },
  }

  static styles = [ingTodoStyles];

  constructor() {
    super();
    // Get localStorage todos, if empty set to empty array
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
  }

  // Add new todo from todo-form
  addTodo = e => {
    this.todos = [...this.todos, {
      id: crypto.randomUUID(),
      title: e.detail,
      isCompleted: false
    }];
  }

  // Remove todo from todo-item
  removeTodoItem = e => {
    this.todos = this.todos.filter(todo => todo.id !== e.detail);
  }

  // Toggle todo item from todo-item
  toggleCompleteTodoItem = e => {
    // Loop over todo items
    this.todos = this.todos.map(todo => {
      if(todo.id === e.detail.todoId) {
        // Set isCompleted to the right todo item
        return {...todo, isCompleted: e.detail.checkboxValue}
      }

      return todo;
    });
  }

  editTodoItem = e => {
    this.todos = this.todos.map(todo => {
      if(todo.id === e.detail.todoId) {
        // Set isCompleted to the right todo item
        return {...todo, title: e.detail.title}
      }

      return todo;
    });
  }

  updated(changedProps) {
    if (changedProps.has('todos')) {
      // Set todos property as localStorage item after it's changed
      localStorage.setItem("todos", JSON.stringify(this.todos));
    }
  }

  render() {
    return html`
      <main>
        <h1 class="todo-header">To do list</h1>
        <todo-form @submit-todo=${this.addTodo}></todo-form>
        <section class="todo-items">
          ${!this.todos.length ? html`<p aria-live="polite">No todos added yet</p>` : ''}
          <ul>
            ${repeat(
              this.todos,
              todo => todo.id, // de unieke key
              todo => html`
              <todo-item
                .todo=${todo}
                @remove-todo-item=${this.removeTodoItem}
                @toggle-complete-todo-item=${this.toggleCompleteTodoItem}
                @edit-todo-item=${this.editTodoItem}
              ></todo-item>
              `)}
          </ul>
        </section>
      </main>
    `;
  }
}

customElements.define('ing-todo', IngTodo);