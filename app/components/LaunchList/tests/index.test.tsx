/**
 *
 * Tests for LaunchList
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
import LaunchList from '../index';
import { LaunchData } from '@app/containers/HomeContainer/types';

describe('<LaunchList />', () => {
  const loading = false;
  const launchData: LaunchData = {
    launches: [
      {
        id: '1',
        launchDateUtc: '2014-01-06T18:06:00',
        launchDateUnix: 123123123,
        missionName: 'Thaicom 6',
        links: {
          wikipedia: 'https://en.wikipedia.org/wiki/Thaicom_6',
          flickrImages: ['https://farm9.staticflickr.com/8617/16789019815_f99a165dc5_o.jpg']
        }
      }
    ]
  };
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<LaunchList loading={loading} launchData={launchData} />);
    expect(baseElement).toMatchSnapshot();
  });
  it('should show the fallbackMessage if luanchData is empty', () => {
    const message = 'No results found for the search term.';
    const { getByText } = renderProvider(<LaunchList loading={loading} launchData={{}} />);
    expect(getByText(message)).toBeInTheDocument();
  });
  it('should render the list for the launches when data is available', () => {
    const { getByText } = renderProvider(<LaunchList loading={loading} launchData={launchData} />);
    expect(getByText('Thaicom 6')).toBeInTheDocument();
  });
});
