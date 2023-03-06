import React, { useEffect, memo, ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { AnyAction, compose } from 'redux';
import debounce from 'lodash-es/debounce';
import isEmpty from 'lodash-es/isEmpty';
import { Search as SearchOutlined } from '@mui/icons-material';
import styled from '@emotion/styled';
import { injectSaga } from 'redux-injectors';
import { Button, Select, IconButton, InputAdornment, OutlinedInput, MenuItem } from '@mui/material';
import { selectLaunchData, selectLaunchListError, selectLoading } from './selectors';
import homeContainerSaga from './saga';
import { requestGetLaunchList } from './reducer';
import { LaunchList, ErrorHandler } from '@components';
import { colors, media } from '@app/themes';
import { injectIntl } from 'react-intl';
import useSort from './useSort';
import usePaginate from './usePaginate';
import { setQueryParam } from '@app/utils';
import history from '@app/utils/history';
import { RequestLaunchesActionPayload, HomeContainerProps } from './types';

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 2rem 4rem;
    background-color: ${colors.secondaryText};
  }
`;

const CustomHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  @media (min-width: ${media.tablet}) {
    flex-direction: row;
  }
`;

const CustomSearch = styled(OutlinedInput)`
  && {
    width: 90%;
    legend {
      display: none;
    }
    > fieldset {
      top: 0;
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SortSelect = styled(Select)`
  && {
    width: 11.5rem;
    background-color: #fff;
    padding-right: 0;
  }
`;

const CustomFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

export function HomeContainer({ dispatchLaunchList, loading, launchData, intl, launchListError }: HomeContainerProps) {
  const { order, handleClearSort, handleDateSort } = useSort();
  const { page, hasNextPage, hasPrevPage, handleNext, handlePrev, resetPage } = usePaginate(launchData);

  const missionName = new URLSearchParams(history.location.search).get('mission_name');
  const setMissionName = (missionName: string) => setQueryParam({ param: 'mission_name', value: missionName });
  const clearMissionName = () => setQueryParam({ param: 'mission_name', deleteParam: true });

  useEffect(() => {
    dispatchLaunchList({ missionName, order, page });
  }, []);

  useEffect(() => {
    if (launchData.launches && !launchData.launches.length && page !== 1) {
      resetPage();
    }
  }, [launchData]);

  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const missionSearch = e.target.value;
    if (!isEmpty(missionSearch)) {
      setMissionName(missionSearch);
    } else {
      clearMissionName();
    }
  }, 300);

  return (
    <Container>
      <CustomHeader>
        <CustomSearch
          autoFocus
          inputProps={{ 'data-testid': 'search-bar' }}
          type="text"
          placeholder={intl.formatMessage({ id: 'placeholder_text' })}
          defaultValue={missionName || ''}
          onChange={handleSearch}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                data-testid="search-icon"
                aria-label="search repos"
                type="button"
                onClick={() => missionName && setMissionName(missionName)}
              >
                <SearchOutlined />
              </IconButton>
            </InputAdornment>
          }
        />
        <ButtonBox>
          <Button
            variant="contained"
            disabled={!order}
            onClick={handleClearSort}
            data-testid="clear-sort"
            sx={{ minWidth: 'max-content' }}
          >
            CLEAR SORT
          </Button>
          <SortSelect
            variant="outlined"
            id="sort-select"
            data-testid="sort-select"
            value={order || 'default'}
            onChange={handleDateSort as any}
          >
            <MenuItem value="default" disabled>
              SORT BY DATE
            </MenuItem>
            <MenuItem value="desc">DESC</MenuItem>
            <MenuItem value="asc">ASC</MenuItem>
          </SortSelect>
        </ButtonBox>
      </CustomHeader>
      <LaunchList launchData={launchData} loading={loading} />
      <ErrorHandler loading={loading} launchListError={launchListError} />
      <CustomFooter>
        <Button variant="contained" data-testid="prev-btn" onClick={handlePrev} disabled={loading || !hasPrevPage}>
          PREV
        </Button>
        <Button variant="contained" data-testid="next-btn" onClick={handleNext} disabled={loading || !hasNextPage}>
          NEXT
        </Button>
      </CustomFooter>
    </Container>
  );
}

HomeContainer.propTypes = {
  dispatchLaunchList: PropTypes.func,
  launchData: PropTypes.shape({
    launches: PropTypes.array
  }),
  launchListError: PropTypes.string,
  history: PropTypes.object,
  intl: PropTypes.object
};

HomeContainer.defaultProps = {
  launchData: {},
  launchListError: null
};

const mapStateToProps = createStructuredSelector({
  launchData: selectLaunchData(),
  launchListError: selectLaunchListError(),
  loading: selectLoading()
});

export function mapDispatchToProps(dispatch: (arg0: AnyAction) => any) {
  return {
    dispatchLaunchList: (payload: RequestLaunchesActionPayload) => dispatch(requestGetLaunchList(payload))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  injectSaga({ key: 'homeContainer', saga: homeContainerSaga }),
  injectIntl
)(HomeContainer);

export const HomeContainerTest = HomeContainer;
