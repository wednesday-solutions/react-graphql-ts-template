import React from 'react';
import { Launch } from '@app/containers/HomeContainer';
import { Button, Card } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import If from '@components/If';
import { T } from '@components/T';
import isEmpty from 'lodash/isEmpty';
import { colors } from '@app/themes';

const LaunchCard = styled(Card)`
  && {
    margin: 1rem 0;
    color: ${(props) => props.color};
    background-color: ${colors.cardBg};
  }
`;

const WikiLink = styled(Button)`
  && {
    padding: 0;
    color: ${colors.text};
  }
`;

function LaunchItem({ missionName, launchDateLocal, links }: Launch) {
  return (
    <LaunchCard>
      <If condition={!isEmpty(missionName)} otherwise={<T id="mission_name_unavailable" />}>
        <T data-testid="mission-name" marginBottom={1.5} type="subheading" text={missionName} />
      </If>
      <If condition={!isEmpty(launchDateLocal)} otherwise={<T id="launch_date_unavailable" />}>
        <T text={launchDateLocal} />
      </If>
      <If condition={!isEmpty(links)} otherwise={<T id="launch_links_unavailable" />}>
        <If condition={!isEmpty(links.wikipedia)} otherwise={<T id="launch_wiki_unavailable" />}>
          <WikiLink type="link" rel="noreferrer" target="_blank" href={links.wikipedia}>
            Wiki Link
          </WikiLink>
        </If>
      </If>
    </LaunchCard>
  );
}

LaunchItem.propTypes = {
  missionName: PropTypes.string,
  launchDateLocal: PropTypes.string,
  links: PropTypes.shape({
    wikipedia: PropTypes.string,
    flickrImages: PropTypes.arrayOf(PropTypes.string)
  })
};

export default LaunchItem;
