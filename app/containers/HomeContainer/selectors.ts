import { createSelector } from 'reselect';
import get from 'lodash-es/get';
import { initialState } from './reducer';

export const selectHomeContainerDomain = (state: any) => state.home || initialState;

export const selectLaunchData = () =>
  createSelector(selectHomeContainerDomain, (substate) => get(substate, 'launchData'));
export const selectLaunchListError = () =>
  createSelector(selectHomeContainerDomain, (substate) => get(substate, 'launchListError'));

export const selectLoading = () => createSelector(selectHomeContainerDomain, (substate) => get(substate, 'loading'));
