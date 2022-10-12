import React, { useCallback, useState } from 'react';
import { Card, Row, Skeleton } from 'antd';
import { get, isEmpty } from 'lodash-es';
import styled from 'styled-components';
import { Song } from '@app/containers/ItunesContainer/types';
import { colors, media } from '@app/themes';
import ItuneCard from '../ItuneCard';
import If from '../If';
import { T } from '../T';
import For from '../For';

interface ItuneSongListProps {
  songData: {
    results?: Song[];
  };
  loading: boolean;
}

const CustomRow = styled(Row)`
  && {
    background-color: ${colors.cardContainerBg};
    gap: 2.5rem;

    ${media.lessThan('tablet')`
    justify-content: center;`}
  }
`;

const CustomError = styled(Card)`
  && {
    color: ${colors.secondary};
    margin: 2rem;
    width: 
    background-color: ${colors.secondaryText};
    display: flex;
    justify-content: center;
  }
`;

const ItuneSongList = ({ songData, loading }: ItuneSongListProps) => {
  const [currentTrackId, setCurrentTrackId] = useState(0);
  const results = get(songData, 'results', []);
  const handleOnPlay = useCallback((trackId) => setCurrentTrackId(trackId), [currentTrackId]);
  return (
    <If
      condition={!isEmpty(results)}
      otherwise={
        <CustomError>
          <T data-testid="default-message" id="fallback" />
        </CustomError>
      }
    >
      <Skeleton loading={loading} active>
        <For
          ParentComponent={CustomRow}
          renderItem={(song: Song) => (
            <ItuneCard {...song} currentTrackId={currentTrackId} handleOnPlay={handleOnPlay} />
          )}
          of={results}
          noParent={false}
        />
      </Skeleton>
    </If>
  );
};

export default ItuneSongList;
