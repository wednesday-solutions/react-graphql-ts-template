import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { AnyAction, compose } from 'redux';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { injectIntl, IntlShape } from 'react-intl';
import { injectSaga } from 'redux-injectors';
import { Input } from 'antd';
import { selectLaunchData, selectLaunchListError, selectLaunchQuery, selectLoading } from './selectors';
import { homeContainerCreators } from './reducer';
import homeContainerSaga from './saga';
import { ErrorHandler } from '@app/components/ErrorHandler';
import { LaunchList } from '@app/components/LaunchList';
import { colors } from '@app/themes';

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    background-color: ${colors.secondaryText};
  }
`;

const CustomSearch = styled(Input)`
  && {
    height: 100px;
    height: 3rem;
    width: 80vw;
    margin: 1rem;
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
    launches: Launch[];
  };
  launchListError: string;
  intl: IntlShape;
  loading: boolean;
  launchQuery: string;
}

export function HomeContainer({
  dispatchLaunchList,
  loading,
  launchData,
  launchQuery,
  launchListError
}: HomeContainerProps) {
  useEffect(() => {
    if (launchQuery && !launchData) {
      dispatchLaunchList(launchQuery);
    }
  }, []);


 useEffect(() => {
    if (!launchQuery && !launchData) {
      dispatchLaunchList();
    }
  }, []);

  const handleOnChange = (rName: string) => {
    if (!isEmpty(rName)) {
      dispatchLaunchList(rName);
    } else {
      dispatchLaunchList();
    }
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 200);

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
      <CustomSearch
        prefix={prefix}
        data-testid="search-bar"
        defaultValue={launchQuery}
        type="text"
        placeholder="SEARCH BY MISSION NAME"
        onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
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
    launches: PropTypes.array
  }),
  launchListError: PropTypes.string,
  history: PropTypes.object
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
    dispatchLaunchList: (launchQuery: string) => dispatch(requestGetLaunchList(launchQuery))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({ key: 'homeContainer', saga: homeContainerSaga })
)(HomeContainer);

export const HomeContainerTest = compose(injectIntl, memo)(HomeContainer);
