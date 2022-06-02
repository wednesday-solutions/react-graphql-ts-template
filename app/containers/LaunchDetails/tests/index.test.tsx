/**
 *
 * Tests for LaunchDetails
 *
 *
 */

import React from 'react';
import { renderProvider, timeout } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import { LaunchDetailsTest as LaunchDetails, mapDispatchToProps } from '..';
import { LaunchDetailsProps } from '../types';
import history from '@app/utils/history';
import { requestGetLaunch } from '../reducer';

describe('<LaunchDetails /> container tests', () => {
  let submitSpy: jest.Mock;
  let defaultProps: LaunchDetailsProps;

  beforeEach(() => {
    submitSpy = jest.fn();
    defaultProps = {
      loading: false,
      launch: null,
      dispatchLaunch: submitSpy
    };
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<LaunchDetails {...defaultProps} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchLaunch if launchId param is present', async () => {
    history.location.pathname = '/1';
    renderProvider(<LaunchDetails {...defaultProps} />, { path: '/:launchId' });
    await timeout(500);
    expect(submitSpy).toBeCalledWith('1');
  });

  it('should mapDispatchToProps works as expected', () => {
    const dispatchSpy = jest.fn();
    const props = mapDispatchToProps(dispatchSpy);
    props.dispatchLaunch('1');
    expect(dispatchSpy).toBeCalledWith(requestGetLaunch('1'));
  });
  it('should not render the launchDetails if there is no data', () => {
    const { getByTestId } = renderProvider(<LaunchDetails {...defaultProps} />);
    expect(() => getByTestId('launch-details')).toThrowError();
  });
  it('should  render the launchDetails if there is data', () => {
    const props = {
      loading: false,
      launch: {
        id: '1',
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
      },
      dispatchLaunch: submitSpy
    };

    const { getByTestId } = renderProvider(<LaunchDetails {...props} />);

    expect(getByTestId('launch-details')).toBeInTheDocument();
  });
});
