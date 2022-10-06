import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { fonts, media } from '@app/themes';
const { Meta } = Card;

export interface ItuneCardProps {
  trackId: number;
  artistName: string;
  artworkUrl100: string;
  collectionName: string;
  cardTitle?: string;
}

const H1 = styled.h1`
  && {
    ${fonts.size.regular}
  }
`;

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

const ItuneCard = ({
  trackId,
  artistName,
  artworkUrl100,
  collectionName,
  cardTitle = 'Card Title'
}: ItuneCardProps) => {
  return (
    <CustomCard hoverable key={trackId} cover={<StyledImg src={artworkUrl100} loading="lazy" />}>
      <H1>
        {cardTitle}: {artistName}
      </H1>
      <Meta title={collectionName} />
    </CustomCard>
  );
};

export default ItuneCard;
