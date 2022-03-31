/**
 *
 * Tests for LaunchDetails
 *
 *
 */

import React from 'react';
import { renderProvider, timeout } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import { LaunchDetailsProps, LaunchDetailsTest as LaunchDetails, mapDispatchToProps } from '..';
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
});
