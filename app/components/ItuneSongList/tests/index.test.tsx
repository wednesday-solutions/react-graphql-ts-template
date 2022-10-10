import React from 'react';
import ItuneSongList from '..';
import { SongData } from '@app/containers/ItunesContainer/types';
import { render } from '@testing-library/react';
import { renderWithIntl } from '@app/utils/testUtils';

describe('<ItuneSongList/> ', () => {
  const songData: SongData = {
    results: [
      {
        trackId: 1,
        artistName: 'Yung Xiety',
        artworkUrl100:
          'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/3b/cc/31/3bcc315a-e58f-c678-8d05-b7d62346070f/1d724fe3-daaa-4825-91f0-a47e70a438bd.jpg/100x100bb.jpg',
        collectionName: 'Arijit Singh (Mashup) - Single'
      }
    ]
  };

  it('should render and match the snapshot', () => {
    const { baseElement } = render(<ItuneSongList songData={songData} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should show the fallbackMessage if the songData is empty', () => {
    const defaultMessage = 'No results found for the search term.';
    const { getByTestId } = renderWithIntl(<ItuneSongList songData={{}} />);
    expect(getByTestId('default-message')).toBeInTheDocument();
    expect(getByTestId('default-message').textContent).toBe(defaultMessage);
  });

  it('should render the list for the song when the data is available', () => {
    const { getByTestId } = render(<ItuneSongList songData={songData} />);
    expect(getByTestId('artist-name')).toBeInTheDocument();
  });
});
