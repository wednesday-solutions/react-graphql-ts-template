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
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<LaunchList loading={false} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should render the launches', () => {
    const launchData = {
      launches: [
        {
          missionName: 'mission impossible',
          launchDateLocal: 'some date',
          links: { flickrImages: ['tom-cruse.png'], wikipedia: 'https://wikipedia.com/tom_cruse' }
        }
      ]
    };
    const { getByText } = renderWithIntl(<LaunchList loading={false} launchData={launchData} />);
    expect(getByText(launchData.launches[0].missionName)).toBeInTheDocument();
  });
});
