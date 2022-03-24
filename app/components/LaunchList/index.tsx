import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { get, isEmpty } from 'lodash';
import { Card, Skeleton } from 'antd';
import If from '@components/If';
import { Launch } from '@app/containers/HomeContainer';
import For from '@components/For';

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

interface LaunchListProps {
  launchData: Launch;
  loading: boolean;
}

export function LaunchList({ launchData, loading }: LaunchListProps) {
  const launches = get(launchData, 'launches', []);
  return (
    <If condition={!isEmpty(launches) || loading}>
      <CustomCard data-testid="list">
        <Skeleton loading={loading} active>
          <For
            of={launches}
            ParentComponent={Container}
            renderItem={(launch: Launch, idx) => (
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
}

LaunchList.propTypes = {
  launchData: PropTypes.shape({
    mission_name: PropTypes.string,
    launch_date_local: PropTypes.string,
    links: PropTypes.shape({
      wikipedia: PropTypes.string,
      flick_images: PropTypes.array
    })
  }),
  loading: PropTypes.bool
};

export default memo(LaunchList);
