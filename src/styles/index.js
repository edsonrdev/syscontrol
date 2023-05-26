import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    /* css reset application */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        --brand-1: #77ffc2;
        --brand-2: #1cf2a7;
        --brand-3: #00d583;
        --brand-4: #00b26e;

        --white: #ffffff;
        --black-1: #515151;
        --black-2: #282828;
        --transparent: transparent;

        --gray-1: #f4f4f4;
        --gray-2: #d3d3d3;
        --gray-3: #aeaeae;
        --gray-4: #808080;

        --red-1: #ffbed0;
        --red-2: #ff94b1;
        --red-3: #ff6a92;
        --red-4: #ff396e;

        --blue-1: #beddff;
        --blue-2: #87c1ff;
        --blue-3: #47a0ff;
        --blue-4: #0377f4;

        --yellow-1: #eaff62;
        --yellow-2: #dbf43a;
        --yellow-3: #cfe925;
        --yellow-4: #bedc00;


        
    }

    html {
        ::-webkit-scrollbar {
            width: 16px;
        }

        ::-webkit-scrollbar-track {
            background-color: var(--gray-1);
        }

        ::-webkit-scrollbar-thumb {
            border-radius: 16px;
            background-color: var(--brand-2);
            border: 4px solid transparent;
            background-clip: content-box;
        }
    }

    body {
        min-height: 100vh;

        background: var(--gray-1);
        
        color: var(--black-1);
        font-size: 15px;
        font-family: "Poppins", sans-serif;
    }

    /* utils */
    .container {
        width: 100%;
        max-width: 1200px;
        padding: 16px;
        margin: 0 auto;
    }

    .page-title {
        padding-left: 14px;
        border-left: 7px solid var(--brand-3);

        font-size: 24px;
        font-weight: 300;
        color: var(--gray-4);
        line-height: 1.6;
        /* margin-bottom: 20px; */
    }

    .row {
        display: flex;
        gap: 12px;

        > .form-group {
            flex-basis: calc((100% - 12px) / 2);
        }
    }

    .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 9px;

        label {
            font-weight: 500;
        }

        input {
            display: inline-block;
            min-width: 120px;
            padding: 12px;
            border: 0;
            border: 1px solid var(--gray-2);
            border-radius: 4px;

            text-decoration: none;
            background: var(--gray-1);

            font-size: 14px;

            &::placeholder {
                /* Chrome, Firefox, Opera, Safari 10.1+ */
                color: var(--gray-3);
                opacity: 1;
            }

            &:-ms-input-placeholder {
                /* Internet Explorer 10-11 */
                color: var(--gray-3);
            }

            &::-ms-input-placeholder {
                /* Microsoft Edge */
                color: var(--gray-3);
            }
        }

        span.error {
            color: var(--red-4);
            font-size: 13px;
            font-weight: 500;
            letter-spacing: 0.4px;

            margin-top: 4px;
        }
    }

    hr {
        border: 0;
        border-top: 1px solid var(--gray-2);
        margin-bottom: 22px;
    }

    a:link {
        text-decoration: none;
    }

    ul, ol {
        list-style: none;
    }

    input, button, select, textarea {
        font-family: "Poppins", sans-serif;
    }

    input {
        outline-color: var(--brand-3);
        &:disabled {
            cursor: not-allowed;
            background: var(--gray-2);
        }
    }
`;
