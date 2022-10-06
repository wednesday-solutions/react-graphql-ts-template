import React from 'react';
import { Card, Row } from 'antd';
import styled from 'styled-components';
import { song } from '@app/containers/ItunesContainer/types';
import { colors, media } from '@app/themes';
const { Meta } = Card;

export interface ItuneCardProps {
  songData: {
    resultCount: number;
    results: song[];
  };
}

const defaultProps = {
  cardTitle: 'Card Title'
};

const CustomRow = styled(Row)`
  && {
    background-color: ${colors.cardContainerBg};
    gap: 2.5rem;

    ${media.lessThan('tablet')`
    justify-content: center;`}
  }
`;

const H1 = styled.h1`
  && {
    font-size: 1rem;
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

const ItuneCard = ({ songData, cardTitle }: ItuneCardProps & typeof defaultProps) => {
  console.log(cardTitle, 'in Itune Card');
  const { results } = songData;
  return (
    <CustomRow>
      {results.length > 0 &&
        results.map(({ trackId, artistName, artworkUrl100, collectionName }) => (
          <CustomCard hoverable key={trackId} cover={<StyledImg src={artworkUrl100} loading="lazy" />}>
            <H1>
              {cardTitle}: {artistName}
            </H1>
            <Meta title={collectionName} />
          </CustomCard>
        ))}
    </CustomRow>
  );
};

export default ItuneCard;

ItuneCard.defaultProps = defaultProps;
