import { styled } from "styled-components";

export const Container = styled.button`
  /* min-width: 100px; */
  cursor: pointer;
  box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.07);
  transition: background 0.2s ease-in-out, color 0.2s ease-in-out;

  min-width: 110px;
  padding: 0 14px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  height: ${({ size }) =>
    size === "sm"
      ? "32px"
      : size === "md"
      ? "40px"
      : size === "lg"
      ? "48px"
      : "40px"};

  background: ${({ variant }) =>
    variant === "primary"
      ? "var(--brand-3)"
      : variant === "secondary"
      ? "var(--brand-1)"
      : variant === "outline"
      ? "var(--transparent)"
      : "var(--gray-2)"};

  &:hover {
    background: ${({ variant }) =>
      variant === "primary"
        ? "var(--brand-4)"
        : variant === "secondary"
        ? "var(--brand-1)"
        : variant === "outline"
        ? "var(--brand-3)"
        : "var(--gray-2)"};

    border-color: ${({ variant }) =>
      variant === "primary"
        ? "var(--brand-4)"
        : variant === "secondary"
        ? "var(--brand-1)"
        : variant === "outline"
        ? "var(--brand-3)"
        : "var(--gray-2)"};

    color: ${({ variant }) =>
      variant === "primary"
        ? "var(--white)"
        : variant === "outline"
        ? "var(--white)"
        : "var(--black-1)"};
  }

  border: 2px solid transparent;
  border-radius: 3px;
  font-size: 15px;
  font-weight: 500;

  border-color: ${({ variant }) =>
    variant === "primary"
      ? "var(--brand-3)"
      : variant === "secondary"
      ? "var(--brand-1)"
      : variant === "outline"
      ? "var(--brand-3)"
      : "var(--gray-2)"};

  color: ${({ variant }) =>
    variant === "primary"
      ? "var(--white)"
      : variant === "outline"
      ? "var(--brand-4)"
      : "var(--black-1)"};

  letter-spacing: 0.5px;
  transition: background 0.2s, border-color 0.2s;
`;
