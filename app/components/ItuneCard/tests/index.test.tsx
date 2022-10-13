import React from 'react';
import ItuneCard from '..';
import { Song } from '@app/containers/ItunesContainer/types';
import { fireEvent, render, screen } from '@testing-library/react';

const mockPause = jest.fn();
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: () => ({
    ref: {
      current: {
        pause: mockPause
      }
    }
  })
}));

describe('<ItuneCard />', () => {
  let submitSpy: jest.Mock;
  let song: Song;

  beforeAll(() => {
    submitSpy = jest.fn();
    song = {
      trackId: 1,
      artistName: 'Yung Xiety',
      artworkUrl100:
        'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/3b/cc/31/3bcc315a-e58f-c678-8d05-b7d62346070f/1d724fe3-daaa-4825-91f0-a47e70a438bd.jpg/100x100bb.jpg',
      collectionName: 'Arijit Singh (Mashup) - Single',
      previewUrl:
        'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/90/d6/0d/90d60d3b-2b95-8c84-f9aa-f69a2793d22c/mzaf_17815855687762407827.plus.aac.p.m4a'
    };
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = render(<ItuneCard currentTrackId={0} handleOnPlay={submitSpy} {...song} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should render and match the snapshot when song object is empty', () => {
    const song = {};
    const { baseElement } = render(<ItuneCard {...song} />);
    expect(baseElement).toMatchSnapshot();
    expect(screen.queryByRole('img')).toBe(null);
    expect(screen.queryByRole('Yung Xiety')).toBe(null);
    expect(screen.queryByRole('audio')).toBe(null);
  });

  it('should call the handleOnPlay function and play song', () => {
    const { getByTestId } = render(<ItuneCard {...song} currentTrackId={1} handleOnPlay={submitSpy} />);
    fireEvent.play(getByTestId('audio-element'));
    expect(submitSpy).toBeCalledWith(1);
  });

  it('should check that song pause when pause() is trigger', () => {
    const { getByTestId } = render(<ItuneCard {...song} currentTrackId={1} handleOnPlay={submitSpy} />);
    fireEvent.pause(getByTestId('audio-element'));
    expect(mockPause).toHaveBeenCalledTimes(0);
  });
});
