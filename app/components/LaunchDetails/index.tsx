import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { If, T, For } from '@components';
import isEmpty from 'lodash-es/isEmpty';
import { colors, media } from '@app/themes';
import { LaunchDetails as LaunchDetailsType } from '@app/containers/LaunchDetails/types';
import { Card, Image, Skeleton } from 'antd';
import placeholderImage from '@images/undraw_to_the_stars_re_wq2x.svg';

const LaunchDetailsCard = styled(Card)`
  && {
    .ant-card-body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: ${(props) => props.color};

      ${media.greaterThan('tablet')`
        flex-direction: row;
      `}
    }
    margin: 1.5rem;
    background-color: ${colors.cardBg};
  }
`;

const CustomImage = styled(Image)`
  && {
    ${media.between('tablet', 'desktop')`
    .ant-image-img{
      width: 80%;
      margin: 0;
    }
    `}
    ${media.greaterThan('desktop')`
      height: 692px;
      width: 547px;
      margin: 2rem;
    `}
  }
`;

const DetailsCard = styled.div`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    margin: 3rem 0;
    ${media.greaterThan('desktop')`
      width: 50%;
      /* margin: 13% 2%; */
   `}
  }
`;

const RocketBox = styled.div`
  && {
    display: flex;
    gap: 1rem;
    margin-left: 1.5rem;
  }
`;

const CustomT = styled(T)`
  && {
    display: block;
    font-weight: thin;
    opacity: 0.7;
  }
`;

const LaunchLabel = styled.b`
  text-transform: uppercase;
  display: block;
  font-size: small;
  color: ${colors.primary};
  opacity: 1;
  font-weight: bolder;
`;

const ShipContainer = styled.div`
  margin-left: 1.5rem;
  display: grid;
  grid-template-columns: max-content auto;
  align-items: center;
  column-gap: 1rem;
  row-gap: 1rem;
`;

function labelRenderer(chunks: string) {
  return <LaunchLabel>{chunks}</LaunchLabel>;
}

interface LaunchDetailsProps extends LaunchDetailsType {
  loading: boolean;
}

function LaunchDetails({ missionName, links, details, rocket, ships, loading }: LaunchDetailsProps) {
  return (
    <LaunchDetailsCard data-testid="launch-details">
      <Skeleton loading={loading} active>
        <If
          condition={!isEmpty(links?.flickrImages)}
          otherwise={<CustomImage preview={false} src={placeholderImage} />}
        >
          <CustomImage preview={false} src={links?.flickrImages![0]} />
        </If>
      </Skeleton>
      <Skeleton loading={loading} active>
        <DetailsCard>
          <If condition={!isEmpty(missionName)}>
            <CustomT marginBottom={0.5} data-testid="mission-name" type="heading" text={missionName} />
          </If>

          <If condition={!isEmpty(details)}>
            <CustomT data-testid="details" type="standard" id="details" values={{ details, b: labelRenderer }} />
          </If>
          <If condition={!isEmpty(rocket)}>
            <LaunchLabel>Rocket </LaunchLabel>
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
            <LaunchLabel>Ships </LaunchLabel>
            <ShipContainer>
              <CustomT marginBottom={-0.5} id="name_label" values={{ name: '', b: labelRenderer }} />
              <CustomT marginBottom={-0.5} id="type_label" values={{ type: '', b: labelRenderer }} />
              <For
                noParent
                of={ships}
                renderItem={(ship) => (
                  <>
                    <If condition={!isEmpty(ship.name)}>
                      <CustomT data-testid="ship-name" type="standard" text={ship.name} />
                    </If>
                    <If condition={!isEmpty(ship.type)}>
                      <CustomT data-testid="ship-type" type="standard" text={ship.type} />
                    </If>
                  </>
                )}
              />
            </ShipContainer>
          </If>
        </DetailsCard>
      </Skeleton>
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
