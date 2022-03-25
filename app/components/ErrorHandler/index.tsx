import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from 'antd';
import { T, If } from '@app/components';

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    color: ${(props) => props.color};
  }
`;

interface ErrorHandlerTypes {
  loading: boolean;
  launchListError: string;
}

export function ErrorHandler({ loading, launchListError }: ErrorHandlerTypes) {
  if (!loading && launchListError) {
    return (
      <CustomCard data-testid="error-card">
        <If condition={launchListError} otherwise={<T data-testid="default-message" id={launchListError} />}>
          <T data-testid="error-message" text={launchListError} />
        </If>
      </CustomCard>
    );
  } else {
    return null;
  }
}

ErrorHandler.propTypes = {
  loading: PropTypes.bool,
  launchListError: PropTypes.string,
  intl: PropTypes.object
};

export default ErrorHandler;
