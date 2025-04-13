import { css } from 'lit';

export const ingTodoStyles = css`
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
