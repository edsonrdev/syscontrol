import { styled } from "styled-components";

export const Container = styled.div`
  min-height: 100vh;

  main {
    .container {
      min-height: 600px;
      display: flex;
      justify-content: center;
      gap: 80px;

      .home-title {
        flex-basis: 350px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;

        h2 {
          letter-spacing: 0.5px;
          font-size: 25px;

          @media (max-width: 940px) {
            text-align: center;
          }

          span {
            font-size: 27px;
            font-weight: 700;
            letter-spacing: 1.4px;
          }
        }

        span {
          font-size: 20px;
          font-weight: 500;
        }
      }

      .hero-image {
        flex: 1;

        @media (max-width: 940px) {
          display: none;
        }

        align-self: center;

        img {
          max-width: 100%;
        }
      }
    }
  }
`;
