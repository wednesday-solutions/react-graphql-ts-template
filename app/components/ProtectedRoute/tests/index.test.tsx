import React from 'react';
import { renderProvider } from '@utils/testUtils';
import ProtectedRoute from '../index';
import '@testing-library/jest-dom';
import { createBrowserHistory, History } from 'history';

const HomeContainer = () => <h1>Hello World</h1>;

jest.mock('@utils/routeConstants', () => {
  return {
    dashboard: {
      route: '/',
      isProtected: true
    },
    login: {
      route: '/login',
      isProtected: false
    }
  };
});

describe('<ProtectedRoute /> tests', () => {
  let history: History;

  beforeEach(() => {
    history = createBrowserHistory();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(
      <ProtectedRoute isLoggedIn={true} render={HomeContainer} exact={true} path="/" />
    );
    expect(baseElement).toMatchSnapshot();
  });
  it('should render the component if user logged in and access protected route', () => {
    const { getByText } = renderProvider(
      <ProtectedRoute isLoggedIn={true} render={HomeContainer} exact={true} path="/" />
    );
    expect(getByText('Hello World')).toBeInTheDocument();
  });
  it('should not render component if user is not logged in with handleLogout', () => {
    const logoutSpy = jest.fn();
    renderProvider(
      <ProtectedRoute isLoggedIn={false} render={HomeContainer} exact={true} path="/" handleLogout={logoutSpy} />,
      history
    );
    expect(logoutSpy).toHaveBeenCalled();
  });
  it('should render component , not logged in, unprotected route', () => {
    history.location.pathname = '/login';
    renderProvider(<ProtectedRoute isLoggedIn={false} render={HomeContainer} exact={true} path="/login" />, history);
    expect(history.location.pathname).toBe('/login');
  });
  it('should redirect to the dashboard if logged in and accessing login page(unprotected)', () => {
    history.location.pathname = '/login';
    renderProvider(<ProtectedRoute isLoggedIn={true} render={HomeContainer} exact={true} path="/login" />, history);
    expect(history.location.pathname).toBe('/');
  });
  it('should not render component if user is not logged in without handleLogout', () => {
    const { queryByText } = renderProvider(
      <ProtectedRoute isLoggedIn={false} render={HomeContainer} exact={true} path="/" />,
      history
    );
    expect(queryByText('Hello World')).not.toBeInTheDocument();
  });
});
