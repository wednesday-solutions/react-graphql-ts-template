import React from 'react';
import { Row } from 'antd';
import { get } from 'lodash-es';
import styled from 'styled-components';
import { Song } from '@app/containers/ItunesContainer/types';
import { colors, media } from '@app/themes';
import { For } from '../For';
import ItuneCard from '../ItuneCard';

interface ItuneSongListProps {
  songData: {
    results?: Song[];
  };
}

const CustomRow = styled(Row)`
  && {
    background-color: ${colors.cardContainerBg};
    gap: 2.5rem;

    ${media.lessThan('tablet')`
    justify-content: center;`}
  }
`;

const ItuneSongList = ({ songData }: ItuneSongListProps) => {
  const results = get(songData, 'results', []);
  return (
    <>
      <For ParentComponent={CustomRow} renderItem={(song: Song) => <ItuneCard {...song} />} of={results} />
    </>
  );
};

export default ItuneSongList;
