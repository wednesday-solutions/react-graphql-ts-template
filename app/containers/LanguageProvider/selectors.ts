import { RootState } from '@app/configureStore';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = (state: Partial<RootState>) => state.languageProvider || initialState;

/**
 * Select the language locale
 */

const makeSelectLocale = () => createSelector(selectLanguage, (languageState) => languageState.locale);

export { selectLanguage, makeSelectLocale };
