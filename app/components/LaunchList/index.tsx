import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Launch } from '@containers/HomeContainer/types';
import { get, isEmpty } from 'lodash-es';
import { Card, Skeleton } from 'antd';
import { If, T, For, LaunchItem } from '@components';
import { colors } from '@app/themes';

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
      <Skeleton loading={loading} active>
        <For of={launches} ParentComponent={Container} renderItem={(launch: Launch) => <LaunchItem {...launch} />} />
      </Skeleton>
    </If>
  );
}

LaunchList.propTypes = {
  launchData: PropTypes.shape({
    launches: PropTypes.arrayOf(
      PropTypes.shape({
        missionName: PropTypes.string,
        launchDateUtc: PropTypes.string,
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
