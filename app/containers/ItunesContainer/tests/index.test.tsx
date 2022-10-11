import React from 'react';
import { renderProvider } from '@app/utils/testUtils';
import { ItunesContainerTest as ItunesContainer, mapDispatchToProps } from '..';
import { requestGetSongList } from '../reducer';
import { ItuneContainerProps } from '../types';

describe('<ItuneContainer /> test', () => {
  let submitSpy: jest.Mock;
  let defaultProps: ItuneContainerProps;

  beforeEach(() => {
    submitSpy = jest.fn();
    defaultProps = {
      dispatchArtistName: submitSpy,
      loading: true,
      songData: {
        results: [
          {
            trackId: 1,
            artistName: 'Yung Xiety',
            artworkUrl100:
              'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/3b/cc/31/3bcc315a-e58f-c678-8d05-b7d62346070f/1d724fe3-daaa-4825-91f0-a47e70a438bd.jpg/100x100bb.jpg',
            collectionName: 'Arijit Singh (Mashup) - Single'
          }
        ]
      }
    };
  });

  it('should render and match the snapshot', () => {
    const { baseElement, getByTestId } = renderProvider(<ItunesContainer {...defaultProps} />);
    expect(baseElement).toMatchSnapshot();
    expect(getByTestId('search-label')).toBeInTheDocument();
  });

  it('should call the dispatchArtistName onChange', () => {
    const dispatchArtistNameSpy = jest.fn();
    const artistName = 'Arijit Singh';
    const action = {
      dispatchArtistName: requestGetSongList(artistName)
    };
    const props = mapDispatchToProps(dispatchArtistNameSpy);
    props.dispatchArtistName(artistName);
    expect(dispatchArtistNameSpy).toHaveBeenCalledWith(action.dispatchArtistName);
  });
});
