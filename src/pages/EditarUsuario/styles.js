import { styled } from "styled-components";

export const Container = styled.div`
  .search-client-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .update-form-wrapper {
    border: 2px dashed var(--gray-2);
    border-radius: 4px;
    padding: 16px 24px;
    background: var(--white);
    width: 100%;
    max-width: 420px;
    margin: 36px auto 0 auto;

    button {
      width: 100%;
      margin-top: 16px;
    }
  }
`;
