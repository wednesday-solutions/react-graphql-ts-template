import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Clickable } from '../index';

export default {
  title: 'Clickable',
  component: Clickable
};

const ClickableTemplate = (args) => <Clickable {...args} />;

export const ClickableStoryComponent = ClickableTemplate.bind({});
ClickableStoryComponent.args = {};
