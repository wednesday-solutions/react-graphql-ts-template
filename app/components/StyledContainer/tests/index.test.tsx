import React from 'react';
import { renderWithIntl } from '@app/utils/testUtils';
import StyledContainer from '..';

describe('<StyledContainer /> tests', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<StyledContainer />);
    expect(baseElement).toMatchSnapshot();
  });
});
