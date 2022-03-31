import React from 'react';
import { Launch } from '@app/containers/HomeContainer';
import { renderProvider } from '@app/utils/testUtils';
import LaunchItem from '..';
import { fireEvent } from 'react-testing-library';
import history from '@app/utils/history';

describe('<LaunchItem />', () => {
  let launch: Launch;

  beforeAll(() => {
    launch = {
      id: '1',
      launchDateLocal: '2014-01-06T14:06:00-04:00',
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
    expect(history.location.pathname).toBe(`/${launch.id}`);
  });

  it('should open window for corresponding wiki page with stopPropagation ', () => {
    history.location.pathname = '/some-path';
    const { baseElement } = renderProvider(<LaunchItem {...launch} />);
    const aTags = baseElement.getElementsByTagName('a');
    let wikiLink: HTMLAnchorElement | undefined;

    for (let i = 0; i < aTags.length; i++) {
      if (aTags[i].href === launch.links.wikipedia) {
        wikiLink = aTags[i];
      }
    }
    if (wikiLink) {
      fireEvent.click(wikiLink);
      expect(history.location.pathname).toBe('/some-path');
    }
  });
});
