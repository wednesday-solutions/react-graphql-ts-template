import React from 'react';
import { renderProvider } from '@utils/testUtils';
import App, { MOBILE_BREAKPOINT } from '../index';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, waitFor } from '@testing-library/react';

describe('<App /> container tests', () => {
  it('should render and match the snapshot', () => {
    const { container } = renderProvider(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should set mobile to true window width is less MOBILE_BREAKPOINT', () => {
    Object.defineProperty(window, 'innerWidth', { value: MOBILE_BREAKPOINT - 50 });
    const { getByTestId } = renderProvider(<App />);
    global.dispatchEvent(new Event('resize'));
    expect(getByTestId('menu-icon')).toBeInTheDocument();
  });

  it('should set mobile to false window width is greater than MOBILE_BREAKPOINT', () => {
    Object.defineProperty(window, 'innerWidth', { value: MOBILE_BREAKPOINT + 50 });
    const { queryByTestId } = renderProvider(<App />);
    global.dispatchEvent(new Event('resize'));
    expect(queryByTestId('menu-icon')).not.toBeInTheDocument();
  });

  it('should open drawer in mobile if clicked on mobile icon', async () => {
    Object.defineProperty(window, 'innerWidth', { value: MOBILE_BREAKPOINT - 50 });
    const { getByTestId } = renderProvider(<App />);
    fireEvent.click(getByTestId('menu-icon'));
    await waitFor(() => expect(getByTestId('rocket-home-link')).toBeInTheDocument());
  });
});
