import React from 'react';
import ItuneCard from '..';
import { Song } from '@app/containers/ItunesContainer/types';
import { render, screen } from '@testing-library/react';

describe('<ItuneCard />', () => {
  let song: Song;

  beforeAll(() => {
    song = {
      trackId: 1,
      artistName: 'Yung Xiety',
      artworkUrl100:
        'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/3b/cc/31/3bcc315a-e58f-c678-8d05-b7d62346070f/1d724fe3-daaa-4825-91f0-a47e70a438bd.jpg/100x100bb.jpg',
      collectionName: 'Arijit Singh (Mashup) - Single'
    };
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = render(<ItuneCard {...song} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should render and match the snapshot when song object is empty', () => {
    const song = {};
    const { baseElement } = render(<ItuneCard {...song} />);
    expect(baseElement).toMatchSnapshot();
    expect(screen.queryByRole('img')).toBe(null);
    expect(screen.queryByRole('Yung Xiety')).toBe(null);
  });
});
