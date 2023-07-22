import React, { useEffect, useState } from 'react';
import { UserOutlined, LoginOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import PageRoutes from './PageRoutes';

const { Content, Footer, Sider } = Layout;

function Navbar() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState();
  const location = useLocation();

  console.log(location);

  const menuItemsBeforeLoggedIn = [
    { key: '/', label: 'Home', icon: <HomeOutlined />, path: '/' },
    { key: '/registration', label: 'Sign Up', icon: <UserOutlined />, path: '/registration' },
    { key: '/login', label: 'Sign In', icon: <LoginOutlined />, path: '/login' },
  ];

  const menuItemsAfterLoggedIn = [
    { key: '/', label: 'Home', icon: <HomeOutlined />, path: '/' },
    { key: `/profile/${userID}`, label: 'Profile', icon: <UserOutlined />, path: `/profile/${userID}` },
    { key: `/notifications`, label: 'Notifications', icon: <UserOutlined />, path: `/notifications` },
    { key: '/logout', label: 'Log Out', icon: <LoginOutlined />, path: '/logout' },
  ];

  const handleUseEffect = () => {
    console.log('Route is used');
  };

  const renderMenuItems = () => {
    if (!isLoggedIn) {
      return menuItemsBeforeLoggedIn.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.path} style={{ textDecoration: 'none' }}>
              {item.label}
            </Link>
          </Menu.Item>
        ))
    }
    else {
      return menuItemsAfterLoggedIn.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.path} style={{ textDecoration: 'none' }}>
            {item.label}
          </Link>
        </Menu.Item>
      ))
    }
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const userID = localStorage.getItem('userID');

    if (storedIsLoggedIn) {
      setIsLoggedIn(storedIsLoggedIn === 'true');
    }
    else {
      setIsLoggedIn(false);
    }

    if(userID) {
      setUserID(userID);
    }
  }, [handleUseEffect]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{
          position: 'fixed',
          height: '100%',
          left: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"// Assuming 'Registrationpage' component is the first item
          selectedKeys={[location.pathname]}
        >
          {renderMenuItems()}
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ marginTop: '24px', marginLeft: '250px', marginRight: '24px', marginBottom: '16px' }}>
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
            <div style={{ width: '50%' }}>
              <PageRoutes onRouteUsed={handleUseEffect}/>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Linked In ©2023 Created by Ahnaf Mubashshir</Footer>
      </Layout>
    </Layout>
  );
}

export default Navbar;
