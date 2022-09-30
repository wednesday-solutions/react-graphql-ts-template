/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import styled from 'styled-components';
import ItunesApiComponent from '../ItuensContainer';

const CustomLayout = styled(Layout)`
  && {
    flex-direction: row;
  }
`;

export function App() {
  return (
    <CustomLayout>
      <ItunesApiComponent />
    </CustomLayout>
  );
}

export default compose(withRouter)(App);
