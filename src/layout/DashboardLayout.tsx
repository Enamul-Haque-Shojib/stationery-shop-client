import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons';
import { Button, Layout,theme } from 'antd';
import { useState } from 'react';

import { Link, Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import { useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/features/auth/authSlice';
const { Header,Content } = Layout;

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
        <Layout style={{height:'100%'}}>
      <Sidebar collapsed={collapsed}></Sidebar>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
         
          <Link to='/'>Home</Link>
          <Button onClick={handleLogOut}>Logout</Button>
          
          
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 500,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
    );
};

export default DashboardLayout;