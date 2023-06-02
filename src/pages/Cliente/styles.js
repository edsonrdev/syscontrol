import { styled } from "styled-components";

export const Container = styled.div`
  .search-client-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .search-form {
      display: flex;
      /* background: red; */
      height: 45px;

      input {
        width: 280px;
        padding: 0 10px;

        border-radius: 4px 0 0 4px;
        border: 2px solid var(--gray-2);
        border-right: 0;
      }

      button {
        width: 60px;
        border-radius: 0 4px 4px 0;
        background: var(--brand-2);

        color: var(--white);

        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: 2px solid var(--brand-4);
        /* border-left: 0; */

        &:hover {
          background: var(--brand-4);
        }

        svg {
          /* background: red; */
        }
      }
    }
  }

  table.cliente-loan {
    width: 100%;
    border-spacing: 0;
    /* border: 1px solid var(--gray-2); */
    border-top: 0;

    thead {
      background: var(--brand-3);
      th {
        font-weight: 600;
        letter-spacing: 0.5px;
        color: var(--white);
        text-align: left;
        padding: 14px 10px;
        text-shadow: 1px 1.5px 1px rgba(0, 0, 0, 0.15);
        border-top: 1px solid var(--brand-4);
        border-bottom: 1px solid var(--brand-4);
        border-right: 1px solid var(--brand-4);

        &:first-of-type {
          border-left: 1px solid var(--brand-4);
        }
        &:first-of-type {
          border-left: 1px solid var(--brand-4);
        }
      }
    }

    tbody {
      tr {
        &.expired {
          background: var(--red-0);
        }

        td {
          padding: 10px;
          font-size: 13px;
          border-bottom: 1px solid var(--gray-2);
          border-right: 1px solid var(--gray-2);

          &:first-of-type {
            border-left: 1px solid var(--gray-2);
          }

          &:last-child {
            display: flex;
            gap: 8px;
            align-items: center;
          }

          &:not(.options) span {
            font-size: 13.5px;
            font-weight: 600;
            &.open {
              color: var(--gray-4);
            }
            &.fullPaid {
              color: var(--brand-3);
            }
            &.partialPaid {
              color: var(--blue-3);
            }
            &.expired {
              color: var(--red-3);
            }
          }

          &.options {
            /* span {
              font-weight: 600;
              display: flex;
              align-items: center;
              gap: 5px;
            } */
          }
        }
      }

      button {
        font-weight: 500;
        color: var(--white);
        padding: 4px;
        min-width: 86px;
        border-radius: 4px;
        border: 1.5px solid;
        cursor: pointer;
        transition: background 0.2s ease-in-out;

        &.input {
          background: var(--brand-3);
          border-color: var(--brand-4);

          &:hover {
            background: var(--brand-4);
          }
        }

        &.output {
          background: var(--red-3);
          border-color: var(--red-4);

          &:hover {
            background: var(--red-4);
          }
        }
      }
    }
  }

  div.valores-emprestimo {
    margin-bottom: 12px;

    display: flex;
    flex-direction: column;
    gap: 2px;

    input {
      font-size: 13px;
      height: 32px;
      padding: 0 12px;
      color: var(--black-1);
    }

    > .form-group {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      /* background: red; */
      margin-bottom: 0;

      .loan-values {
        text-align: right;
      }

      p {
        font-weight: 600;
        font-size: 13px;

        span {
          font-weight: 400;
          font-size: 13px;
        }
      }

      button {
        align-content: flex-end;
      }
    }

    /* button {
      width: 120px;
      align-self: flex-end;
    } */
  }

  table.resumo-emprestimo {
    /* margin: 15px 0 10px 0; */
    margin-top: -10px;
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;

    /* display: none; */
    /* max-width: 100%; */
    border-spacing: 0;

    border: 1px solid var(--gray-2);

    thead {
      background: var(--brand-3);

      th {
        padding: 0 10px;
        height: 50px;
        color: var(--white);
        font-size: 16px;
        font-weight: 500;
        text-align: left;

        /* border: 1px solid; */

        &:first-of-type {
          width: 90px;
        }
      }
    }

    tbody {
      display: flex;
      flex-direction: column;
      max-height: 180px;
      overflow-y: auto;
      /* scrollbar-gutter: stable; */
      font-size: 13px;

      /* background: red; */

      tr {
        /* width: 100%; */
        display: flex;
        /* border: 1px solid; */
        td {
          padding: 6px 10px;
          font-family: "Open Sans", sans-serif;
          /* border: 1px solid; */

          &:first-of-type {
            width: 90px;
          }

          &:not(:first-of-type) {
            flex: 1;
          }
        }

        &:not(:last-of-type) {
          td {
            border-bottom: 1px solid var(--gray-2);
          }
        }
      }
    }
  }

  .rodape {
    display: flex;
    justify-content: flex-end;
  }

  .toggle {
    position: absolute;
    margin-left: -9999px;
    visibility: hidden;
  }

  .toggle + label {
    display: block;
    position: relative;
    cursor: pointer;
    outline: none;
    user-select: none;
  }

  .toggle-shadow + label {
    padding: 2px;
    width: 388px; // 388 / 2 = 194
    height: 47px;
    /* background-color: #dddddd; */
    border-radius: 4px;
  }

  .toggle-shadow + label:before,
  .toggle-shadow + label:after {
    display: block;
    position: absolute;
    top: 1px;
    left: 1px;
    bottom: 1px;
    content: "";
  }
  .toggle-shadow + label:after {
    content: "Parcela";
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .toggle-shadow + label:before {
    right: 1px;
    background-color: var(--brand-4);
    border-radius: 4px;
    transition: all 0.4s;
  }
  .toggle-shadow + label:after {
    color: var(--white);
    text-shadow: 0 2px rgba(0, 0, 0, 0.15);
    letter-spacing: 0.4px;
    width: 194px;
    background-color: var(--brand-3);
    border-radius: 4px;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
    transition: all 0.4s;
  }

  .toggle-shadow:checked + label:before {
    background-color: var(--brand-4);
  }
  .toggle-shadow:checked + label:after {
    transform: translateX(100%);
    content: "Outro valor";
  }

  .btn-to-pay {
    margin-top: 8px;
  }
`;
