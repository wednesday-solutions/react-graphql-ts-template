import React from 'react';
import { renderProvider } from '@utils/testUtils';
import App from '@containers/App';
import { BrowserRouter } from 'react-router-dom';
import { waitFor } from '@testing-library/react';

describe('<App /> container tests', () => {
  it('should render and match the snapshot', async () => {
    const { container } = renderProvider(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    await waitFor(() => expect(container.textContent).toContain('SORT BY'));
    await waitFor(() => expect(container).toMatchSnapshot());
  });
});
