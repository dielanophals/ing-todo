import { css } from 'lit';

export const todoItemStyles = css`
    li {
        list-style: none;
        width:90%;
        box-sizing: border-box;
        text-align: left;
        display: flex;
        align-items: center;
        border-radius: 8px;
        padding: 12px 15px;
        background-color: var(--bg-color);
        margin: 10px 0;
        margin-left: 5%;
        word-break: break-word;
        box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px, rgba(0, 0, 0, 0.2) 0px 1px 5px 0px;
        transition: 0.2s;
    }

    li:hover {
        background:rgba(255, 98, 0, 0.3);
    }

    li label {
        font-size: 16px;
        flex: 1;
        margin: 0 15px;
        cursor: pointer;
    }

    input[type=checkbox] {
        width: 24px;
        height: 24px;
        accent-color: var(--ing-color);
        flex: 0 0 auto;
        cursor: pointer;
    }

    input[type="checkbox"]:checked + label {
        color: var(--ing-color);
        font-weight: bold;
        text-decoration: line-through;
        font-family: var(--ing-font-bold);
    }

    li lion-icon {
        width:20px;
        height: 20px;
    }

    .todo-delete {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
    }

    @media only screen and (min-width : 1025px) {
        li lion-icon {
            opacity: 0;
            transition: 0.2s;
        }

        .todo-delete:focus lion-icon {
            opacity: 1
        }

        li:hover lion-icon {
            opacity: 1;
        }
    }
`;
