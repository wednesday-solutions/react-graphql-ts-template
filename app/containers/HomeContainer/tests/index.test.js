import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { HomeContainerTest as HomeContainer, mapDispatchToProps } from '../index';
import { homeContainerTypes } from '../reducer';

describe('<HomeContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(
      <HomeContainer dispatchLaunchList={submitSpy} dispatchClearLaunchList={jest.fn()} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearLaunchList on page reload', async () => {
    const getLaunchListSpy = jest.fn();
    const clearLaunchListSpy = jest.fn();
    renderProvider(
      <HomeContainer dispatchClearLaunchList={clearLaunchListSpy} dispatchLaunchList={getLaunchListSpy} />
    );
    await timeout(500);
    expect(clearLaunchListSpy).toBeCalled();
  });

  it('should call dispatchLaunchList on page reload', async () => {
    renderProvider(<HomeContainer dispatchLaunchList={submitSpy} dispatchClearLaunchList={jest.fn()} />);
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

    await timeout(500);
    props.dispatchClearLaunchList();
    expect(dispatchLaunchListSpy).toHaveBeenCalledWith(actions.dispatchClearLaunchList);
  });

  it('should render default error message when search goes wrong', () => {
    const defaultError = 'This is an error';
    const { getByTestId } = renderProvider(
      <HomeContainer
        launchListError={defaultError}
        dispatchClearLaunchList={jest.fn()}
        dispatchLaunchList={submitSpy}
      />
    );
    expect(getByTestId('error-message')).toBeInTheDocument();
    expect(getByTestId('error-card')).toBeInTheDocument();
    expect(getByTestId('error-message').textContent).toBe(defaultError);
  });

  it('should render the data when loading becomes false', () => {
    const launchData = {
      launches: [
        {
          missionName: 'Sample Mission',
          launchTimeLocal: 'sample time',
          links: {
            wikipedia: 'sample link'
          }
        }
      ]
    };
    const { getByTestId } = renderProvider(
      <HomeContainer launchData={launchData} dispatchLaunchList={submitSpy} dispatchClearLaunchList={jest.fn()} />
    );
    expect(getByTestId('list')).toBeInTheDocument();
  });

  it('should render Skeleton Comp when "loading" is true', async () => {
    const { baseElement } = renderProvider(
      <HomeContainer dispatchLaunchList={submitSpy} dispatchClearLaunchList={jest.fn()} loading={true} />
    );

    expect(baseElement.getElementsByClassName('ant-skeleton').length).toBe(1);
  });
});
