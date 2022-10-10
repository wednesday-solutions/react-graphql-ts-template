import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { media } from '@app/themes';
import If from '../If';
import { isEmpty } from 'lodash-es';
const { Meta } = Card;

export interface ItuneCardProps {
  trackId: number;
  artistName: string;
  artworkUrl100: string;
  collectionName: string;
}

const CustomCard = styled(Card)`
  && {
    padding: 5px;
    margin: 1rem;
    width: 17rem;

    ${media.lessThan('tablet')`
      width: 12rem;
      margin: 0.5rem;
    `}
  }
`;

const StyledImg = styled.img`
  && {
    max-height: 15rem;
    object-fit: cover;
  }
`;

const ItuneCard = ({ trackId, artistName, artworkUrl100, collectionName }: ItuneCardProps) => {
  return (
    <If condition={isEmpty(trackId)}>
      <CustomCard
        hoverable
        key={trackId}
        cover={<StyledImg src={artworkUrl100} loading="lazy" data-testid="cover-img" />}
      >
        <Meta data-testid="artist-name" title={artistName} description={collectionName} />
      </CustomCard>
    </If>
  );
};

export default ItuneCard;
