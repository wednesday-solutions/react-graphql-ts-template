/**
 *
 * Header
 *
 */
import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { fonts, colors, media } from '@themes/index';
import T from '@components/T';
import logo from '@images/icon-512x512.png';

import { Link } from 'react-router-dom';
import { HEADER_HEIGHT, MIN_SIDEBAR_WIDTH } from '@app/utils/constants';

const StyledHeader = styled(Layout.Header)`
  && {
    &.ant-layout-header {
      padding: 0 1rem;
      height: ${HEADER_HEIGHT};
      padding-bottom: 1rem;
      align-items: center;
    }
    height: ${HEADER_HEIGHT};
    display: flex;
    justify-content: center;
    background-color: ${colors.primary};
    gap: 1rem;
    ${media.lessThan('mobile')`
        padding-left: calc(${MIN_SIDEBAR_WIDTH} / 2)
    `}
  }
`;
const Logo = styled.img`
  height: 5rem;
  width: auto;
  object-fit: contain;
  ${media.lessThan('tablet')`
    height: 4rem;
  `}
`;
const Title = styled(T)`
  && {
    margin-bottom: 0;
    ${fonts.dynamicFontSize(fonts.size.xRegular, 1, 0.5)};
    display: flex;
    align-self: center;
    color: ${colors.secondaryText};
  }
`;

const Header: React.FC = () => {
  return (
    <StyledHeader data-testid="header">
      <Link to="/">
        <Logo alt="logo" src={logo} />
      </Link>
      <Title type="heading" id="wednesday_solutions" />
    </StyledHeader>
  );
};

export default Header;
