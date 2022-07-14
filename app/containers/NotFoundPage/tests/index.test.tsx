import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import NotFoundPage from '../index';
import history from '@app/utils/history';

describe('<NotFoundPage /> tests', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild }
    } = render(
      <IntlProvider locale="en">
        <NotFoundPage />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
  it('should take the user back to the homePage if the go back button is clicked', () => {
    const { getByTestId } = render(
      <IntlProvider locale="en">
        <NotFoundPage />
      </IntlProvider>
    );
    const spy = jest.spyOn(history, 'push');
    fireEvent.click(getByTestId('back-button'));
    expect(spy).toBeCalled();
  });
});
