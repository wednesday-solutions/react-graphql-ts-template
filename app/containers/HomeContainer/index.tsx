import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { AnyAction, compose } from 'redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import { injectIntl, IntlShape } from 'react-intl';
import { injectSaga } from 'redux-injectors';
import { Card, Skeleton } from 'antd';
import If from '@components/If';
import { selectLaunchData, selectLaunchListError, selectLoading } from './selectors';
import { homeContainerCreators } from './reducer';
import homeContainerSaga from './saga';
import For from '@app/components/For';
import { ErrorHandler } from '@app/components/ErrorHandler';

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

export interface launch {
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
    data: launch;
  };
  launchListError: string;
  intl: IntlShape;
}

export function HomeContainer({
  dispatchLaunchList,
  dispatchClearLaunchList,
  intl,
  loading,
  launchData,
  launchListError
}: HomeContainerProps | any) {
  useEffect(() => {
    dispatchClearLaunchList();
    dispatchLaunchList();
  }, []);

  const renderLaunchList = () => {
    const launches = get(launchData, 'launches', []);
    return (
      <If condition={!isEmpty(launches) || loading}>
        <CustomCard data-testid="list">
          <Skeleton loading={loading} active>
            <For
              of={launches}
              ParentComponent={Container}
              renderItem={(launch: launch, idx) => (
                <CustomCard key={idx}>
                  <div>{launch.mission_name}</div>
                  <div> {launch.launch_date_local}</div>
                </CustomCard>
              )}
            ></For>
          </Skeleton>
        </CustomCard>
      </If>
    );
  };

  return (
    <Container>
      <CustomCard title={intl.formatMessage({ id: 'spacex_search' })} />
      {renderLaunchList()}
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
  loading: selectLoading()
});

export function mapDispatchToProps(dispatch: (arg0: AnyAction) => any) {
  const { requestGetLaunchList, clearLaunchList } = homeContainerCreators;
  return {
    dispatchLaunchList: () => dispatch(requestGetLaunchList()),
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
