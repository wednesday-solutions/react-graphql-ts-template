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
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { makeSelectLocale } from './selectors';

export interface LanguageProviderProps {
  locale: string;
  messages: Record<string, object>;
}

export function LanguageProvider({ locale, messages, children }: PropsWithChildren<LanguageProviderProps>) {
  const localizedMessages = messages[locale];
  i18n.load(locale, localizedMessages);
  i18n.activate(locale);

  return <I18nProvider i18n={i18n}>{React.Children.only(children)}</I18nProvider>;
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
