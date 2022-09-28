import { createSelector } from 'reselect';
import get from 'lodash-es/get';
import { initialState } from './reducer';

const selectItuneState = (state: any) => state.Itune || initialState;

const selectSearchTerm = createSelector(selectItuneState, (substate) => get(substate, 'searchTerm'));

export default selectSearchTerm;
