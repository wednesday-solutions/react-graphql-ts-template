/**
 *
 * Tests for Header
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
import Header from '../index';
import { fireEvent } from 'react-testing-library';

describe('<Header />', () => {
  let clickSpy: jest.Mock;

  beforeAll(() => {
    clickSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<Header mobile={false} toggleSidebar={clickSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain logo', () => {
    const { getAllByAltText } = renderProvider(<Header mobile={true} toggleSidebar={clickSpy} />);
    expect(getAllByAltText('logo').length).toBe(1);
  });

  it('should trigger toggleSidebar when clicked on menu icon', () => {
    const { getByTestId } = renderProvider(<Header mobile={true} toggleSidebar={clickSpy} />);
    fireEvent.click(getByTestId('menu-icon'));
    expect(clickSpy).toBeCalled();
  });
});
