import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { HomeContainerProps, HomeContainerTest as HomeContainer, LaunchData, mapDispatchToProps } from '../index';
import { homeContainerTypes } from '../reducer';

describe('<HomeContainer /> tests', () => {
  let submitSpy: jest.Mock;
  let defaultProps: HomeContainerProps;

  beforeEach(() => {
    submitSpy = jest.fn();
    defaultProps = {
      loading: true,
      dispatchLaunchList: submitSpy,
      launchQuery: ''
    };
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<HomeContainer {...defaultProps} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchLaunchList on page reload', async () => {
    renderProvider(<HomeContainer {...defaultProps} />);
    await timeout(500);
    expect(submitSpy).toBeCalledWith();
  });

  it('should validate mapDispatchToProps actions', async () => {
    const dispatchLaunchListSpy = jest.fn();
    const actions = {
      dispatchLaunchList: { type: homeContainerTypes.REQUEST_GET_LAUNCH_LIST },
      dispatchClearLaunchList: { type: homeContainerTypes.CLEAR_LAUNCH_LIST }
    };

    const props = mapDispatchToProps(dispatchLaunchListSpy);
    props.dispatchLaunchList();
    expect(dispatchLaunchListSpy).toHaveBeenCalledWith(actions.dispatchLaunchList);
  });

  it('should render default error message when search goes wrong', () => {
    const defaultError = 'This is an error';
    const { getByTestId } = renderProvider(
      <HomeContainer {...defaultProps} launchListError={defaultError} loading={false} />
    );
    expect(getByTestId('error-message')).toBeInTheDocument();
    expect(getByTestId('error-card')).toBeInTheDocument();
    expect(getByTestId('error-message').textContent).toBe(defaultError);
  });

  it('should render the data when loading becomes false', () => {
    const launchData: LaunchData = {
      launches: [
        {
          missionName: 'Sample Mission',
          launchDateLocal: 'some date',
          links: {
            wikipedia: 'sample link',
            flickrImages: ['sample image']
          }
        }
      ]
    };
    const { getByTestId } = renderProvider(<HomeContainer launchData={launchData} {...defaultProps} />);
    expect(getByTestId('list')).toBeInTheDocument();
  });

  it('should render Skeleton Comp when "loading" is true', async () => {
    const { baseElement } = renderProvider(<HomeContainer {...defaultProps} loading={true} />);

    expect(baseElement.getElementsByClassName('ant-skeleton').length).toBe(1);
  });
});
