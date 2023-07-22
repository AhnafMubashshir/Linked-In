import React, { useEffect, useState } from 'react';
import { UserOutlined, LoginOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Registrationpage from './RegistrationPage';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import { Link, useNavigate } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import LogOut from './LogOut';

const { Header, Content, Footer, Sider } = Layout;

function Navbar() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [activeComponent, setActiveComponent] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState('');
  const navigate = useNavigate();

  const menuItemsBeforeLoggedIn = [
    { key: 'home', label: 'Home', icon: <HomeOutlined />, path: '/' },
    { key: 'registration', label: 'Sign Up', icon: <UserOutlined />, path: '/registration' },
    { key: 'login', label: 'Sign In', icon: <LoginOutlined />, path: '/login' },
  ];

  const menuItemsAfterLoggedIn = [
    { key: 'home', label: 'Home', icon: <HomeOutlined />, path: '/' },
    { key: 'profile', label: 'Profile', icon: <UserOutlined />, path: `/profile/${userID}` },
    { key: 'logout', label: 'Log Out', icon: <LoginOutlined />, path: '' },
  ];

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserId = localStorage.getItem('userID');
    const storedActiveComponent = localStorage.getItem('activeComponent');

    if (storedIsLoggedIn) {
      setIsLoggedIn(storedIsLoggedIn === 'true');
    }

    if (storedUserId) {
      setUserID(storedUserId);
    }

    if (storedActiveComponent) {
      setActiveComponent(storedActiveComponent);
    }
  }, []);

  // Update local storage when isLoggedIn or userID changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('userID', userID);
  }, [userID]);

  useEffect(() => {
    localStorage.setItem('activeComponent', activeComponent);
  }, [activeComponent]);

  const handleMenuClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const handleLoginSuccess = (uID) => {
    navigate(`/profile/${uID}`);

    setIsLoggedIn(true);

    setActiveComponent('profile');

    setUserID(uID);

    localStorage.setItem('userID', uID);
  };

  const handleLogOutSuccess = (uID) => {
    setIsLoggedIn(false);

    setActiveComponent('login');

    setUserID('');
  };

  const handlePostButtonClicked = (uID) => {
    setActiveComponent('home');
  };

  const renderComponent = () => {
    if(!isLoggedIn) {
      switch (activeComponent) {
        case 'home':
          return <HomePage />;
        case 'registration':
          return <Registrationpage />;
        case 'login':
          return <LoginPage onLoginSuccess={handleLoginSuccess} />;
        default:
          return null;
      }
    }
    else {
      switch (activeComponent) {
        case 'home':
          return <HomePage />;
        case 'profile':
          return <ProfilePage onPostButtonClicked={handlePostButtonClicked}/>;
        case 'logout':
          return <LogOut onLogOut={handleLogOutSuccess}/>;
        default:
          return null;
      }
    }
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
          mode="inline"// Assuming 'Registrationpage' component is the first item
          selectedKeys={activeComponent}
          onClick={(e) => handleMenuClick(e.key)}
        >
          {renderMenuItems()}
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
