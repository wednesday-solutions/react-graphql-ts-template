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

const StyledHeader = styled(Layout.Header)`
  && {
    &.ant-layout-header {
      padding: 0 1rem;
      height: ${(props) => props.theme.headerHeight};
      align-items: center;
      justify-content: center;
      background-color: ${colors.primary};
      gap: 1rem;
      ${media.lessThan('mobile')`
      padding-left: ${(props) => props.theme.sidebarWidth}
      `}
    }
    display: flex;
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
