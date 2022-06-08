import React, { useState, useCallback } from 'react';
import { colors } from '@app/themes';
import { Button, Drawer, DrawerProps } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';
import icon from '@images/ion_rocket-sharp.svg';
import menuIcon from '@images/menu.svg';
import If from '@components/If';
import useMedia from '@utils/useMedia';

const SidebarWrapper = styled.div`
  position: relative;
  display: flex;
`;

const SidebarDrawer = styled(Drawer)`
  && {
    .ant-drawer-body {
      padding: ${(props) => props.theme.headerHeight} 0 0 0;
      background-color: ${colors.primary};
      width: ${(props) => props.theme.sidebarWidth};
      text-align: center;
    }
    .ant-drawer-close {
      top: 1rem;
    }
  }
`;

const SideBarStatic = styled.div`
  && {
    width: 6%;
    min-width: 4.5rem;
    max-width: 7rem;
    min-height: calc(100vh - ${(props) => props.theme.headerHeight});
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

const MenuButton = styled(Button)`
  && {
    position: absolute;
    top: calc(${(props) => props.theme.headerHeight} / -2);
    left: calc(${(props) => props.theme.sidebarWidth} / 2);
    transform: translate(-50%, -50%);
  }
`;

const MenuImg = styled.img`
  width: 1.7rem;
  height: auto;
  object-fit: contain;
`;

const Sidebar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { isMobile } = useMedia();

  const toggleSidebar = useCallback(() => setVisible((v) => !v), []);
  const sidebarProps: DrawerProps = isMobile
    ? {
        closeIcon: <CloseOutlined style={{ color: colors.secondary, fontSize: '1.9rem' }} />,
        placement: 'left',
        visible,
        closable: true,
        onClose: toggleSidebar,
        width: 'max-content'
      }
    : {};

  const SidebarComponent = (props: DrawerProps) =>
    isMobile ? <SidebarDrawer {...props} /> : <SideBarStatic data-testid="sidebar" {...(props as any)} />;

  return (
    <SidebarWrapper>
      <If condition={isMobile}>
        <MenuButton
          data-testid="menu-icon"
          type="primary"
          size="large"
          aria-label="toggle sidebar"
          onClick={toggleSidebar}
          icon={<MenuImg src={menuIcon} alt="menu icon" />}
        />
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
