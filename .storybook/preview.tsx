import enMessages from '../app/translations/en.json';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import React from 'react';

i18n.load('en', enMessages);
i18n.activate('en');

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

export const decorators = [
  (Story: React.FC) => {
    return (
      <I18nProvider i18n={i18n}>
        <Story />
      </I18nProvider>
    );
  }
];
