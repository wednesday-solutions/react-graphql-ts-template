import React from 'react';
import { renderProvider } from '@app/utils/testUtils';
import LaunchesProvider from '..';

describe('<LaunchesProvider /> tests', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<LaunchesProvider />);
    expect(baseElement).toMatchSnapshot();
  });
});
