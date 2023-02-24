import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { If, T, For } from '@components';
import isEmpty from 'lodash-es/isEmpty';
import { colors, media } from '@app/themes';
import { LaunchDetails as LaunchDetailsType } from '@app/containers/LaunchDetails/types';
import { Card, Skeleton } from '@mui/material';
import placeholderImage from '@images/undraw_to_the_stars_re_wq2x.svg';

const LaunchDetailsCard = styled(Card)`
  && {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: ${(props) => props.color};

    margin: 1.5rem;
    @media (min-width: ${media.tablet}) {
      flex-direction: row;
      gap: 1rem;
    }
    background-color: ${colors.cardBg};
  }
`;

const CustomImage = styled.img`
  && {
    width: 100%;
    height: auto;
    @media (min-width: ${media.tablet}) {
      width: 50%;
      max-height: 698px;
      object-fit: cover;
    }
  }
`;

const DetailsCard = styled.div`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    margin: 3rem 0;
    @media (min-width: ${media.tablet}) {
      width: 50%;
    }
  }
`;

const RocketBox = styled.div`
  && {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const CustomT = styled(T)`
  && {
    display: block;
    font-weight: thin;
  }
`;

const launchLabelStyles = () => css`
  text-transform: uppercase;
  display: block;
  color: ${colors.primary};
  font-size: smaller;
  font-weight: bold;
`;

const LaunchLabel = styled.b`
  ${launchLabelStyles()}
`;

const LaunchLabelT = styled(T)`
  ${launchLabelStyles()}
`;

const ShipContainer = styled.div`
  margin-left: 1rem;
  display: grid;
  align-items: center;
  row-gap: 1rem;
`;

function labelRenderer(chunks: string) {
  return <LaunchLabel>{chunks}</LaunchLabel>;
}

interface LaunchDetailsProps extends LaunchDetailsType {
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

function LaunchDetails({ missionName, links, details, rocket, ships, loading }: LaunchDetailsProps) {
  return (
    <LaunchDetailsCard data-testid="launch-details" variant="outlined">
      <If condition={!loading} otherwise={renderSkeleton()}>
        <If condition={!isEmpty(links?.flickrImages)} otherwise={<CustomImage src={placeholderImage} />}>
          <CustomImage src={links?.flickrImages![0]} />
        </If>
      </If>
      <If condition={!loading} otherwise={renderSkeleton()}>
        <DetailsCard>
          <If condition={!isEmpty(missionName)}>
            <CustomT marginBottom={0.5} data-testid="mission-name" type="heading" text={missionName} />
          </If>

          <If condition={!isEmpty(details)}>
            <CustomT data-testid="details" type="standard" id="details" values={{ details, b: labelRenderer }} />
          </If>
          <If condition={!isEmpty(rocket)}>
            <LaunchLabelT type="smallBoldText" id="rocket" />
            <RocketBox>
              <If condition={!isEmpty(rocket?.rocketName)}>
                <CustomT
                  data-testid="rocket-name"
                  type="standard"
                  id="name_label"
                  values={{ name: rocket?.rocketName, b: labelRenderer }}
                />
              </If>
              <If condition={!isEmpty(rocket?.rocketType)}>
                <CustomT
                  data-testid="rocket-type"
                  type="standard"
                  id="type_label"
                  values={{ type: rocket?.rocketType, b: labelRenderer }}
                />
              </If>
            </RocketBox>
          </If>
          <If condition={!isEmpty(ships)}>
            <LaunchLabelT type="smallBoldText" id="ships" />
            <ShipContainer>
              <For
                noParent
                of={ships}
                renderItem={(ship) => (
                  <>
                    <If condition={!isEmpty(ship.name)}>
                      <CustomT data-testid="ship-name" id="name_label" values={{ name: ship.name, b: labelRenderer }} />
                    </If>
                    <If condition={!isEmpty(ship.type)}>
                      <CustomT data-testid="ship-type" id="type_label" values={{ type: ship.type, b: labelRenderer }} />
                    </If>
                  </>
                )}
              />
            </ShipContainer>
          </If>
        </DetailsCard>
      </If>
    </LaunchDetailsCard>
  );
}

LaunchDetails.propTypes = {
  id: PropTypes.string,
  loading: PropTypes.bool,
  missionName: PropTypes.string,
  launchDateUtc: PropTypes.string,
  links: PropTypes.shape({
    flickrImages: PropTypes.arrayOf(PropTypes.string)
  }),
  details: PropTypes.string,
  rocket: PropTypes.shape({
    rocketName: PropTypes.string,
    rocketType: PropTypes.string
  }),
  ships: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string
    })
  )
};

export default LaunchDetails;
