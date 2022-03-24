import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { HomeContainerTest as HomeContainer, mapDispatchToProps } from '../index';
import { homeContainerTypes } from '../reducer';
import { fireEvent } from '@testing-library/dom';

describe('<HomeContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<HomeContainer dispatchLaunchList={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });
  it('should validate mapDispatchToProps actions', async () => {
    const dispatchLaunchListSpy = jest.fn();
    const actions = {
      dispatchLaunchList: { type: homeContainerTypes.REQUEST_GET_LAUNCH_LIST }
    };

    const props = mapDispatchToProps(dispatchLaunchListSpy);
    props.dispatchLaunchList();
    expect(dispatchLaunchListSpy).toHaveBeenCalledWith(actions.dispatchLaunchList);
  });

  it('should render default error message when search goes wrong', () => {
    const defaultError = 'This is an error';
    const { getByTestId } = renderProvider(
      <HomeContainer launchListError={defaultError} dispatchLaunchList={submitSpy} />
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
    const { getByTestId } = renderProvider(<HomeContainer launchData={launchData} dispatchLaunchList={submitSpy} />);
    expect(getByTestId('list')).toBeInTheDocument();
  });

  it('should render Skeleton Comp when "loading" is true', async () => {
    const { baseElement } = renderProvider(<HomeContainer dispatchLaunchList={submitSpy} loading={true} />);
    expect(baseElement.getElementsByClassName('ant-skeleton').length).toBe(1);
  });

  it('should call dispatchGetLaunchList on empty change', async () => {
    const { getByTestId } = renderProvider(<HomeContainer dispatchLaunchList={submitSpy} loading={false} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalledWith('a');
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
  it('should  dispatchLaunchList on update on mount if there is no launchQuery and no data already persisted', async () => {
    renderProvider(<HomeContainer launchQuery={null} launchData={null} dispatchLaunchList={submitSpy} />);
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
