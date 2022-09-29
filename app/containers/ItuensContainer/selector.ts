import { createSelector } from 'reselect';
import get from 'lodash-es/get';
import { initialState } from './reducer';

const selectItuneState = (state: any) => state.ituneReducer || initialState;

export const selectSearchTerm = () => createSelector(selectItuneState, (substate) => get(substate, 'searchTerm'));
export const selectLoading = () => createSelector(selectItuneState, (substate) => get(substate, 'loading'));
export const selectDataToShow = () => createSelector(selectItuneState, (substate) => get(substate, 'dataToShow'));
export const selectError = () => createSelector(selectItuneState, (substate) => get(substate, 'error'));
