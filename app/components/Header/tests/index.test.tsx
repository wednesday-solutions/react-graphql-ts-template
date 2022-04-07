/**
 *
 * Tests for Header
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
import Header from '../index';

describe('<Header />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<Header />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain logo', () => {
    const { getAllByAltText } = renderProvider(<Header />);
    expect(getAllByAltText('logo').length).toBe(1);
  });
});
