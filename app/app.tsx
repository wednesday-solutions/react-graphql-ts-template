/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
import 'sanitize.css/sanitize.css';

import Providers from '@components/Providers';
import App from '@containers/App/loadable';
import React from 'react';
import ReactDOM from 'react-dom';

import { translationMessages } from './i18n';

const MOUNT_NODE = document.getElementById('app');

const render = (messages: typeof translationMessages) => {
  ReactDOM.render(
    <Providers messages={messages}>
      <App />
    </Providers>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE!);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise((resolve) => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('@lcdp/offline-plugin/runtime').install({
    onUpdated: () => {
      // Reload the webpage to load into the new version
      window.location.reload();
    }
  }); // eslint-disable-line global-require
}
