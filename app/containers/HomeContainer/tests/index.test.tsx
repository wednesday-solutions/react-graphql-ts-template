import React from 'react';
import { renderProvider, timeout } from '@utils/testUtils';
import { HomeContainerTest as HomeContainer, mapDispatchToProps } from '../index';
import { HomeContainerProps, LaunchData } from '../types';
import { fireEvent, waitFor } from '@testing-library/react';
import { createIntl } from 'react-intl';
import { translationMessages } from '@app/i18n';
import history from '@app/utils/history';
import { requestGetLaunchList } from '../reducer';

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
      launchData: {}
    };
    launchData = {
      launches: [
        {
          id: '1',
          missionName: 'Thaicom 6',
          links: {
            flickrImages: ['image1', 'image2'],
            wikipedia: 'https://en.wikipedia.org/wiki/Thaicom_6'
          },
          launchDateUtc: '2014-01-06T14:06:00-04:00',
          launchDateUnix: 1389031560
        },
        {
          id: '1',
          missionName: 'AsiaSat 6',
          links: {
            flickrImages: ['image1', 'image2'],
            wikipedia: 'https://en.wikipedia.org/wiki/AsiaSat_6'
          },
          launchDateUtc: '2014-09-07T01:00:00-04:00',
          launchDateUnix: 1410066000
        },
        {
          id: '1',
          missionName: 'OG-2 Mission 2',
          links: {
            flickrImages: ['image1', 'image2'],
            wikipedia: 'https://en.wikipedia.org/wiki/Falcon_9_flight_20'
          },
          launchDateUtc: '2015-12-22T21:29:00-04:00',
          launchDateUnix: 1450747740
        },
        {
          id: '1',
          missionName: 'FalconSat',
          links: {
            flickrImages: ['image1', 'image2'],
            wikipedia: 'https://en.wikipedia.org/wiki/DemoSat'
          },
          launchDateUtc: '2006-03-25T10:30:00+12:00',
          launchDateUnix: 1143239400
        },
        {
          id: '1',
          missionName: 'CRS-1',
          links: {
            flickrImages: ['image1', 'image2'],
            wikipedia: 'https://en.wikipedia.org/wiki/SpaceX_CRS-1'
          },
          launchDateUtc: '2012-10-08T20:35:00-04:00',
          launchDateUnix: 1349656500
        },
        {
          id: '1',
          missionName: 'CASSIOPE',
          links: {
            flickrImages: ['image1', 'image2'],
            wikipedia: 'https://en.wikipedia.org/wiki/CASSIOPE'
          },
          launchDateUtc: '2013-09-29T09:00:00-07:00',
          launchDateUnix: 1380470400
        },
        {
          id: '1',
          missionName: 'ABS-3A / Eutelsat 115W B',
          links: {
            flickrImages: ['image1', 'image2'],
            wikipedia: 'https://en.wikipedia.org/wiki/ABS-3A'
          },
          launchDateUtc: '2015-03-02T23:50:00-04:00',
          launchDateUnix: 1425268200
        },
        {
          id: '1',
          missionName: 'COTS 1',
          links: {
            flickrImages: ['image1', 'image2'],
            wikipedia: 'https://en.wikipedia.org/wiki/SpaceX_COTS_Demo_Flight_1'
          },
          launchDateUtc: '2010-12-08T11:43:00-04:00',
          launchDateUnix: 1291822980
        },
        {
          id: '1',
          missionName: 'TürkmenÄlem 52°E / MonacoSAT',
          links: {
            flickrImages: ['image1', 'image2'],
            wikipedia: 'https://en.wikipedia.org/wiki/T%C3%BCrkmen%C3%84lem_52%C2%B0E_/_MonacoSAT'
          },
          launchDateUtc: '2015-04-27T19:03:00-04:00',
          launchDateUnix: 1430175780
        },
        {
          id: '1',
          missionName: 'CRS-11',
          links: {
            flickrImages: ['image1', 'image2'],
            wikipedia: 'https://en.wikipedia.org/wiki/SpaceX_CRS-11'
          },
          launchDateUtc: '2017-06-03T17:07:00-04:00',
          launchDateUnix: 1496524020
        },
        {
          id: '1',
          missionName: 'Iridium NEXT Mission 1',
          links: {
            flickrImages: ['image1', 'image2'],
            wikipedia: 'https://en.wikipedia.org/wiki/Iridium_satellite_constellation#Next-generation_constellation'
          },
          launchDateUtc: '2017-01-14T10:54:00-07:00',
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
    await waitFor(() => expect(submitSpy).toBeCalled());
  });

  it('should validate mapDispatchToProps actions', () => {
    const dispatchLaunchListSpy = jest.fn();
    const payload = {
      missionName: null,
      order: null,
      page: 1
    };
    const actions = {
      dispatchLaunchList: requestGetLaunchList(payload)
    };

    const props = mapDispatchToProps(dispatchLaunchListSpy);
    props.dispatchLaunchList(payload);
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
          id: '1',
          missionName: 'Sample Mission',
          launchDateUtc: '2017-01-14T10:54:00-07:00',
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

  it('should delete mission_name query param from search on empty change', async () => {
    const { getByTestId } = renderProvider(
      <HomeContainer {...defaultProps} dispatchLaunchList={submitSpy} loading={false} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await waitFor(() => expect(history.location.search).toContain('mission_name=a'));
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await waitFor(() => expect(history.location.search).not.toContain('mission='));
  });

  it('should  dispatchLaunchList on update on mount if there is no launchQuery and no data already persisted', async () => {
    renderProvider(<HomeContainer {...defaultProps} launchData={{}} />);
    await waitFor(() => expect(submitSpy).toBeCalled());
  });

  it('should sort the launches by date in ASC', async () => {
    history.location.search = '?order=unknown';
    const { getByText, getByRole } = renderProvider(
      <HomeContainer {...defaultProps} launchData={launchData} loading={false} />
    );
    fireEvent.mouseDown(getByRole('combobox')!);
    fireEvent.click(getByText('ASC'));
    await waitFor(() => expect(history.location.search).toContain('order=asc'));
  });

  it('should sort the launches by date in DESC', async () => {
    const { getByText, getByRole } = renderProvider(
      <HomeContainer {...defaultProps} launchData={launchData} loading={false} />
    );
    fireEvent.mouseDown(getByRole('combobox')!);
    fireEvent.click(getByText('DESC'));
    await waitFor(() => expect(history.location.search).toContain('order=desc'));
  });

  it('should push to first page if no data found in the current page', async () => {
    history.location.search = '?page=3';
    const { rerender } = renderProvider(
      <HomeContainer {...defaultProps} launchData={{ launches: [] }} loading={false} />
    );
    await waitFor(() => expect(history.location.search).toContain('page=1'));
    renderProvider(<HomeContainer {...defaultProps} launchData={launchData} loading={false} />, {}, rerender as any);
    await waitFor(() => timeout(500));
    expect(history.location.search).toContain('page=1');
  });

  it('should push the user to next page when clicked on NEXT button', () => {
    history.location.search = '?page=1';
    const { getByTestId } = renderProvider(<HomeContainer {...defaultProps} loading={false} launchData={launchData} />);
    fireEvent.click(getByTestId('next-btn'));
    expect(history.location.search).toContain('page=2');
  });

  it('should push the user to prev page when clicked on PREV button', () => {
    history.location.search = '?page=2';
    const { getByTestId } = renderProvider(<HomeContainer {...defaultProps} loading={false} launchData={launchData} />);
    fireEvent.click(getByTestId('prev-btn'));
    expect(history.location.search).toContain('page=1');
  });

  it('should clear sort when clicked on clear sort button', async () => {
    const { getByText, getByRole, getByTestId, rerender } = renderProvider(
      <HomeContainer {...defaultProps} launchData={launchData} loading={false} />
    );
    fireEvent.mouseDown(getByRole('combobox')!);
    fireEvent.click(getByText('DESC'));
    await waitFor(() => {
      renderProvider(<HomeContainer {...defaultProps} launchData={launchData} loading={false} />, {}, rerender as any);
    });
    fireEvent.click(getByTestId('clear-sort'));
    expect(history.location.search).not.toContain('order=desc');
  });
});
