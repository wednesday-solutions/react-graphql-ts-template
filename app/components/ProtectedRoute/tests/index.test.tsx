import React from 'react';
import { renderProvider } from '@utils/testUtils';
import ProtectedRoute from '../index';
import * as protectedRouteFile from '../index';
import '@testing-library/jest-dom';

const RENDER_TEXT = 'Hello World';

const HomeContainer = () => <h1>{RENDER_TEXT}</h1>;

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
    expect(getByText(RENDER_TEXT)).toBeInTheDocument();
  });
  it('should not render component if user is not logged in with handleLogout', () => {
    const logoutSpy = jest.fn();
    renderProvider(
      <ProtectedRoute isLoggedIn={false} render={HomeContainer} exact={true} path="/" handleLogout={logoutSpy} />
    );
    expect(logoutSpy).toHaveBeenCalled();
  });

  it('should not render component if user is not logged in without handleLogout', () => {
    const { queryByText } = renderProvider(
      <ProtectedRoute isLoggedIn={false} render={HomeContainer} exact={true} path="/" />
    );
    expect(queryByText(RENDER_TEXT)).toBeNull();
  });

  it('should render component , not logged in, unprotected route', () => {
    const { queryByText } = renderProvider(
      <ProtectedRoute isLoggedIn={false} render={HomeContainer} exact={true} path="/login" />
    );
    expect(queryByText(RENDER_TEXT)).toBeInTheDocument();
  });

  it('should redirect to the dashboard if logged in and accessing login page(unprotected)', () => {
    const { queryByText } = renderProvider(
      <ProtectedRoute isLoggedIn={true} render={HomeContainer} exact={true} path="/login" />
    );
    expect(queryByText(RENDER_TEXT)).toBeNull();
  });
  it('should call the default logout function', () => {
    const spy = jest.spyOn(protectedRouteFile.default.propTypes, 'handleLogout');
    renderProvider(<ProtectedRoute isLoggedIn={false} render={HomeContainer} exact={true} path="/" />);
    expect(spy).toHaveBeenCalled();
  });
});
