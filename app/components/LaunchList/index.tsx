import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { get, isEmpty } from 'lodash';
import { Skeleton } from 'antd';
import If from '@components/If';
import { Launch } from '@app/containers/HomeContainer';
import For from '@components/For';
import LaunchItem from '@components/LaunchItem';

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
  }
`;

interface LaunchListProps {
  launchData?: { launches?: Launch[] };
  loading: boolean;
}

export function LaunchList({ launchData, loading }: LaunchListProps) {
  const launches = get(launchData, 'launches', []);

  return (
    <If condition={!isEmpty(launches) || loading}>
      <div data-testid="list">
        <Skeleton loading={loading} active>
          <For
            of={launches}
            ParentComponent={Container}
            renderItem={(launch: Launch, idx) => <LaunchItem key={idx} {...launch} />}
          />
        </Skeleton>
      </div>
    </If>
  );
}

LaunchList.propTypes = {
  launchData: PropTypes.shape({
    launches: PropTypes.arrayOf(
      PropTypes.shape({
        missionName: PropTypes.string,
        launchDateLocal: PropTypes.string,
        links: PropTypes.shape({
          wikipedia: PropTypes.string,
          flickrImages: PropTypes.array
        })
      })
    )
  }),
  loading: PropTypes.bool
};

export default memo(LaunchList);
