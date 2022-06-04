import React from 'react';
import Sidebar from '..';
import { renderProvider } from '@utils/testUtils';
import { fireEvent, waitFor } from '@testing-library/react';
import useScreenType from 'react-screentype-hook';

jest.mock('react-screentype-hook', () => jest.fn());

describe('<Sidebar /> tests', () => {
  it('should contains menu icon in mobile screen', () => {
    (useScreenType as jest.Mock).mockImplementation(() => ({ isMobile: true }));
    const { getByTestId } = renderProvider(<Sidebar />);
    expect(getByTestId('menu-icon')).toBeInTheDocument();
  });

  it('should not contains menu icon for desktop screen', () => {
    (useScreenType as jest.Mock).mockImplementation(() => ({ isMobile: false }));

    const { queryByTestId } = renderProvider(<Sidebar />);
    expect(queryByTestId('menu-icon')).not.toBeInTheDocument();
  });

  it('should open drawer in mobile if clicked on mobile icon', async () => {
    (useScreenType as jest.Mock).mockImplementation(() => ({ isMobile: true }));
    const { getByTestId } = renderProvider(<Sidebar />);
    fireEvent.click(getByTestId('menu-icon'));
    await waitFor(() => expect(getByTestId('rocket-home-link')).toBeInTheDocument());
  });
});
