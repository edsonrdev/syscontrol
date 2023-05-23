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

  .client-list {
    margin-top: 26px;

    li {
      padding: 12px;
      border: 1px solid var(--gray-2);
      display: flex;
      justify-content: space-between;

      &:first-of-type {
        border-top: 1px solid var(--gray-2);
      }

      .options {
        display: flex;
        align-items: center;
        gap: 16px;

        color: var(--gray-2);

        svg {
          cursor: pointer;

          &.view-details {
            color: var(--blue-3);
            transition: color 0.3s ease;

            :hover {
              color: var(--blue-4);
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
  }
`;
