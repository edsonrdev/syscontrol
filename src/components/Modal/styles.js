import { styled } from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  height: 100%;
  min-height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(25, 25, 25, 0.7);
`;

export const Content = styled.div`
  /* min-width: 320px; */

  min-width: ${({ width }) =>
    width === "md" ? "420px" : width === "lg" ? "520px" : "320px"};

  background: var(--white);

  box-shadow: 0 4px 6px 1px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  border-radius: 4px;

  .modal-title {
    position: relative;

    min-height: 50px;
    padding: 0 16px;

    background: var(--brand-3);

    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      color: var(--white);
      font-weight: 500;
      font-size: 17px;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      letter-spacing: 0.5px;
    }

    span {
      position: absolute;
      right: 10px;
      top: 7px;

      svg {
        vertical-align: middle;
        color: var(--white);
        cursor: pointer;
      }
    }
  }

  .modal-body {
    padding: 12px 16px;

    .form-group button {
      margin-top: 10px;
    }
  }
`;
