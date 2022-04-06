import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from 'antd';
import { T, If } from '@components';

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    color: ${(props) => props.color};
  }
`;

interface ErrorHandlerTypes {
  loading: boolean;
  launchListError?: string;
}

export function ErrorHandler({ loading, launchListError }: ErrorHandlerTypes) {
  if (!loading) {
    return (
      <If condition={launchListError} otherwise={<T data-testid="default-message" id={launchListError} />}>
        <CustomCard data-testid="error-card">
          <T data-testid="error-message" text={launchListError} />
        </CustomCard>
      </If>
    );
  } else {
    return null;
  }
}

ErrorHandler.propTypes = {
  loading: PropTypes.bool,
  launchListError: PropTypes.string
};

export default ErrorHandler;
