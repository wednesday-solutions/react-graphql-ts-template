/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React from 'react';
import globalStyle from '@app/global-styles';
import { routeConfig } from '@app/routeConfig';
import { Global } from '@emotion/react';
import map from 'lodash-es/map';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline, Grid } from '@mui/material';
import For from '@components/For';
import Header from '@components/Header';
import { colors } from '@themes/index';
import Sidebar from '@app/components/Siderbar';
import { SCREEN_BREAK_POINTS, HEADER_HEIGHT, MIN_SIDEBAR_WIDTH } from '@app/utils/constants';

declare module '@mui/material/styles' {
  export interface Theme {
    baseLayout: {
      headerHeight: string;
      sidebarWidth: string;
    };
  }
  // allow configuration using `createTheme`
  export interface ThemeOptions {
    baseLayout?: {
      headerHeight: string;
      sidebarWidth: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary
    },
    secondary: {
      main: colors.secondary
    }
  },
  baseLayout: {
    headerHeight: HEADER_HEIGHT,
    sidebarWidth: MIN_SIDEBAR_WIDTH
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: SCREEN_BREAK_POINTS.mobile,
      md: SCREEN_BREAK_POINTS.tablet,
      lg: SCREEN_BREAK_POINTS.desktop,
      xl: SCREEN_BREAK_POINTS.largeDesktop
    }
  }
});

export function App() {
  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <Global styles={globalStyle} />
        <Grid container>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={0.5}>
            <Sidebar />
          </Grid>
          <Grid item xs={11.5}>
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
          </Grid>
        </Grid>
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}

export default compose(withRouter)(App);
