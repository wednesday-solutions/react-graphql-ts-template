/**
 *
 * Tests for Clickable
 *
 */

import React from 'react';

import { renderWithIntl } from '@utils/testUtils';
import Clickable from '../index';

describe('<Clickable /> component tests', () => {
  let clickSpy: jest.Mock;
  beforeAll(() => {
    clickSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Clickable textId="launches_list" onClick={clickSpy} />);
    expect(baseElement).toMatchSnapshot();
  });
});
