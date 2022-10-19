/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React from 'react';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import ItunesContainer from '../ItunesContainer';
import { ThemeProvider } from 'styled-components';
import { colors } from '@app/themes';
import { HEADER_HEIGHT, MIN_SIDEBAR_WIDTH } from '@app/utils/constants';
const theme = {
  fg: colors.primary,
  bg: colors.secondaryText,
  headerHeight: HEADER_HEIGHT,
  sidebarWidth: MIN_SIDEBAR_WIDTH
};

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <ItunesContainer />
    </ThemeProvider>
  );
}

export default compose(withRouter)(App);
