import { styled } from "styled-components";

export const Container = styled.header`
  width: 100vw;
  background: var(--white);
  border-bottom: 0.1px solid var(--gray-2);

  .container {
    height: 79px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      font-size: 24px;
      font-weight: 700;
      color: var(--black-1);
      font-family: "Open Sans", sans-serif;
      letter-spacing: 1px;
      cursor: pointer;

      span {
        color: var(--brand-3);
      }
    }

    .buttons {
      display: inline-flex;
      gap: 16px;
    }

    .links {
      display: inline-flex;
      gap: 28px;

      a {
        display: inline;
        font-size: 18px;
        font-weight: 600;
        color: var(--gray-3);

        &.active,
        &:hover {
          color: var(--brand-4);
        }
      }
    }
  }
`;
