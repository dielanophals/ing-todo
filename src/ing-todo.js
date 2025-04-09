import { LitElement, html, css } from 'lit';

const logo = new URL('../assets/open-wc-logo.svg', import.meta.url).href;

class IngTodo extends LitElement {
  static properties = {}

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--ing-todo-background-color);
    }

    main {
      flex-grow: 1;
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <main>
        
      </main>
    `;
  }
}

customElements.define('ing-todo', IngTodo);