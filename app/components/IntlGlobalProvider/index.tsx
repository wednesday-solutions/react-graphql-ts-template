// eslint-disable-next-line
import React from 'react';
import { IntlShape, useIntl } from 'react-intl';

// 'intl' service singleton reference
let intl: IntlShape;

export default function IntlGlobalProvider({ children }: { children: React.ReactNode }) {
  intl = useIntl(); // Keep the 'intl' service reference
  return <>{children}</>;
}

// setter function to set intl value inside tests
export const setIntl = (intlValue: IntlShape) => {
  intl = intlValue;
};

export const translate = (id: string, values = {}) => intl.formatMessage({ id }, values);
