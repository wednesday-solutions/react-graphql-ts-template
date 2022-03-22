import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

export const selectHomeContainerDomain = (state: any) => state.homeContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */

export const selectLaunchData = () =>
  createSelector(selectHomeContainerDomain, (substate) => get(substate, 'launchData'));

export const selectLaunchListError = () =>
  createSelector(selectHomeContainerDomain, (substate) => get(substate, 'launchListError'));

export const selectLaunchQuery = () =>
  createSelector(selectHomeContainerDomain, (substate) => get(substate, 'launchQuery'));
