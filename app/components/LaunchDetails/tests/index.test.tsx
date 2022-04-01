import React from 'react';
import LaunchDetails from '../index';
import { renderProvider } from '@app/utils/testUtils';

describe('<LaundDetails> tests', () => {
  const launchDetails = {
    id: '1',
    loading: false,
    missionName: 'CRS-21',
    links: {
      flickrImages: ['https://farm9.staticflickr.com/8617/16789019815_f99a165dc5_o.jpg']
    },
    details: "SpaceX's 21st ISS resupply mission.",
    rocket: {
      rocketName: 'Falcon 9',
      rocketType: 'FT'
    },
    ships: [
      {
        name: 'Ship 1',
        type: 'Type 1'
      }
    ]
  };
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<LaunchDetails {...launchDetails} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should render the mission name if it is available', () => {
    const { getByTestId } = renderProvider(<LaunchDetails {...launchDetails} />);
    expect(getByTestId('mission-name')).toBeInTheDocument();
  });
  it('should render the ship name if it is available', () => {
    const { getByTestId } = renderProvider(<LaunchDetails {...launchDetails} />);
    expect(getByTestId('ship-name')).toBeInTheDocument();
  });
  it('should render the ship type if it is available', () => {
    const { getByTestId } = renderProvider(<LaunchDetails {...launchDetails} />);
    expect(getByTestId('ship-type')).toBeInTheDocument();
  });
  it('should render the rocket name if it is available', () => {
    const { getByTestId } = renderProvider(<LaunchDetails {...launchDetails} />);
    expect(getByTestId('rocket-name')).toBeInTheDocument();
  });
  it('should render the rocket type if it is available', () => {
    const { getByTestId } = renderProvider(<LaunchDetails {...launchDetails} />);
    expect(getByTestId('rocket-type')).toBeInTheDocument();
  });
  it('should render the skeleton  if loading is true', () => {
    launchDetails.loading = true;
    const { baseElement } = renderProvider(<LaunchDetails {...launchDetails} />);
    expect(baseElement.getElementsByClassName('ant-skeleton').length).toEqual(2);
  });
});
