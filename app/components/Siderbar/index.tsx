import React, { useState, useCallback } from 'react';
import { colors } from '@app/themes';
import { Drawer, DrawerProps, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import icon from '@images/ion_rocket-sharp.svg';
import MenuIcon from '@mui/icons-material/Menu';
import If from '@components/If';
import useMedia from '@utils/useMedia';
import { HEADER_HEIGHT, MIN_SIDEBAR_WIDTH } from '@app/utils/constants';

export const theme = {
  headerHeight: HEADER_HEIGHT,
  sidebarWidth: MIN_SIDEBAR_WIDTH
};

const SidebarWrapper = styled.div`
  position: relative;
  display: flex;
`;

const SidebarDrawer = styled(Drawer)`
  && {
    .MuiDrawer-paper {
      padding: ${theme.headerHeight} 0 0 0;
      background-color: ${colors.primary};
      min-width: ${theme.sidebarWidth};
      text-align: center;
    }
  }
`;

const SideBarStatic = styled.div`
  && {
    width: 6%;
    min-width: 4.5rem;
    max-width: 7rem;
    min-height: calc(100vh - ${theme.headerHeight});
    height: auto;
    background-color: ${colors.primary};
    display: inline;
    text-align: center;
  }
`;

const RocketLogo = styled.img`
  && {
    margin-top: 1rem;
    object-fit: contain;
  }
`;

const MenuButton = styled(IconButton)`
  && {
    position: absolute;
    top: calc(${theme.headerHeight} / -2);
    left: calc(${theme.sidebarWidth} / 2);
    transform: translate(-50%, -50%);
  }
`;

const Sidebar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { isMobile } = useMedia();

  const toggleSidebar = useCallback(() => setVisible((v) => !v), []);
  const sidebarProps: DrawerProps = isMobile
    ? {
        anchor: 'left',
        open: visible,
        onClose: toggleSidebar,
        variant: 'temporary'
      }
    : {};

  const SidebarComponent = (props: DrawerProps) =>
    isMobile ? <SidebarDrawer {...props} /> : <SideBarStatic data-testid="sidebar" {...(props as any)} />;

  return (
    <SidebarWrapper>
      <If condition={isMobile}>
        <MenuButton data-testid="menu-icon" size="large" aria-label="toggle sidebar" onClick={toggleSidebar}>
          <MenuIcon sx={{ color: 'white' }} />
        </MenuButton>
      </If>
      <SidebarComponent {...sidebarProps}>
        <Link onClick={toggleSidebar} data-testid="rocket-home-link" aria-label="home link" to="/">
          <RocketLogo src={icon} alt="rocket-icon" />
        </Link>
      </SidebarComponent>
    </SidebarWrapper>
  );
};

export default Sidebar;
