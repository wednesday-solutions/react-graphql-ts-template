/**
 *
 * Tests for ErrorHandler
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import ErrorHandler from '../index';

describe('<ErrorHandler />', () => {
  const loading = false;
  const launchListError = 'something_went_wrong';

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<ErrorHandler loading={loading} launchListError={launchListError} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 ErrorHandler component if there is error present', () => {
    const { getAllByTestId } = renderWithIntl(<ErrorHandler loading={loading} launchListError={launchListError} />);
    expect(getAllByTestId('error-message').length).toBe(1);
  });
  it('should not show error when the page is loading', () => {
    const { getAllByTestId } = renderWithIntl(<ErrorHandler loading={true} launchListError={launchListError} />);
    expect(() => getAllByTestId('error-message')).toThrowError();
  });
});
