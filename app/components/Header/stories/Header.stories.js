import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../index';

export default {
  title: 'Header',
  component: Header
};

const HeaderTemplate = (args) => (
  <MemoryRouter>
    <Header {...args} />
  </MemoryRouter>
);

export const HeaderStoryComponent = HeaderTemplate.bind({});
HeaderStoryComponent.args = {
  id: 'Header'
};
