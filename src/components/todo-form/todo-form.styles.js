import { css } from 'lit';

export const todoFormStyles = css`
    form {
        background-color: #f0f0f0;
        margin-top: 10px;
        border-radius: 4px;
        display: inline-flex;
    }

    label {
        position: absolute;
        left: -9999px;
    }

    input[type=text], button{
        border-radius: 4px;
        border: none;
        padding: 12px 16px;
        background-color: var(--bg-color);
        font-size: 16px;
        color: var(--font-color);
    }

    button {
        color: var(--font-color);
        cursor: pointer;
        margin-left: 10px;
    }

    button:active{
        background-color: #696969;
        color: white;
    }
`;
