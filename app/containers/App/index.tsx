/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React from 'react';
import GlobalStyle from '@app/global-styles';
import { routeConfig } from '@app/routeConfig';
import { Layout } from 'antd';
import map from 'lodash-es/map';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import styled, { ThemeProvider } from 'styled-components';
import For from '@components/For';
import Header from '@components/Header';
import { colors } from '@themes/index';
import Sidebar from '@app/components/Siderbar';

const theme = {
  fg: colors.primary,
  bg: colors.secondaryText
};

const CustomLayout = styled(Layout)`
  && {
    flex-direction: row;
  }
`;

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <CustomLayout>
        <Sidebar />
        <Layout.Content>
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
          <GlobalStyle />
        </Layout.Content>
      </CustomLayout>
    </ThemeProvider>
  );
}

export default compose(withRouter)(App);
