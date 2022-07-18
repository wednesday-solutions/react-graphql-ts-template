import React from 'react';
import { renderProvider } from '@utils/testUtils';
import App from '@containers/App';
import { BrowserRouter } from 'react-router-dom';

describe('<App /> container tests', () => {
  it('should render and match the snapshot', () => {
    const { container } = renderProvider(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
