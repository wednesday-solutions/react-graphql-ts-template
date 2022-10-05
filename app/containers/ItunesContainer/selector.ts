import { createSelector } from 'reselect';
import get from 'lodash-es/get';
import { initialState } from './reducer';

const selectItuneState = (state: any) => state.ituneReducer || initialState;

export const selectLoading = () => createSelector(selectItuneState, (substate) => get(substate, 'loading'));
export const selectSongData = () => createSelector(selectItuneState, (substate) => get(substate, 'songData'));
export const selectSongListError = () => createSelector(selectItuneState, (substate) => get(substate, 'error'));
