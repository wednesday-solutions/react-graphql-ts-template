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
import map from 'lodash-es/map';
import { ThemeProvider } from 'styled-components';
import { colors } from '@app/themes';
import { HEADER_HEIGHT, MIN_SIDEBAR_WIDTH } from '@app/utils/constants';
import { For } from '@app/components';
import { routeConfig } from '@app/routeConfig';
import { Route, Switch } from 'react-router-dom';
const theme = {
  fg: colors.primary,
  bg: colors.secondaryText,
  headerHeight: HEADER_HEIGHT,
  sidebarWidth: MIN_SIDEBAR_WIDTH
};

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <For
        ParentComponent={(props) => <Switch {...props} />}
        of={map(Object.keys(routeConfig))}
        renderItem={(routeKey, index) => {
          const Component = routeConfig[routeKey].component;
          return (
            <Route
              exact={routeConfig[routeKey].exact}
              key={index}
              path={routeConfig[routeKey].route}
              render={(props) => {
                const updatedProps = {
                  ...props,
                  ...routeConfig[routeKey].props
                };
                return <Component {...updatedProps} />;
              }}
            />
          );
        }}
      />
    </ThemeProvider>
  );
}

export default compose(withRouter)(App);
