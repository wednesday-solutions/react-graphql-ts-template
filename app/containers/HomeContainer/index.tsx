import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { AnyAction, compose } from 'redux';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import { injectSaga } from 'redux-injectors';
import { Button, Input, Select } from 'antd';
import { selectLaunchData, selectLaunchListError, selectLaunchQuery, selectLoading } from './selectors';
import { homeContainerCreators } from './reducer';
import homeContainerSaga from './saga';
import { ErrorHandler } from '@components/ErrorHandler';
import { LaunchList } from '@components/LaunchList';
import history from '@app/utils/history';
import arrowUp from '@images/ArrowUp.svg';
import arrowDown from '@images/ArrowDown.svg';
import arrowUpDown from '@images/ArrowUpDown.svg';
import { colors } from '@app/themes';

const { Search } = Input;

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    padding: 1rem;
  }
`;

const CustomHeader = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`;

const SortSelect = styled(Select)`
  && {
    width: 9.5rem;
    background-color: #fff;
    .ant-select-selection-item {
      color: ${colors.secondaryText};
    }
  }
`;

const CustomFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

export interface Launch {
  missionName: string;
  launchDateLocal: string;
  links: {
    wikipedia: string;
    flickrImages: Array<string>;
  };
}

export interface LaunchData {
  launches?: Launch[];
}

export interface HomeContainerProps {
  dispatchLaunchList: (missionName?: string) => void;
  launchQuery: string;
  launchData?: LaunchData;
  launchListError?: string;
  loading: boolean;
}

type Sort = 'asc' | 'desc' | 'default';

const LAUNCH_PER_PAGE = 6;

export function HomeContainer({
  dispatchLaunchList,
  loading,
  launchData,
  launchQuery,
  launchListError
}: HomeContainerProps) {
  const [launches, setLaunches] = useState<LaunchData>({});
  const [dateSort, setDateSort] = useState<Sort>('default');
  const page = +(new URLSearchParams(window.location.search).get('page') || 1);

  useEffect(() => {
    dispatchLaunchList();
  }, []);

  useEffect(() => {
    if (!launchData?.launches) {
      return;
    }
    const sortedLaunches = launchData.launches.slice();
    switch (dateSort) {
      case 'asc':
        sortedLaunches.sort((a, b) => +new Date(a.launchDateLocal) - +new Date(b.launchDateLocal));
        break;
      case 'desc':
        sortedLaunches.sort((a, b) => +new Date(b.launchDateLocal) - +new Date(a.launchDateLocal));
        break;
    }
    const offset = (page - 1) * LAUNCH_PER_PAGE;
    const paginatedLaunches = sortedLaunches.slice(offset, offset + LAUNCH_PER_PAGE);
    setLaunches({ launches: paginatedLaunches });
  }, [launchData, dateSort]);

  const handleOnChange = (rName: string) => {
    if (!isEmpty(rName)) {
      dispatchLaunchList(rName);
    } else {
      dispatchLaunchList();
    }
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const clearSort = () => setDateSort('default');

  const handlePrev = () => {
    history.push({ pathname: '/', search: `?page=${page - 1}` });
  };

  const handleNext = () => {
    history.push({ pathname: '/', search: `?page=${page + 1}` });
  };

  return (
    <Container>
      <CustomHeader>
        <Search
          data-testid="search-bar"
          defaultValue={launchQuery}
          type="text"
          onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
          onSearch={(searchText) => debouncedHandleOnChange(searchText)}
        />
        <Button disabled={dateSort === 'default'} onClick={clearSort}>
          CLEAR SORT
        </Button>
        <SortSelect
          data-testid="sort-select"
          id="sort-select"
          suffixIcon={
            dateSort === 'default' ? (
              <img src={arrowUpDown} alt="chevron-up-down" />
            ) : dateSort === 'asc' ? (
              <img src={arrowUp} alt="chevron-up" />
            ) : (
              <img src={arrowDown} alt="chevron-down" />
            )
          }
          value={dateSort}
          onChange={(value) => setDateSort(value as Sort)}
        >
          <Select.Option data-testid="default-option" value="default" disabled>
            SORT BY DATE
          </Select.Option>
          <Select.Option value="desc">DESC</Select.Option>
          <Select.Option data-testid="asc-option" value="asc">
            ASC
          </Select.Option>
        </SortSelect>
      </CustomHeader>
      <LaunchList launchData={launches} loading={loading} />
      <ErrorHandler loading={loading} launchListError={launchListError} />
      <CustomFooter>
        <Button type="primary" onClick={handlePrev} disabled={!launchData?.launches?.length || loading || page === 1}>
          PREV
        </Button>
        <Button
          type="primary"
          onClick={handleNext}
          disabled={!launchData?.launches?.length || loading || page >= launchData.launches.length / LAUNCH_PER_PAGE}
        >
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
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

HomeContainer.defaultProps = {
  launchData: {},
  launchListError: null
};

const mapStateToProps = createStructuredSelector({
  launchData: selectLaunchData(),
  launchListError: selectLaunchListError(),
  loading: selectLoading(),
  lanchQuery: selectLaunchQuery()
});

export function mapDispatchToProps(dispatch: (arg0: AnyAction) => any) {
  const { requestGetLaunchList } = homeContainerCreators;
  return {
    dispatchLaunchList: (missionName?: string) => dispatch(requestGetLaunchList(missionName))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo, injectSaga({ key: 'homeContainer', saga: homeContainerSaga }))(HomeContainer);

export const HomeContainerTest = HomeContainer;
