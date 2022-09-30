import React from 'react';
import { Card, Row } from 'antd';
import styled from 'styled-components';
const { Meta } = Card;

interface LoadAbleCardProps {
  dataToShow: {
    trackId: number;
    artistName: string;
    artworkUrl100: string;
    collectionName: string;
  }[];
}

const H1 = styled.h1`
  font-size: 1rem;
`;

const CustomCard = styled(Card)`
  padding: 5px;
  margin: 1rem;
`;

const LoadAbleCard = ({ dataToShow }: LoadAbleCardProps) => {
  return (
    <Row>
      {dataToShow.map(({ trackId, artistName, artworkUrl100, collectionName }) => (
        <CustomCard hoverable style={{ width: 300 }} key={trackId} cover={<img src={artworkUrl100} />}>
          <H1>Artist Name: {artistName}</H1>
          <Meta title={collectionName} />
        </CustomCard>
      ))}
    </Row>
  );
};

export default LoadAbleCard;
