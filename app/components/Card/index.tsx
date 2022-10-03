import React from 'react';
import { Card, Row } from 'antd';
import styled from 'styled-components';
import { Song } from '@app/containers/ItuensContainer/types';
const { Meta } = Card;

export interface LoadAbleCardProps {
  dataToShow: Song[];
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

const LoadAbleCard = ({ dataToShow }: LoadAbleCardProps) => {
  return (
    <CustomRow>
      {dataToShow.map(({ trackId, artistName, artworkUrl100, collectionName }) => (
        <CustomCard hoverable key={trackId} cover={<img src={artworkUrl100} loading="lazy" />}>
          <H1>Artist Name: {artistName}</H1>
          <Meta title={collectionName} />
        </CustomCard>
      ))}
    </CustomRow>
  );
};

export default LoadAbleCard;
