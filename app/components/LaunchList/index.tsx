import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Launch } from '@containers/HomeContainer/types';
import { get, isEmpty } from 'lodash-es';
import { Card, Skeleton } from '@mui/material';
import { If, T, For, LaunchItem } from '@components';
import { colors } from '@app/themes';

const CustomErrorCard = styled(Card)`
  && {
    color: ${colors.secondary};
    margin: 2rem;
    background-color: ${colors.secondaryText};
    padding: 0 1rem 1rem 1rem;
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

const renderSkeleton = () => {
  return (
    <>
      <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
      <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
      <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
    </>
  );
};

export function LaunchList({ launchData, loading }: LaunchListProps) {
  const launches = get(launchData, 'launches', []);

  return (
    <If
      condition={!isEmpty(launches) || loading}
      otherwise={
        <CustomErrorCard variant="outlined">
          <T data-testid="default-message" id="fallback" />
        </CustomErrorCard>
      }
    >
      <If condition={!loading} otherwise={renderSkeleton()}>
        <For of={launches} ParentComponent={Container} renderItem={(launch: Launch) => <LaunchItem {...launch} />} />
      </If>
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
