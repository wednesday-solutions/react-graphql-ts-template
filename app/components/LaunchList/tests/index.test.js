/**
 *
 * Tests for LaunchList
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import LaunchList from '../index';

describe('<LaunchList />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<LaunchList />);
    expect(baseElement).toMatchSnapshot();
  });
});
