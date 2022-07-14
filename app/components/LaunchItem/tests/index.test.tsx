import React from 'react';
import { Launch } from '@app/containers/HomeContainer/types';
import { renderProvider } from '@app/utils/testUtils';
import LaunchItem from '..';
import { fireEvent } from '@testing-library/react';
import history from '@app/utils/history';

describe('<LaunchItem />', () => {
  let launch: Launch;

  beforeAll(() => {
    launch = {
      id: '1',
      launchDateUtc: '2014-01-06T18:06:00',
      launchDateUnix: 123123123,
      missionName: 'Thaicom 6',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Thaicom_6',
        flickrImages: ['https://farm9.staticflickr.com/8617/16789019815_f99a165dc5_o.jpg']
      }
    };
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<LaunchItem {...launch} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should take us to launch details page if clicked on it', () => {
    const { getByTestId } = renderProvider(<LaunchItem {...launch} />);
    fireEvent.click(getByTestId('launch-item'));
    expect(history.location.pathname).toBe(`/launch/${launch.id}`);
  });

  it('should stopPropagation when clicked on link', () => {
    const prevHistoryLength = history.length;
    const { getByTestId } = renderProvider(<LaunchItem {...launch} />);
    fireEvent.click(getByTestId('wiki-link'));
    expect(history.length).toBe(prevHistoryLength);
  });
});
