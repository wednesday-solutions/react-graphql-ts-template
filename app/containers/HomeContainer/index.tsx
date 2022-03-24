import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { AnyAction, compose } from 'redux';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import { injectIntl, IntlShape } from 'react-intl';
import { injectSaga } from 'redux-injectors';
import { Card, Input } from 'antd';
import { selectLaunchData, selectLaunchListError, selectLaunchQuery, selectLoading } from './selectors';
import { homeContainerCreators } from './reducer';
import homeContainerSaga from './saga';
import { ErrorHandler } from '@app/components/ErrorHandler';
import { LaunchList } from '@app/components/LaunchList';

const { Search } = Input;
const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    color: ${(props) => props.color};
  }
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
  }
`;

export interface Launch {
  mission_name: string;
  launch_date_local: string;
  links: {
    wikipedia: string;
    flick_images: Array<string>;
  };
}

interface HomeContainerProps {
  dispatchLaunchList: Function;
  dispatchClearLaunchList: Function;
  launchData: {
    data: Launch;
  };
  launchListError: string;
  intl: IntlShape;
  loading: boolean;
  launchQuery: string;
}

export function HomeContainer({
  dispatchLaunchList,
  dispatchClearLaunchList,
  intl,
  loading,
  launchData,
  launchQuery,
  launchListError
}: HomeContainerProps | any) {
  useEffect(() => {
    dispatchClearLaunchList();
    dispatchLaunchList();
  }, []);

  const handleOnChange = (rName: string) => {
    if (!isEmpty(rName)) {
      dispatchLaunchList(rName);
    } else {
      dispatchLaunchList();
    }
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  return (
    <Container>
      <CustomCard title={intl.formatMessage({ id: 'spacex_search' })} />
      <Search
        data-testid="search-bar"
        defaultValue={launchQuery}
        type="text"
        onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
        onSearch={(searchText) => debouncedHandleOnChange(searchText)}
      />
      <LaunchList launchData={launchData} loading={loading} />
      <ErrorHandler loading={loading} launchListError={launchListError} />
    </Container>
  );
}

HomeContainer.propTypes = {
  dispatchLaunchList: PropTypes.func,
  dispatchClearLaunchList: PropTypes.func,
  intl: PropTypes.object,
  launchData: PropTypes.shape({
    totalCount: PropTypes.number,
    incompleteResults: PropTypes.bool,
    items: PropTypes.array
  }),
  launchListError: PropTypes.string,
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

HomeContainer.defaultProps = {
  maxwidth: 500,
  padding: 20,
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
  const { requestGetLaunchList, clearLaunchList } = homeContainerCreators;
  return {
    dispatchLaunchList: (launchQuery: string) => dispatch(requestGetLaunchList(launchQuery)),
    dispatchClearLaunchList: () => dispatch(clearLaunchList())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({ key: 'homeContainer', saga: homeContainerSaga })
)(HomeContainer);

export const HomeContainerTest = compose(injectIntl)(HomeContainer);
