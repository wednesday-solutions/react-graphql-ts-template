/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React, { useState, useCallback, useEffect } from 'react';
import GlobalStyle from '@app/global-styles';
import { routeConfig } from '@app/routeConfig';
import { Layout, Drawer, DrawerProps } from 'antd';
import map from 'lodash-es/map';
import { withRouter } from 'react-router';
import { Link, Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import styled, { ThemeProvider } from 'styled-components';
import For from '@components/For';
import Header from '@components/Header';
import { colors } from '@themes/index';
import icon from '@images/ion_rocket-sharp.svg';
import { CloseOutlined } from '@ant-design/icons';

const theme = {
  fg: colors.primary,
  bg: colors.secondaryText
};

const SidebarDrawer = styled(Drawer)`
  && {
    .ant-drawer-body {
      padding: 7rem 0 0 0;
      background-color: ${colors.primary};
      width: 6%;
      min-width: 4.5rem;
      max-width: 7rem;
      text-align: center;
    }
    .ant-drawer-close {
      top: 1rem;
    }
  }
`;

const SideBar = styled.div`
  && {
    width: 6%;
    min-width: 4.5rem;
    max-width: 7rem;
    min-height: calc(100vh - 7rem);
    height: auto;
    background-color: ${colors.primary};
    display: inline;
    text-align: center;
  }
`;

const RocketLogo = styled.img`
  && {
    margin-top: 1rem;
    object-fit: contain;
  }
`;

const CustomLayout = styled(Layout)`
  && {
    flex-direction: row;
  }
`;

export function App() {
  const [visible, setVisible] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth < 400);

  function detectMobile() {
    if (window.innerWidth < 400) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', detectMobile);
    return () => {
      window.removeEventListener('resize', detectMobile);
    };
  }, []);

  const toggleSidebar = useCallback(() => setVisible((v) => !v), []);

  const sidebarProps: DrawerProps = mobile
    ? {
        closeIcon: <CloseOutlined style={{ color: colors.secondary, fontSize: '1.9rem' }} />,
        placement: 'left',
        visible,
        closable: true,
        onClose: toggleSidebar,
        width: 'max-content'
      }
    : {};

  const SidebarComponent = (props: DrawerProps) =>
    mobile ? <SidebarDrawer {...props} /> : <SideBar data-testid="sidebar" {...(props as any)} />;

  return (
    <ThemeProvider theme={theme}>
      <Header mobile={mobile} toggleSidebar={toggleSidebar} />
      <CustomLayout>
        <SidebarComponent {...sidebarProps}>
          <Link data-testid="rocket-home-link" aria-label="home link" to="/">
            <RocketLogo src={icon} alt="rocket-icon" />
          </Link>
        </SidebarComponent>
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
