import { css } from '@emotion/react';
import { colors } from '@app/themes';

const globalStyle = css`
  html,
  body {
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: ${colors.secondaryText};
    min-height: 100%;
    min-width: 100%;
  }

  p,
  span,
  button,
  label {
    font-family: 'Rubik', sans-serif;
    line-height: 1.5em;
    margin-bottom: 0;
  }
`;

export default globalStyle;
