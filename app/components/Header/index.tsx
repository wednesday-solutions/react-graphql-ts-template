/**
 *
 * Header
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Button } from 'antd';
import styled from 'styled-components';
import { fonts, colors, media } from '@themes/index';
import T from '@components/T';
import logo from '@images/icon-512x512.png';
import If from '@components/If';
import menuIcon from '@images/menu.svg';

const StyledHeader = styled(Layout.Header)`
  && {
    &.ant-layout-header {
      padding: 0 1rem;
      height: 7rem;
      padding-bottom: 1rem;
      align-items: center;
    }
    display: flex;
    justify-content: center;
    background-color: ${colors.primary};
    gap: 1rem;
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

const MenuImg = styled.img`
  width: 1.7rem;
  height: auto;
  object-fit: contain;
  filter: grayscale(100%);
`;

interface HeaderProps {
  toggleSidebar: () => void;
  mobile: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, mobile }) => {
  return (
    <StyledHeader data-testid="header">
      <If condition={mobile}>
        <Button
          data-testid="menu-icon"
          type="primary"
          size="large"
          aria-label="toggle sidebar"
          onClick={toggleSidebar}
          icon={<MenuImg src={menuIcon} alt="menu icon" />}
        />
      </If>
      <Logo alt="logo" src={logo} />
      <Title type="heading" id="wednesday_solutions" />
    </StyledHeader>
  );
};

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  mobile: PropTypes.bool.isRequired
};

export default Header;
