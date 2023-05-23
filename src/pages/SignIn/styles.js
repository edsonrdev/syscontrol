import { styled } from "styled-components";

export const Container = styled.div`
  min-height: 100vh;

  main {
    .container {
      position: relative;
      margin-top: 80px;
      display: flex;
      justify-content: center;
      /* align-items: flex-end; */
      gap: 80px;
      /* background: red; */

      .back-to-home {
        position: absolute;
        top: -50px;
        left: 16px;
        /* display: none; */
      }

      .signin-title {
        flex-basis: 350px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
        /* border: 1px solid black; */

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

        form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: var(--white);
          padding: 20px;
          border-radius: 4px;
          box-shadow: 0 3px 12px 2px rgba(100, 100, 100, 0.1);

          .form-group {
            display: flex;
            flex-direction: column;
            /* background: gray; */

            label {
              /* font-size: 14.5px; */
              font-weight: 500;
            }

            span.error {
              /* padding-top: 2px; */
              /* text-align: right; */
              height: 12px;
              font-weight: 400;
              /* letter-spacing: 0.4px; */
              font-size: 13px;
              color: var(--red-2);
            }
          }

          p {
            margin-top: 6px;
            font-size: 13px;
            text-align: center;

            a {
              font-weight: 500;
              letter-spacing: 0.5px;
              color: var(--brand-4);
            }
          }

          button {
            margin-top: 6px;
          }
        }
      }

      .hero-image {
        flex: 1;

        display: flex;
        justify-content: center;
        /* border: 1px solid black; */

        @media (max-width: 940px) {
          display: none;
        }

        align-self: center;

        img {
          max-width: 100%;
          /* border: 1px solid black; */
        }
      }
    }
  }
`;
