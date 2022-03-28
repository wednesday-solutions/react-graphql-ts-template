import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { get, isEmpty } from 'lodash-es';
import { Card, Skeleton } from 'antd';
import { If, T, For } from '@components';
import { colors } from '@app/themes';
import { Launch } from '@app/containers/HomeContainer';

const CustomCard = styled(Card)`
  && {
    color: ${colors.primary};
    background-color: ${colors.secondaryText};
  }
`;
const WrapperCard = styled(Card)`
  && {
    color: ${colors.primary};
    border: none;
    background-color: ${colors.secondaryText};
  }
`;

const CustomErrorCard = styled(Card)`
  && {
    color: ${colors.secondary};
    margin: 2rem;
    background-color: ${colors.secondaryText};
  }
`;

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    background-color: ${colors.secondaryText};
  }
`;

interface LaunchListProps {
  launchData: { launches?: Launch[] };
  loading: boolean;
}

export function LaunchList({ launchData, loading }: LaunchListProps) {
  const launches = get(launchData, 'launches', []);
  return (
    <If
      condition={!isEmpty(launches) || loading}
      otherwise={
        <CustomErrorCard>
          <T data-testid="default-message" id="fallback" />
        </CustomErrorCard>
      }
    >
      <WrapperCard data-testid="list">
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
          />
        </Skeleton>
      </WrapperCard>
    </If>
  );
}

LaunchList.propTypes = {
  launchData: PropTypes.shape({
    launches: PropTypes.arrayOf(
      PropTypes.shape({
        mission_name: PropTypes.string,
        launch_date_local: PropTypes.string,
        links: PropTypes.shape({
          wikipedia: PropTypes.string,
          flick_images: PropTypes.array
        })
      })
    )
  }),
  loading: PropTypes.bool
};

export default memo(LaunchList);
