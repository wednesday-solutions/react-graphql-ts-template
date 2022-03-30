import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_LOCALE } from '@app/i18n';

export const initialState = {
  locale: DEFAULT_LOCALE
};

const languageProviderSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLocale(state, action) {
      state.locale = action.payload;
    }
  }
});

export const { changeLocale } = languageProviderSlice.actions;

export default languageProviderSlice.reducer;
