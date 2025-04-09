import { LitElement, html, css } from 'lit';
import './components/todo-form.js'

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
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: calc(10px + 2vmin);
      max-width: 1024px;
      margin: 0 auto;
      text-align: center;
    }

    main {
      flex-grow: 1;
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

  render() {
    return html`
      <main>
        <todo-form @submit-todo=${this.addTodo}></todo-form>
      </main>
    `;
  }
}

customElements.define('ing-todo', IngTodo);