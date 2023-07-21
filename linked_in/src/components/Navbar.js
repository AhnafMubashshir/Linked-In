import React, { useState } from 'react';
import { UserOutlined, LoginOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Registrationpage from './RegistrationPage';
import LoginPage from './LoginPage';

const { Header, Content, Footer, Sider } = Layout;

function Navbar() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [activeComponent, setActiveComponent] = useState('registration'); // Initial active component is 'registration'

  const handleMenuClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'registration':
        return <Registrationpage />;
      case 'login':
        return <LoginPage />;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']} // Assuming 'Registrationpage' component is the first item
          onClick={(e) => handleMenuClick(e.key)}
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="registration" icon={<UserOutlined />}>
            Register
          </Menu.Item>
          <Menu.Item key="login" icon={<LoginOutlined />}>
            Sign In
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ width: '50%' }}>{renderComponent()}</div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default Navbar;
