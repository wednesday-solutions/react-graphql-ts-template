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
const launchData = [
  {
    launches: [
      {
        mission_name: 'FalconSat',
        launch_date_local: '2006-03-24T22:30:00-04:00',
        links: {
          flickr_images: ['https://farm1.staticflickr.com/60/215827008_6489cd30c4.jpg']
        }
      }
    ]
  }
];

storiesOf('LaunchList').add('simple', () => <LaunchList launchData={launchData} loading={loading} />);
