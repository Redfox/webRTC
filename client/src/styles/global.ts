import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  #root {
    height: 100vh;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-family: 'Roboto', sans-serif;
  }

  body {
    background: #17161e;
    color: white;
  }

  button {
    cursor: pointer;
  }
`;
