import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Card } from 'antd';
import T from '@components/T';
import If from '@components/If';
import { compose } from 'redux';

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

export function ErrorHandler({ loading, launchListError }: ErrorHandlerTypes | any) {
  return (
    !loading &&
    launchListError && (
      <CustomCard data-testid="error-card">
        <If condition={launchListError} otherwise={<T data-testid="default-message" id={launchListError} />}>
          <T data-testid="error-message" text={launchListError} />
        </If>
      </CustomCard>
    )
  );
}

ErrorHandler.propTypes = {
  loading: PropTypes.bool,
  launchListError: PropTypes.string,
  intl: PropTypes.object
};

export default compose(memo, injectIntl)(ErrorHandler);
