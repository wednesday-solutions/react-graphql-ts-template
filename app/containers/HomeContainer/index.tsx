import React, { useEffect, memo, ChangeEvent } from 'react';
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
import { selectLaunchData, selectLaunchListError, selectLoading } from './selectors';
import arrowUp from '@images/ArrowUp.svg';
import arrowDown from '@images/ArrowDown.svg';
import arrowUpDown from '@images/ArrowUpDown.svg';
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
    padding: 1rem;
    background-color: ${colors.secondaryText};
  }
`;

const CustomHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  ${media.greaterThan('tablet')`
    flex-direction: row;
  `}
`;

const CustomSearch = styled(Input)`
  && {
    .ant-input {
      padding-left: 0.5rem;
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 0.5rem;
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

  const prefix = (
    <SearchOutlined
      style={{
        fontSize: 22,
        color: 'black'
      }}
    />
  );

  return (
    <Container>
      <CustomHeader>
        <CustomSearch
          prefix={prefix}
          data-testid="search-bar"
          type="text"
          placeholder={intl.formatMessage({ id: 'placeholder_text' })}
          defaultValue={missionName || ''}
          onChange={handleSearch}
          autoFocus
        />
        <ButtonBox>
          <Button disabled={!order} onClick={handleClearSort} data-testid="clear-sort">
            CLEAR SORT
          </Button>
          <SortSelect
            data-testid="sort-select"
            id="sort-select"
            suffixIcon={
              order === 'asc' ? (
                <img src={arrowUp} alt="chevron-up" />
              ) : order === 'desc' ? (
                <img src={arrowDown} alt="chevron-down" />
              ) : (
                <img src={arrowUpDown} alt="chevron-up-down" />
              )
            }
            value={order || 'default'}
            onChange={handleDateSort as any}
          >
            <Select.Option value="default" disabled>
              SORT BY DATE
            </Select.Option>
            <Select.Option value="desc">DESC</Select.Option>
            <Select.Option value="asc">ASC</Select.Option>
          </SortSelect>
        </ButtonBox>
      </CustomHeader>
      <LaunchList launchData={launchData} loading={loading} />
      <ErrorHandler loading={loading} launchListError={launchListError} />
      <CustomFooter>
        <Button data-testid="prev-btn" type="primary" onClick={handlePrev} disabled={loading || !hasPrevPage}>
          PREV
        </Button>
        <Button data-testid="next-btn" type="primary" onClick={handleNext} disabled={loading || !hasNextPage}>
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
