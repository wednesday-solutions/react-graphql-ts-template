declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  const value: any;
  export default value;
}

declare module 'intl/locale-data/jsonp/en.js';

// https://github.com/rt2zz/redux-persist-transform-immutable/pull/40/files
declare module 'redux-persist-transform-immutable' {
  import { Record } from 'immutable';
  import { Transform } from 'redux-persist/es/types';

  interface Config {
    records: Record<Object>;
  }

  export default function <HSS, ESS, S = any, RS = any>(config?: Config): Transform<HSS, ESS, S, RS>;
}
