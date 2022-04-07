import PropTypes from 'prop-types';
import { colors } from '@app/themes';
import { Drawer, DrawerProps } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';
import icon from '@images/ion_rocket-sharp.svg';

const SidebarDrawer = styled(Drawer)`
  && {
    .ant-drawer-body {
      padding: 7rem 0 0 0;
      background-color: ${colors.primary};
      width: 6%;
      min-width: 4.5rem;
      max-width: 7rem;
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
    min-height: calc(100vh - 7rem);
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

interface SidebarProps {
  toggleSidebar: () => void;
  mobile: boolean;
  visible: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ toggleSidebar, mobile, visible }) => {
  const sidebarProps: DrawerProps = mobile
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
    mobile ? <SidebarDrawer {...props} /> : <SideBarStatic data-testid="sidebar" {...(props as any)} />;

  return (
    <SidebarComponent {...sidebarProps}>
      <Link onClick={toggleSidebar} data-testid="rocket-home-link" aria-label="home link" to="/">
        <RocketLogo src={icon} alt="rocket-icon" />
      </Link>
    </SidebarComponent>
  );
};

Sidebar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  mobile: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired
};

export default Sidebar;
