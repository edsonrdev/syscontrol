import { styled } from "styled-components";

export const Container = styled.button`
  position: relative;
  /* flex: 1 1 calc((100% - 16px) / 2); */
  flex: 1;

  @media (max-width: 1060px) {
    flex: 1 1 calc((100% - 16px) / 2);
  }

  @media (max-width: 544px) {
    flex: 1 1 100%;
  }

  height: 135px;
  padding: 16px;

  border-radius: 5px;
  border: 2px solid;
  cursor: pointer;
  transition: background 0.2s ease;

  line-height: 1;
  color: var(--white);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  h2 {
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    position: absolute;
    top: 16px;
  }

  .icon {
    position: absolute;
    top: 9px;
    right: 16px;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${({ color }) =>
      color === "brand"
        ? "var(--brand-4)"
        : color === "red"
        ? "var(--red-4)"
        : color === "yellow"
        ? "var(--yellow-4)"
        : "var(--blue-4)"};

    background: var(--white);
  }

  .value {
    position: absolute;
    bottom: 16px;
    left: 16px;
    font-size: 24px;
    font-weight: 600;
  }

  background: ${({ color }) =>
    color === "brand"
      ? "var(--brand-3)"
      : color === "red"
      ? "var(--red-3)"
      : color === "yellow"
      ? "var(--yellow-3)"
      : "var(--blue-3)"};

  border-color: ${({ color }) =>
    color === "brand"
      ? "var(--brand-4)"
      : color === "red"
      ? "var(--red-4)"
      : color === "yellow"
      ? "var(--yellow-4)"
      : "var(--blue-4)"};

  &:hover {
    background: ${({ color }) =>
      color === "brand"
        ? "var(--brand-4)"
        : color === "red"
        ? "var(--red-4)"
        : color === "yellow"
        ? "var(--yellow-4)"
        : "var(--blue-4)"};
  }
`;
