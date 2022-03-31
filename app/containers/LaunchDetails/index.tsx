/**
 *
 * LaunchDetails
 *
 */

import React, { memo, useEffect } from 'react';
import LaunchDetailsComponent from '@app/components/LaunchDetails';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { AnyAction, compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { selectLaunch, selectLaunchError, selectLoading } from './selectors';
import saga, { LaunchDetails as LaunchDetailsType } from './saga';
import { requestGetLaunch } from './reducer';
import { useParams } from 'react-router-dom';
import { Skeleton } from 'antd';

export interface LaunchDetailsProps {
  launch: LaunchDetailsType | null;
  launchError?: string;
  loading: boolean;
  dispatchLaunch: (launchId: string) => AnyAction;
}

export function LaunchDetails({ launch, launchError, loading, dispatchLaunch }: LaunchDetailsProps) {
  const params = useParams<{ launchId?: string }>();

  useEffect(() => {
    if (params.launchId) {
      dispatchLaunch(params.launchId);
    }
  }, [params]);

  return (
    <div>
      <Helmet>
        <title>Launch Details</title>
        <meta name="description" content="Description of LaunchDetails" />
      </Helmet>
      <Skeleton loading={loading} active>
        {launch && <LaunchDetailsComponent {...launch} />}
        <p>{launchError}</p>
      </Skeleton>
    </div>
  );
}

LaunchDetails.propTypes = {
  launch: PropTypes.object,
  launchError: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  dispatchLaunch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  launch: selectLaunch(),
  launchError: selectLaunchError(),
  loading: selectLoading()
});

export function mapDispatchToProps(dispatch: Function) {
  return {
    dispatchLaunch: (launchId: string) => dispatch(requestGetLaunch(launchId))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo, injectSaga({ key: 'launchDetails', saga }))(LaunchDetails);

export const LaunchDetailsTest = LaunchDetails;
