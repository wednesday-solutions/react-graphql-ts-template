import React, { useEffect, memo, useState } from 'react';
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
import T from '@components/T';
import If from '@components/If';
import { selectLaunchData, selectLaunchListError } from './selectors';
import { homeContainerCreators } from './reducer';
import homeContainerSaga from './saga';

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

interface HomeContainerProps {
  dispatchLaunchList: Function;
  dispatchClearLaunchList: Function;
  launchData: Object;
  launchListError: string;
  intl: IntlShape;
}

export function HomeContainer({
  dispatchLaunchList,
  dispatchClearLaunchList,
  intl,
  launchData,
  launchListError
}: HomeContainerProps | any) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    dispatchClearLaunchList();
    dispatchLaunchList();
  }, []);

  useEffect(() => {
    const loaded = get(launchData, 'launches', null);
    if (loaded) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [launchData]);

  const renderLaunchList = () => {
    const launches = get(launchData, 'launches', []);
    return (
      <If condition={!isEmpty(launches) || loading}>
        <CustomCard data-testid="list">
          <Skeleton loading={loading} active>
            {launches.map(
              (
                mission: {
                  mission_name: string | null | undefined;
                  launch_date_local: string | null | undefined;
                  links: {
                    wikipedia: string;
                  };
                },
                idx: React.Key | null | undefined
              ) => (
                <div key={idx}>
                  Name: {mission.mission_name}
                  <br />
                  <div>Launch Date: {mission.launch_date_local}</div>
                  <a href={mission.links.wikipedia} target="_blank" rel="noopener noreferrer" key={idx}>
                    link
                  </a>
                </div>
              )
            )}
          </Skeleton>
        </CustomCard>
      </If>
    );
  };
  const renderErrorState = () => {
    return (
      !loading &&
      launchListError && (
        <CustomCard data-testid="error-card" title={intl.formatMessage({ id: 'launches_list' })}>
          <If condition={launchListError} otherwise={<T data-testid="default-message" id={launchListError} />}>
            <T data-testid="error-message" text={launchListError} />
          </If>
        </CustomCard>
      )
    );
  };

  return (
    <Container>
      <CustomCard title={intl.formatMessage({ id: 'spacex_search' })} />
      {renderLaunchList()}
      {renderErrorState()}
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
  launchListError: selectLaunchListError()
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
