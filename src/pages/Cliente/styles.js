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

    button {
      width: 120px;
      align-self: flex-end;
    }
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
`;
