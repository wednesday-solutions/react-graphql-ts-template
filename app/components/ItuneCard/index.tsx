import React, { useRef, useEffect } from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { media } from '@app/themes';
import If from '../If';

const { Meta } = Card;

export interface ItuneCardProps {
  trackId: number;
  artistName: string;
  artworkUrl100: string;
  collectionName: string;
  previewUrl: string;
  currentTrackId: number;
  setCurrentTrackId: (number: any) => any;
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

const StyledAudio = styled.audio`
  && {
    width: 100%;
    padding: 5px;
  }
`;

const StyledMeta = styled(Meta)`
  && {
    padding: 5px;
  }
`;

const ItuneCard = ({
  trackId,
  artistName,
  artworkUrl100,
  collectionName,
  previewUrl,
  currentTrackId,
  setCurrentTrackId
}: ItuneCardProps) => {
  const audioRef = useRef(new Audio(previewUrl));

  useEffect(() => {
    if (currentTrackId === trackId) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [currentTrackId]);
  return (
    <If condition={trackId}>
      <CustomCard
        hoverable
        key={trackId}
        bodyStyle={{ padding: '10px' }}
        cover={<StyledImg src={artworkUrl100} loading="lazy" data-testid="cover-img" />}
      >
        <StyledMeta title={artistName} description={collectionName} />
        <StyledAudio onPlay={() => setCurrentTrackId(trackId)} ref={audioRef} controls src={previewUrl}>
          <a href={previewUrl}>Audio Preview</a>
        </StyledAudio>
      </CustomCard>
    </If>
  );
};

export default ItuneCard;
