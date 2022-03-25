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

const loading = false;
const launchData = {
  launches: [
    {
      launch_date_local: '2014-01-06T14:06:00-04:00',
      mission_name: 'Thaicom 6',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Thaicom_6',
        flickr_images: ['https://farm9.staticflickr.com/8617/16789019815_f99a165dc5_o.jpg']
      }
    }
  ]
};

storiesOf('LaunchList').add('simple', () => <LaunchList launchData={launchData} loading={loading} />);
