import { createSelector } from 'reselect';
import get from 'lodash-es/get';
import { initialState } from '../SongProviderContainer/reducer';

export const selectItuneState = (state: any) => state.songReducer || initialState;

export const selectLoading = () => createSelector(selectItuneState, (substate) => get(substate, 'loading'));
export const selectSongData = () => createSelector(selectItuneState, (substate) => get(substate, 'songData'));
export const selectSongListError = () => createSelector(selectItuneState, (substate) => get(substate, 'songListError'));
