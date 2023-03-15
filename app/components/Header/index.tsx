/**
 *
 * Header
 *
 */
import React from 'react';
import styled from '@emotion/styled';
import { AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { fonts, colors } from '@themes/index';
import T from '@components/T';
import logo from '@images/icon-512x512.png';

const StyledHeader = styled(AppBar)`
  && {
    padding: 0 1rem;
    height: ${({ theme }: any) => theme.baseLayout.headerHeight};
    align-items: center;
    justify-content: center;
    background-color: ${colors.primary};
    gap: 1rem;
    ${({ theme }: any) => `${theme.breakpoints.down('sm')} {
      padding-left: ${({ theme }: any) => theme.baseLayout.sidebarWidth};
    }`};
    display: flex;
  }
`;

const Logo = styled.img`
  height: 5rem;
  width: auto;
  object-fit: contain;
  ${({ theme }: any) => `${theme.breakpoints.down('sm')} {
    height: 4rem;
  }`};
`;

const Title = styled(T)`
  && {
    margin: 0;
    ${fonts.dynamicFontSize(fonts.size.xRegular, 1, 0.5)};
    display: flex;
    align-self: center;
    color: ${colors.secondaryText};
  }
`;

const Header: React.FC = () => {
  return (
    <StyledHeader data-testid="header" position="static">
      <Toolbar sx={{ display: 'flex', gap: '1rem' }}>
        <Link to="/">
          <Logo alt="logo" src={logo} />
        </Link>
        <Title type="heading" id="wednesday_solutions" />
      </Toolbar>
    </StyledHeader>
  );
};

export default Header;
