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
import ItunesContainer from '../ItuensContainer';

export function App() {
  return (
    <>
      <ItunesContainer />
    </>
  );
}

export default compose(withRouter)(App);
