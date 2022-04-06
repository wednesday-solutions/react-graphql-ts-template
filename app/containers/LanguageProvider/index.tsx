/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React, { PropsWithChildren } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlConfig, IntlProvider } from 'react-intl';
import IntlGlobalProvider from '@components/IntlGlobalProvider';
import { makeSelectLocale } from './selectors';

interface LanguageProviderProps {
  locale?: string;
  messages: Record<string, IntlConfig['messages']>;
}

export function LanguageProvider({ locale, messages, children }: PropsWithChildren<LanguageProviderProps>) {
  return (
    <IntlProvider locale={locale!} key={locale} messages={messages[locale!]}>
      <IntlGlobalProvider>{React.Children.only(children)}</IntlGlobalProvider>
    </IntlProvider>
  );
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired
};

LanguageProvider.defaultProps = {
  locale: 'en'
};

const mapStateToProps = createSelector(makeSelectLocale(), (locale) => ({
  locale
}));

export default connect(mapStateToProps, null)(LanguageProvider);
