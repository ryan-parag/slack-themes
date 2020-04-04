import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --root-color: var(--neutral-8);
    --root-bg: var(--neutral-0);
    --text-color: var(--neutral-3);
    --disabled-color: var(--neutral-2);
    --subtle-color: rgba(0,0,0,0.05);
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  html, body {
    width: 100%;
    height: 100%;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 1.8rem;
    color: ${({ theme }) => theme.rootColor};
    background: ${({ theme }) => theme.rootBg};
    transition: all 120ms ease-out 0s;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeSpeed;
    margin: 0;
    padding: 0;
  }

  h1,h2,h3 {
    font-weight: 900;
    line-height: 1.2;
  }

  h4,h5,h6 {
    font-weight: 700;
    line-height: 1.3;
  }

  p {
    line-height: 1.6;
    margin-top: 0.8rem;
    margin-bottom: 1.6rem;
    color: ${({ theme }) => theme.textColor};
  }

  ul, ol {
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => theme.subtle};
    padding: 1.6rem 1.6rem 1.6rem 4.8rem;
    border-radius: 0.4rem;
    li {
      line-height: 1.6;
      margin: 0 0 0.8rem 0;
    }
  }

  a {
    color: inherit;
    transition: all 120ms ease-out 0s;
    &:hover {
      background: ${({ theme }) => theme.disabledColor};
      box-shadow: 0px 0px 0px 3px ${({ theme }) => theme.disabledColor};
    }
  }

  input, button, select, textarea {
    font-family: inherit;
    color: inherit;
    &:focus, &:active {
      outline: 0;
    }
  }
`;

export default GlobalStyle