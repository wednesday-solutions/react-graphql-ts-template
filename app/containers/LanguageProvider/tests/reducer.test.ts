import { initialState, languageProviderTypes, languageProviderReducer } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('Tests for LanguageProvider actions', () => {
  let mockedState: typeof initialState;
  beforeEach(() => {
    mockedState = initialState;
  });

  it('returns the initial state', () => {
    expect(languageProviderReducer(undefined, {})).toEqual(mockedState);
  });

  it('changes the locale', () => {
    const locale = 'de';
    mockedState = { ...mockedState, locale };
    expect(
      languageProviderReducer(undefined, {
        type: languageProviderTypes.CHANGE_LOCALE,
        locale
      })
    ).toEqual(mockedState);
  });

  it('should not change the locale if action does not contains location', () => {
    mockedState = { ...mockedState, locale: 'en' };
    expect(
      languageProviderReducer(undefined, {
        type: languageProviderTypes.CHANGE_LOCALE
      })
    ).toEqual(mockedState);
  });
});
