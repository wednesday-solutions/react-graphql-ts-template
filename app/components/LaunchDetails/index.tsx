import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { If, T, For } from '@components';
import isEmpty from 'lodash-es/isEmpty';
import { colors, media } from '@app/themes';
import { LaunchDetails as LaunchDetailsType } from '@app/containers/LaunchDetails/saga';
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
    gap: 0.3rem;
    margin: 3rem 0;
    ${media.greaterThan('desktop')`
      width: 50%;
      /* margin: 13% 2%; */
   `}
  }
`;

const ShipContainer = styled.div`
  && {
    display: block;
    margin-left: 1rem;
  }
`;

const CustomT = styled(T)`
  && {
    display: block;
  }
`;

interface LaunchDetailsProps extends LaunchDetailsType {
  loading: boolean;
}

function LaunchDetails({ missionName, links, details, rocket, ships, loading }: LaunchDetailsProps) {
  return (
    <LaunchDetailsCard data-testid="launch-details">
      <Skeleton loading={loading} active>
        <If condition={!isEmpty(links.flickrImages)} otherwise={<CustomImage preview={false} src={placeholderImage} />}>
          <CustomImage preview={false} src={links.flickrImages![0]} />
        </If>
      </Skeleton>
      <Skeleton loading={loading} active>
        <DetailsCard>
          <If condition={!isEmpty(missionName)} otherwise={<T marginBottom={1.5} id="mission_name_unavailable" />}>
            <T
              data-testid="mission-name"
              marginBottom={1.5}
              type="heading"
              id="mission_name"
              values={{ missionName }}
            />
          </If>

          <If condition={!isEmpty(details)} otherwise={<T marginBottom={0.5} id="details_unavailable" />}>
            <T marginBottom={0.5} data-testid="details" type="standard" id="details" values={{ details }} />
          </If>
          <If condition={!isEmpty(rocket.rocketName)} otherwise={<T marginBottom={0.2} id="rocket_name_unavailable" />}>
            <T
              marginBottom={0.2}
              data-testid="rocket-name"
              type="standard"
              id="rocket_name"
              values={{ rocketName: rocket.rocketName }}
            />
          </If>
          <If condition={!isEmpty(rocket.rocketType)} otherwise={<T marginBottom={0.2} id="rocket_type_unavailable" />}>
            <T
              marginBottom={0.2}
              data-testid="rocket-type"
              type="standard"
              id="rocket_type"
              values={{ rocketType: rocket.rocketType }}
            />
          </If>
          <If condition={!isEmpty(ships)} otherwise={<T marginBottom={0.2} id="ships_unavailable" />}>
            <T type="standard" text={'Ships:'} />
            <For
              of={ships}
              ParentComponent={ShipContainer}
              renderItem={(item) => (
                <>
                  <If condition={!isEmpty(item.name)} otherwise={<T marginBottom={0.2} id="ship_name_unavailable" />}>
                    <CustomT
                      marginBottom={0.2}
                      data-testid="ship-name"
                      type="standard"
                      id="ship_name"
                      values={{ shipName: item.name }}
                    />
                  </If>
                  <If condition={!isEmpty(item.type)} otherwise={<T marginBottom={0.2} id="ship_type_unavailable" />}>
                    <CustomT
                      marginBottom={0.2}
                      data-testid="ship-type"
                      type="standard"
                      id="ship_type"
                      values={{ shipType: item.type }}
                    />
                  </If>
                </>
              )}
            />
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
    rocket_name: PropTypes.string,
    rocket_type: PropTypes.string
  }),
  ships: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string
    })
  )
};

export default LaunchDetails;
