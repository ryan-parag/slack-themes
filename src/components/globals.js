import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://rsms.me/inter/inter.css');

  :root {
    --neutral-10: #000000;
    --neutral-9: #050506;
    --neutral-8: #101114;
    --neutral-7: #191B1E;
    --neutral-6: #22252A;
    --neutral-5: #292C32;
    --neutral-4: #484B50;
    --neutral-3: #727579;
    --neutral-2: #A1A3A7;
    --neutral-1: #E3E3E4;
    --neutral-0: #FFFFFF;
    
    --primary: #99C221;
    
    --root-color: var(--neutral-8);
    --root-bg: var(--neutral-0);
    --text-color: var(--neutral-3);
    --disabled-color: var(--neutral-2);
    --subtle-color: rgba(0,0,0,0.05);
    
    --bg: var(--neutral-6);
    --header-bg: var(--neutral-9);
    --color: var(--neutral-2);
    --active-color: var(--neutral-3);
    --active-text: #000000;
    --active-highlight: var(--neutral-3);
    --mention: var(--neutral-0);
    --header-hover: #000000;
    --item-hover: var(--neutral-9);
  }

  :root.theme--dark {
    --root-color: var(--neutral-0);
    --root-bg: var(--neutral-7);
    --text-color: var(--neutral-2);
    --disabled-color: var(--neutral-3);
    --subtle-color: var(--neutral-8);
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
    color: var(--root-color);
    background: var(--root-bg);
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
    color: var(--text-color);
  }

  ul, ol {
    color: var(--text-color);
    background: var(--subtle-color);
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
      background: rgba(0,0,0,0.1);
      box-shadow: 0px 0px 0px 3px rgba(0,0,0,.1);
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