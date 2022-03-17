import { createSelector } from 'reselect';
import { makeSelectLocale, selectLanguage } from '../selectors';
import { initialState } from '../reducer';
import { RootState } from '@app/configureStore';
import { DEFAULT_LOCALE } from '@app/i18n';

describe('Tests for LanguageProvider selectors', () => {
  const globalState = {
    locale: DEFAULT_LOCALE
  };
  let mockedState: Partial<RootState>;
  beforeAll(() => {
    mockedState = {
      language: globalState
    };
  });
  it('should select the global state', () => {
    expect(selectLanguage(mockedState)).toEqual(globalState);
  });

  it('should select the global state', () => {
    mockedState = {};
    expect(selectLanguage(mockedState)).toEqual(initialState);
  });

  it('should return the selector', () => {
    const expectedResult = createSelector(selectLanguage, (initialState) => initialState.locale);
    expect(JSON.stringify(makeSelectLocale())).toEqual(JSON.stringify(expectedResult));
  });
});
