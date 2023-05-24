import { styled } from "styled-components";

export const Container = styled.div`
  .search-client-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 20px;

    .search-form {
      display: flex;
      height: 45px;

      input {
        width: 280px;
        padding: 0 10px;

        border-radius: 4px;
        border: 2px solid var(--brand-3);
        outline: 0;
      }
    }
  }

  .client-list {
    margin-top: 16px;

    li {
      padding: 10px 19px;
      border: 1px solid var(--gray-2);

      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--white);
      font-size: 14px;
      transition: background 0.1s ease-in-out;

      &:not(:first-of-type) {
        border-top: 0;
      }

      &:hover {
        background: var(--gray-1);
      }

      &.client-header {
        padding: 14px 16px;
        border: 1px solid var(--brand-3);
        background: var(--brand-2);
        font-weight: 600;
        font-size: 18px;
        color: var(--white);
        text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.15);
        letter-spacing: 0.5px;
      }

      .options {
        display: flex;
        align-items: center;
        gap: 16px;

        color: var(--gray-2);

        svg {
          cursor: pointer;

          &.view-details {
            color: var(--brand-3);
            transition: color 0.3s ease;

            :hover {
              color: var(--brand-4);
            }
          }
          &.edit-client {
            color: var(--brand-3);
            transition: color 0.3s ease;

            :hover {
              color: var(--brand-4);
            }
          }
        }
      }
    }

    p {
      font-size: 18px;
      /* font-weight: 500; */
      margin-top: 32px;
      padding-bottom: 10px;
      color: var(--gray-4);
      border-bottom: 1px dashed var(--gray-3);

      span.cliente-pesquisado {
        color: var(--brand-3);
        font-weight: 600;
      }
    }
  }
`;
