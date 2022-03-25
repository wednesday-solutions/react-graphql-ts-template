/**
 *
 * Tests for LaunchList
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import LaunchList from '../index';

describe('<LaunchList />', () => {
  const loading = false;
  const launchData = {
    launches: [
      {
        launch_date_local: '2014-01-06T14:06:00-04:00',
        mission_name: 'Thaicom 6',
        links: {
          wikipedia: 'https://en.wikipedia.org/wiki/Thaicom_6',
          flickr_images: ['https://farm9.staticflickr.com/8617/16789019815_f99a165dc5_o.jpg']
        }
      }
    ]
  };
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<LaunchList loading={loading} launchData={launchData} />);
    expect(baseElement).toMatchSnapshot();
  });
  it('should show the fallbackMessage if the  ', () => {
    const message = 'No results found for the search term.';
    const { getByText } = renderWithIntl(<LaunchList loading={loading} launchData={null} />);
    expect(getByText(message)).toBeInTheDocument();
  });
  it('should render the list for the launches when data is available', () => {
    const { getByText } = renderWithIntl(<LaunchList loading={loading} launchData={launchData} />);
    expect(getByText('Thaicom 6')).toBeInTheDocument();
  });
});
