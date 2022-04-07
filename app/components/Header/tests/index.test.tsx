/**
 *
 * Tests for Header
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import Header from '../index';
import { fireEvent } from 'react-testing-library';

describe('<Header />', () => {
  let clickSpy: jest.Mock;

  beforeAll(() => {
    clickSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Header mobile={false} toggleSidebar={clickSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain logo', () => {
    const { getAllByAltText } = renderWithIntl(<Header mobile={true} toggleSidebar={clickSpy} />);
    expect(getAllByAltText('logo').length).toBe(1);
  });

  it('should trigger toggleSidebar when clicked on menu icon', () => {
    const { getByTestId } = renderWithIntl(<Header mobile={true} toggleSidebar={clickSpy} />);
    fireEvent.click(getByTestId('menu-icon'));
    expect(clickSpy).toBeCalled();
  });
});
