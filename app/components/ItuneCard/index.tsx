import React from 'react';
import { Card, Row } from 'antd';
import styled from 'styled-components';
import { song } from '@app/containers/ItunesContainer/types';
const { Meta } = Card;

export interface ItuneCardProps {
  songData: {
    resultCount: number;
    results: song[];
  };
  cardTitle: string;
}

const CustomRow = styled(Row)`
  background-color: antiquewhite;
  gap: 2rem;

  @media (max-width: 320px) {
    justify-content: center;
  }
`;

const H1 = styled.h1`
  font-size: 1rem;
`;

const CustomCard = styled(Card)`
  padding: 5px;
  margin: 1rem;
  width: 17rem;

  @media (max-width: 320px) {
    width: 12rem;
    margin: 0.5rem;
  }
`;

const ItuneCard = ({ songData, cardTitle }: ItuneCardProps) => {
  console.log(songData);
  const { results } = songData;
  return (
    <CustomRow>
      {results.length > 0 &&
        results.map(({ trackId, artistName, artworkUrl100, collectionName }) => (
          <CustomCard hoverable key={trackId} cover={<img src={artworkUrl100} loading="lazy" />}>
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
