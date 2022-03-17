/**
 *
 * ErrorBoundary
 *
 */

import React, { PropsWithChildren } from 'react';
import { translate } from '@components/IntlGlobalProvider/index';

interface ErrorState {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends React.Component<PropsWithChildren<{}>, ErrorState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // handle gracefully
      return <h1>{translate('something_went_wrong')}</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
