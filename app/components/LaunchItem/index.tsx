import React, { useMemo } from 'react';
import { Launch } from '@app/containers/HomeContainer/types';
import { Button, Card } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import If from '@components/If';
import { T } from '@components/T';
import isEmpty from 'lodash-es/isEmpty';
import { colors } from '@app/themes';
import { GlobalOutlined } from '@ant-design/icons';
import history from '@app/utils/history';
import { format } from 'date-fns';

const LaunchCard = styled(Card)`
  && {
    cursor: pointer;
    margin: 1rem 0;
    color: ${(props) => props.color};
    background-color: ${colors.cardBg};
    &:hover {
      box-shadow: inset 0 0 10px -5px rgba(0, 0, 0, 0.6);
    }
  }
`;

const WikiLink = styled(Button)`
  && {
    padding: 0;
    display: flex;
    align-items: center;
    color: ${colors.text};
    width: max-content;
    &:hover {
      opacity: 0.6;
    }
  }
`;

function LaunchItem({ missionName, launchDateUtc, links, id }: Launch) {
  const goToLaunch = () => history.push(`/launch/${id}`);

  const memoizedLaunchDate = useMemo(
    () => format(new Date(launchDateUtc), 'eee, do MMMM yyyy, hh:mm a'),
    [launchDateUtc]
  );

  return (
    <LaunchCard data-testid="launch-item" onClick={goToLaunch}>
      <If condition={!isEmpty(missionName)}>
        <T data-testid="mission-name" marginBottom={1.5} type="subheading" text={missionName} />
      </If>
      <If condition={!isEmpty(launchDateUtc)}>
        <T text={memoizedLaunchDate} />
      </If>
      <If condition={!isEmpty(links)}>
        <If condition={!isEmpty(links.wikipedia)}>
          <WikiLink
            data-testid="wiki-link"
            type="link"
            rel="noreferrer"
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            href={links.wikipedia}
            icon={<GlobalOutlined />}
          >
            Wikipedia
          </WikiLink>
        </If>
      </If>
    </LaunchCard>
  );
}

LaunchItem.propTypes = {
  id: PropTypes.string,
  missionName: PropTypes.string,
  launchDateUtc: PropTypes.string,
  links: PropTypes.shape({
    wikipedia: PropTypes.string,
    flickrImages: PropTypes.arrayOf(PropTypes.string)
  })
};

export default LaunchItem;
