import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import {
  HomeContainerProps,
  HomeContainerTest as HomeContainer,
  LaunchData,
  LAUNCH_PER_PAGE,
  mapDispatchToProps
} from '../index';
import { homeContainerTypes } from '../reducer';
import { fireEvent } from 'react-testing-library';
import { createIntl } from 'react-intl';
import { translationMessages } from '@app/i18n';
import history from '@app/utils/history';

describe('<HomeContainer /> tests', () => {
  let submitSpy: jest.Mock;
  let defaultProps: HomeContainerProps;
  let launchData: LaunchData;

  beforeEach(() => {
    submitSpy = jest.fn();
    defaultProps = {
      intl: createIntl({ locale: 'en', messages: translationMessages.en }),
      loading: true,
      dispatchLaunchList: submitSpy,
      launchQuery: '',
      launchData: {}
    };
    launchData = {
      launches: [
        {
          missionName: 'Thaicom 6',
          links: {
            flickrImages: ['image1', 'image2'],
            wikipedia: 'https://en.wikipedia.org/wiki/Thaicom_6'
          },
          launchDateLocal: '2014-01-06T14:06:00-04:00',
          launchDateUnix: 1389031560
        },
        {
          missionName: 'AsiaSat 6',
          links: {
            flickrImages: ['image1', 'image2'],
            wikipedia: 'https://en.wikipedia.org/wiki/AsiaSat_6'
          },
          launchDateLocal: '2014-09-07T01:00:00-04:00',
          launchDateUnix: 1410066000
        },
        {
          missionName: 'OG-2 Mission 2',
          links: {
            flickrImages: ['image1', 'image2'],
            wikipedia: 'https://en.wikipedia.org/wiki/Falcon_9_flight_20'
          },
          launchDateLocal: '2015-12-22T21:29:00-04:00',
          launchDateUnix: 1450747740
        },
        {
          missionName: 'FalconSat',
          links: {
            flickrImages: ['image1', 'image2'],
            wikipedia: 'https://en.wikipedia.org/wiki/DemoSat'
          },
          launchDateLocal: '2006-03-25T10:30:00+12:00',
          launchDateUnix: 1143239400
        },
        {
          missionName: 'CRS-1',
          links: {
            flickrImages: ['image1', 'image2'],
            wikipedia: 'https://en.wikipedia.org/wiki/SpaceX_CRS-1'
          },
          launchDateLocal: '2012-10-08T20:35:00-04:00',
          launchDateUnix: 1349656500
        },
        {
          missionName: 'CASSIOPE',
          links: {
            flickrImages: ['image1', 'image2'],
            wikipedia: 'https://en.wikipedia.org/wiki/CASSIOPE'
          },
          launchDateLocal: '2013-09-29T09:00:00-07:00',
          launchDateUnix: 1380470400
        },
        {
          missionName: 'ABS-3A / Eutelsat 115W B',
          links: {
            flickrImages: ['image1', 'image2'],
            wikipedia: 'https://en.wikipedia.org/wiki/ABS-3A'
          },
          launchDateLocal: '2015-03-02T23:50:00-04:00',
          launchDateUnix: 1425268200
        },
        {
          missionName: 'COTS 1',
          links: {
            flickrImages: ['image1', 'image2'],
            wikipedia: 'https://en.wikipedia.org/wiki/SpaceX_COTS_Demo_Flight_1'
          },
          launchDateLocal: '2010-12-08T11:43:00-04:00',
          launchDateUnix: 1291822980
        },
        {
          missionName: 'TürkmenÄlem 52°E / MonacoSAT',
          links: {
            flickrImages: ['image1', 'image2'],
            wikipedia: 'https://en.wikipedia.org/wiki/T%C3%BCrkmen%C3%84lem_52%C2%B0E_/_MonacoSAT'
          },
          launchDateLocal: '2015-04-27T19:03:00-04:00',
          launchDateUnix: 1430175780
        },
        {
          missionName: 'CRS-11',
          links: {
            flickrImages: ['image1', 'image2'],
            wikipedia: 'https://en.wikipedia.org/wiki/SpaceX_CRS-11'
          },
          launchDateLocal: '2017-06-03T17:07:00-04:00',
          launchDateUnix: 1496524020
        },
        {
          missionName: 'Iridium NEXT Mission 1',
          links: {
            flickrImages: ['image1', 'image2'],
            wikipedia: 'https://en.wikipedia.org/wiki/Iridium_satellite_constellation#Next-generation_constellation'
          },
          launchDateLocal: '2017-01-14T10:54:00-07:00',
          launchDateUnix: 1484416440
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

  it('should render the data when loading becomes false', async () => {
    const launchData: LaunchData = {
      launches: [
        {
          missionName: 'Sample Mission',
          launchDateLocal: 'some date',
          launchDateUnix: 12312313,
          links: {
            wikipedia: 'sample link',
            flickrImages: ['sample image']
          }
        }
      ]
    };
    const { getByText } = renderProvider(<HomeContainer {...defaultProps} loading={false} launchData={launchData} />);
    expect(getByText('Sample Mission'));
  });

  it('should render Skeleton Comp when "loading" is true', async () => {
    const { baseElement } = renderProvider(<HomeContainer {...defaultProps} loading={true} />);

    expect(baseElement.getElementsByClassName('ant-skeleton').length).toBe(1);
  });

  it('should call dispatchGetLaunchList on empty change', async () => {
    const { getByTestId } = renderProvider(
      <HomeContainer {...defaultProps} dispatchLaunchList={submitSpy} loading={false} />
    );
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
    renderProvider(<HomeContainer {...defaultProps} launchData={{}} />);
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });

  it('should sort the launches by date in ASC', async () => {
    const { getByText, getByRole, rerender, getAllByTestId } = renderProvider(
      <HomeContainer {...defaultProps} launchData={launchData} loading={false} />
    );
    fireEvent.mouseDown(getByRole('combobox')!);
    fireEvent.click(getByText('ASC'));
    expect(history.location.search).toContain('sort=asc');
    renderProvider(
      <HomeContainer {...defaultProps} launchData={launchData} loading={false} />,
      history,
      rerender as any
    );
    await timeout(500);
    const ascMissions = launchData!
      .launches!.sort((a, b) => a.launchDateUnix - b.launchDateUnix)
      .slice(0, LAUNCH_PER_PAGE)
      .map((l) => l.missionName);
    const missionsInDom = getAllByTestId('mission-name').map((mission) => mission.textContent);
    expect(ascMissions).toEqual(missionsInDom);
  });

  it('should sort the launches by date in DESC', async () => {
    const { getByText, getByRole, rerender, getAllByTestId } = renderProvider(
      <HomeContainer {...defaultProps} launchData={launchData} loading={false} />
    );
    fireEvent.mouseDown(getByRole('combobox')!);
    fireEvent.click(getByText('DESC'));
    expect(history.location.search).toContain('sort=desc');
    renderProvider(
      <HomeContainer {...defaultProps} launchData={launchData} loading={false} />,
      history,
      rerender as any
    );
    const descMissions = launchData!
      .launches!.sort((a, b) => b.launchDateUnix - a.launchDateUnix)
      .slice(0, LAUNCH_PER_PAGE)
      .map((l) => l.missionName);
    const missionsInDom = getAllByTestId('mission-name').map((mission) => mission.textContent);
    expect(descMissions).toEqual(missionsInDom);
  });

  it('should push the user to next page when clicked on next button', () => {
    const { getByTestId } = renderProvider(<HomeContainer {...defaultProps} loading={false} launchData={launchData} />);
    fireEvent.click(getByTestId('next-btn'));
    expect(history.location.search).toContain('page=2');
  });

  it('should push the user to prev page when clicked on prev button', () => {
    history.location.search = '?page=2';
    const { getByTestId } = renderProvider(<HomeContainer {...defaultProps} loading={false} launchData={launchData} />);
    fireEvent.click(getByTestId('prev-btn'));
    expect(history.location.search).toContain('page=1');
  });

  it('should clear sort when clicked on clear sort', () => {
    const { getByText, getByRole, getByTestId, getAllByTestId } = renderProvider(
      <HomeContainer {...defaultProps} launchData={launchData} loading={false} />
    );
    fireEvent.mouseDown(getByRole('combobox')!);
    fireEvent.click(getByText('DESC'));
    fireEvent.click(getByTestId('clear-sort'));
    const missionsInDom = getAllByTestId('mission-name').map((mission) => mission.textContent);
    const nonSortedMissions = launchData!.launches!.slice(0, LAUNCH_PER_PAGE).map((l) => l.missionName);
    expect(missionsInDom).toEqual(nonSortedMissions);
  });
});
