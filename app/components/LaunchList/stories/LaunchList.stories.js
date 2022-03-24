/**
 *
 * Stories for LaunchList
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { LaunchList } from '../index';

storiesOf('LaunchList').add('simple', () => <LaunchList />);
