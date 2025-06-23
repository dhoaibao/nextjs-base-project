'use client';

import { useState, useMemo } from 'react';
import { Layout, theme } from 'antd';
import SideBarComponent from './SideBar';
import HeaderComponent from './Header';
import FooterComponent from './Footer';

const { Content } = Layout;

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const contentStyle = useMemo(
    () => ({
      margin: '24px 16px',
      padding: 24,
      minHeight: `calc(100vh - 200px)`,
      background: colorBgContainer,
      borderRadius: borderRadiusLG,
    }),
    [colorBgContainer, borderRadiusLG]
  );

  return (
    <Layout>
      <SideBarComponent collapsed={collapsed} />
      <Layout>
        <HeaderComponent
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          colorBgContainer={colorBgContainer}
        />
        <Content style={contentStyle}>{children}</Content>
        <FooterComponent />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
