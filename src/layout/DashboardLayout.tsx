import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined, HomeOutlined } from '@ant-design/icons';
import { Button, Layout, theme, Space } from 'antd';
import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import { useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/features/auth/authSlice';

const { Header, Content } = Layout;

const DashboardLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogOut = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Header style={{ padding: '0 16px', background: colorBgContainer, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px' }}
          />
          <Space>
            <Link to='/'>
              <Button type="primary" icon={<HomeOutlined />}>Home</Button>
            </Link>
            <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogOut}>Logout</Button>
          </Space>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 500, background: colorBgContainer, borderRadius: borderRadiusLG }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
