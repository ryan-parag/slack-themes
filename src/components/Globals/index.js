import { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle`
  @import url('https://rsms.me/inter/inter.css');
  
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
    background: ${({ theme }) => theme.rootBg};
    color: ${({ theme }) => theme.rootText};
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 1.8rem;
    margin: 0;
    padding: 0;
    transition: all 120ms ease-out 0s;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeSpeed;
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
    color: ${({ theme }) => theme.primary};
    transition: all 120ms ease-out 0s;
    &:hover {
      background: ${({ theme }) => theme.disabledColor};
      box-shadow: 0px 0px 0px 3px ${({ theme }) => theme.disabledColor};
    }
  }

  input, button, select, textarea {
    background: inherit;
    color: inherit;
    font-family: inherit;
    margin: 0;
    &:focus, &:active {
      outline: 0;
    }
  }

  button {
    border: 1px solid currentColor;
    background: ${({ theme }) => theme.rootBg};
    color: ${({ theme }) => theme.rootText};
    border-radius: 0.4rem;
    padding: 0.8rem 1.6rem;
    cursor: pointer;
    text-align: center;
    display: inline-block;
    font-size: 1.6rem;
    transition: all 120ms ease-out 0s;
    &:hover {
      background: ${({ theme }) => theme.hoverBg};
      color: inherit;
    }
  }
`;

export default GlobalStyle