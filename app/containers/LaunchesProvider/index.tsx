import React from 'react';
import { StyledContainer } from '@components';
import { Helmet } from 'react-helmet';

function LaunchesProvider() {
  return (
    <StyledContainer>
      <Helmet>
        <title>SpaceX Lanuches</title>
      </Helmet>
      <h1 style={{ textAlign: 'center' }}>Welcome to SpaceX API</h1>
    </StyledContainer>
  );
}

export default LaunchesProvider;
