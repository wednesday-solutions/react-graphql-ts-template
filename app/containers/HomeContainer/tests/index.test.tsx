import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { HomeContainerProps, HomeContainerTest as HomeContainer, LaunchData, mapDispatchToProps } from '../index';
import { homeContainerTypes } from '../reducer';
import { fireEvent } from 'react-testing-library';

describe('<HomeContainer /> tests', () => {
  let submitSpy: jest.Mock;
  let defaultProps: HomeContainerProps;
  let launchData: LaunchData;

  beforeEach(() => {
    submitSpy = jest.fn();
    defaultProps = {
      loading: true,
      dispatchLaunchList: submitSpy,
      launchQuery: ''
    };
    launchData = {
      launches: [
        {
          missionName: 'Mission 1',
          launchDateLocal: '2020-10-20',
          links: {
            flickrImages: ['image1'],
            wikipedia: 'some wiki'
          }
        },
        {
          missionName: 'Mission 2',
          launchDateLocal: '2021-11-20',
          links: {
            flickrImages: ['image1'],
            wikipedia: 'some wiki'
          }
        },
        {
          missionName: 'Mission 3',
          launchDateLocal: '2000-10-20',
          links: {
            flickrImages: ['image1'],
            wikipedia: 'some wiki'
          }
        },
        {
          missionName: 'Mission 4',
          launchDateLocal: '1991-10-20',
          links: {
            flickrImages: ['image1'],
            wikipedia: 'some wiki'
          }
        }
      ]
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

  it('should validate mapDispatchToProps actions', () => {
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

  it('should sort the launches by date in ASC', async () => {
    const { getByText, getByRole, getAllByTestId } = renderProvider(
      <HomeContainer {...defaultProps} launchData={launchData} loading={false} />
    );
    fireEvent.mouseDown(getByRole('combobox')!);
    fireEvent.click(getByText('ASC'));
    await timeout(500);
    const ascMissions = launchData!
      .launches!.sort((a, b) => +new Date(a.launchDateLocal) - +new Date(b.launchDateLocal))
      .map((l) => l.missionName);
    const missionsInDom = getAllByTestId('mission-name').map((mission) => mission.textContent);
    expect(ascMissions).toEqual(missionsInDom);
  });

  it('should sort the launches by date in DESC', async () => {
    const { getByText, getByRole, getAllByTestId } = renderProvider(
      <HomeContainer {...defaultProps} launchData={launchData} loading={false} />
    );
    fireEvent.mouseDown(getByRole('combobox')!);
    fireEvent.click(getByText('DESC'));
    await timeout(500);
    const ascMissions = launchData!
      .launches!.sort((a, b) => +new Date(b.launchDateLocal) - +new Date(a.launchDateLocal))
      .map((l) => l.missionName);
    const missionsInDom = getAllByTestId('mission-name').map((mission) => mission.textContent);
    expect(ascMissions).toEqual(missionsInDom);
  });
});
