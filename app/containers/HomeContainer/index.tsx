import React, { useEffect, memo, ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { AnyAction, compose } from 'redux';
import debounce from 'lodash-es/debounce';
import isEmpty from 'lodash-es/isEmpty';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { injectSaga } from 'redux-injectors';
import { Button, Input, Select } from 'antd';
import { selectLaunchData, selectLaunchListError, selectLaunchQuery, selectLoading } from './selectors';
import history from '@app/utils/history';
import arrowUp from '@images/ArrowUp.svg';
import arrowDown from '@images/ArrowDown.svg';
import arrowUpDown from '@images/ArrowUpDown.svg';
import { homeContainerCreators } from './reducer';
import homeContainerSaga from './saga';
import { LaunchList, ErrorHandler } from '@components';
import { colors } from '@app/themes';
import { injectIntl, IntlShape } from 'react-intl';

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 1rem;
    background-color: ${colors.secondaryText};
  }
`;

const CustomHeader = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`;

const CustomSearch = styled(Input)`
  && {
    .ant-input {
      padding-left: 0.5rem;
    }
  }
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
  launchData: LaunchData;
  launchListError?: string;
  loading: boolean;
  intl: IntlShape;
}

type Sort = 'asc' | 'desc' | 'default';

export const LAUNCH_PER_PAGE = 6;

export function HomeContainer({
  dispatchLaunchList,
  loading,
  launchData,
  intl,
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

  useEffect(() => {
    if (!launchQuery && !launchData?.launches) {
      dispatchLaunchList();
    }
  }, []);

  const handleOnChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const rName = e.target.value;
    if (!isEmpty(rName)) {
      dispatchLaunchList(rName);
    } else {
      dispatchLaunchList();
    }
  }, 300);

  const prefix = (
    <SearchOutlined
      style={{
        fontSize: 22,
        color: 'black'
      }}
    />
  );

  const clearSort = () => setDateSort('default');

  const handlePrev = () => {
    history.push({ search: `?page=${page - 1}` });
  };

  const handleNext = () => {
    history.push({ search: `?page=${page + 1}` });
  };

  return (
    <Container>
      <CustomHeader>
        <CustomSearch
          prefix={prefix}
          data-testid="search-bar"
          defaultValue={launchQuery}
          type="text"
          placeholder={intl.formatMessage({ id: 'placeholder_text' })}
          onChange={handleOnChange}
        />
        <Button disabled={dateSort === 'default'} onClick={clearSort} data-testid="clear-sort">
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
        <Button
          data-testid="prev-btn"
          type="primary"
          onClick={handlePrev}
          disabled={!launchData?.launches?.length || loading || page === 1}
        >
          PREV
        </Button>
        <Button
          data-testid="next-btn"
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
  intl: PropTypes.object
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
    dispatchLaunchList: (launchQuery?: string) => dispatch(requestGetLaunchList(launchQuery))
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
