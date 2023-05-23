import { styled, keyframes } from "styled-components";

const showDropdown = keyframes`
  0% {
    opacity: 0;

    height: 0;
    padding: 0;
    border: 1px solid transparent;
    display: none;
  }
  100% {
    opacity: 1;

    height: 118.75px;
    padding: 7px 0;
    border: 1px solid var(--gray-2);
    display: block;
  }
`;

const showBeforeDropdown = keyframes`
  0% {
    border-color: transparent;
  }
  100% {
    border-color: transparent transparent var(--gray-2) transparent;
  }
`;

const showListItemDropdown = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    display: none;

    padding: 4px 14px;
          
          width: 100%;
          line-height: 1.75;
          
          font-weight: 500;
          letter-spacing: 0.3px;
          display: block;
  }
`;

export const Container = styled.div`
  position: relative;

  .user-info {
    display: flex;
    align-items: center;
    gap: 16px;

    h3.username {
      font-size: 16px;
      font-weight: 500;
      color: var(--gray-3);
    }

    .avatar {
      border-radius: 50%;
      border: 2.5px solid var(--white);
      box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.15);
      cursor: pointer;
      transition: transform 1s ease;

      img {
        border-radius: 50%;
        height: 36px;
        vertical-align: middle;
      }
    }

    svg {
      cursor: pointer;
      color: var(--gray-3);
    }

    input[type="checkbox"] {
      display: none;
    }

    input[type="checkbox"]:checked + ul.dropdown-menu {
      animation: ${showDropdown} 0.2s ease-in-out forwards;
    }

    input[type="checkbox"]:checked + ul.dropdown-menu::before {
      animation: ${showBeforeDropdown} 0.2s ease-in-out forwards;
    }

    input[type="checkbox"]:checked + ul.dropdown-menu li {
      animation: ${showListItemDropdown} 0.2s ease-in-out forwards;
    }

    input[type="checkbox"] + ul.dropdown-menu {
      position: absolute;
      top: 128%;
      right: 0;

      width: 160px;
      z-index: 1000;

      opacity: 0;

      height: 0;
      padding: 0;
      border: 1px solid transparent;
      /* display: none; */

      border-radius: 6px;
      box-shadow: 0 4px 12px 2px rgba(0, 0, 0, 0.1);

      background: var(--white);

      &::before {
        content: "";

        border: 10px solid var(--gray-2);
        border-color: transparent;

        position: absolute;
        right: 41.65px;
        top: -20px;
      }

      li {
        &:hover {
          background: var(--gray-1);
        }

        a {
          display: none;
          color: var(--brand-4);
        }
      }
    }
  }
`;
