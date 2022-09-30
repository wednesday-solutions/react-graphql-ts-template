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
    <ItunesContainer />
    // <ThemeProvider theme={theme}>
    //   <Header />
    //   <CustomLayout>
    //     <Sidebar />
    //     <Layout.Content>
    //       <For
    //         ParentComponent={(props) => <Switch {...props} />}
    //         of={map(Object.keys(routeConfig))}
    //         renderItem={(routeKey, index) => {
    //           const Component = routeConfig[routeKey].component;
    //           return (
    //             <Route
    //               exact={routeConfig[routeKey].exact}
    //               key={index}
    //               path={routeConfig[routeKey].route}
    //               render={(props) => {
    //                 const updatedProps = {
    //                   ...props,
    //                   ...routeConfig[routeKey].props
    //                 };
    //                 return <Component {...updatedProps} />;
    //               }}
    //             />
    //           );
    //         }}
    //       />
    //       <GlobalStyle />
    //     </Layout.Content>
    //   </CustomLayout>
    // </ThemeProvider>
  );
}

export default compose(withRouter)(App);
