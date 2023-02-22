import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import configureStore from '@app/configureStore';
import { DEFAULT_LOCALE, translationMessages } from '@app/i18n';
import ConnectedLanguageProvider from '@containers/LanguageProvider';
import IntlGlobalProvider from '@components/IntlGlobalProvider';
import history from './history';
import { theme } from '@containers/App';

export const renderWithIntl = (children: React.ReactNode) =>
  render(
    <IntlProvider locale={DEFAULT_LOCALE} messages={translationMessages[DEFAULT_LOCALE]}>
      <IntlGlobalProvider>{children}</IntlGlobalProvider>
    </IntlProvider>
  );

export const renderProvider = (children: React.ReactNode, { path }: { path?: string } = {}, renderFn = render) => {
  const store = configureStore({}).store;
  return renderFn(
    <Provider store={store}>
      <ConnectedLanguageProvider messages={translationMessages}>
        <ThemeProvider theme={theme}>
          <Router history={history}>{path ? <Route path={path}>{children}</Route> : children}</Router>
        </ThemeProvider>
      </ConnectedLanguageProvider>
    </Provider>
  );
};
export const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const apiResponseGenerator = <Data,>(ok: boolean, data: Data, error?: object) => ({
  ok,
  data,
  error
});

export const getStyles = () => {};
