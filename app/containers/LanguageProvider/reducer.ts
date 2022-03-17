/*
 *
 * LanguageProvider reducer
 *
 */
import { createActions } from 'reduxsauce';
import produce from 'immer';
import { DEFAULT_LOCALE } from '@app/i18n';

type LanguageProviderTypes = {
  CHANGE_LOCALE: 'CHANGE_LOCALE';
};

type LanguageProviderAction = {
  type?: keyof LanguageProviderTypes;
  locale?: string;
};

type LanguageProviderCreators = {
  changeLocale: (locale: 'en') => LanguageProviderAction;
};

export const { Types: languageProviderTypes, Creators: languageProviderActions } = createActions<
  LanguageProviderTypes,
  LanguageProviderCreators
>({
  changeLocale: ['locale']
});

export const initialState = {
  locale: DEFAULT_LOCALE
};

/* eslint-disable default-case, no-param-reassign */
export const languageProviderReducer = (state = initialState, action: LanguageProviderAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case languageProviderTypes.CHANGE_LOCALE:
        if (action.locale) {
          draft.locale = action.locale;
        }
        break;
    }
  });

export default languageProviderReducer;
