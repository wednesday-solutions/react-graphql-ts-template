import get from 'lodash-es/get';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the launchDetails state domain
 */

const selectLaunchDetailsDomain = (state: any) => state.launchDetails || initialState;

const selectLaunch = () => createSelector(selectLaunchDetailsDomain, (substate) => get(substate, 'launch'));
const selectLoading = () => createSelector(selectLaunchDetailsDomain, (substate) => get(substate, 'loading'));
const selectLaunchError = () => createSelector(selectLaunchDetailsDomain, (substate) => get(substate, 'launchError'));

export default selectLaunchDetailsDomain;
export { selectLaunchDetailsDomain, selectLaunch, selectLoading, selectLaunchError };
