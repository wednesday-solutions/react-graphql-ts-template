import React from 'react';
import { renderProvider, timeout } from '@utils/testUtils';
import { HomeContainerTest as HomeContainer, mapDispatchToProps } from '../index';
import { HomeContainerProps, LaunchData } from '../types';
import { fireEvent, waitFor } from '@testing-library/react';
import { createIntl } from 'react-intl';
import { translationMessages } from '@app/i18n';
import history from '@app/utils/history';
import { requestGetLaunchList } from '../reducer';
import { LAUNCHES } from './mockData';

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
      launches: LAUNCHES
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
