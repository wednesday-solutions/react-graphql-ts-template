import ErrorBoundary from '@components/ErrorBoundary';
import ScrollToTop from '@components/ScrollToTop';
import LanguageProvider from '@containers/LanguageProvider';
import history from '@utils/history';
import PropTypes from 'prop-types';
import React, { ReactNode, Suspense } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from '../../configureStore';

type Props = {
  messages: any;
  children: ReactNode;
};

const initialState = {};
const { store, persistor } = configureStore(initialState);

const Providers: React.FC<Props> = ({ children, messages }) => {
  return (
    <Suspense fallback={'...loading'}>
      <ErrorBoundary>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <LanguageProvider messages={messages}>
              <Router history={history}>
                <ScrollToTop> {children}</ScrollToTop>
              </Router>
            </LanguageProvider>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </Suspense>
  );
};

Providers.propTypes = {
  children: PropTypes.node.isRequired,
  messages: PropTypes.any
};

export default Providers;
