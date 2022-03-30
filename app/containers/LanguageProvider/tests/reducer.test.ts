import languageProviderReducer, { initialState, changeLocale } from '../reducer';

describe('Tests for LanguageProvider actions', () => {
  let mockedState: { locale: string };
  beforeEach(() => {
    mockedState = initialState;
  });

  it('returns the initial state', () => {
    expect(
      languageProviderReducer(undefined, {
        type: undefined
      })
    ).toEqual(mockedState);
  });

  it('changes the locale', () => {
    const locale = 'de';
    mockedState = { ...mockedState, locale };
    expect(
      languageProviderReducer(undefined, {
        type: changeLocale.toString(),
        payload: locale
      })
    ).toEqual(mockedState);
  });
});
