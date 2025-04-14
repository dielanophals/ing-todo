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
      --ing-font: "ING Me", sans-serif;
      --ing-font-bold: "ING Me Bold", sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      margin: 0 auto;
      text-align: center;
      font-family: var(--ing-font);
    }

    main {
      flex-grow: 1;
      width: 600px;
      max-width:100%;
    }

    .todo-header {
      margin-top: 20px;
      font-family: var(--ing-font-bold);
    }

    .todo-items {
      margin-top: 20px;
    }

    .todo-items p {
      color: var(--font-color);
      font-size: 20px;
    }
`;
