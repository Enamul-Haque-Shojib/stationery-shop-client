


import { Layout, Menu, MenuProps, Typography } from 'antd';
import { sidebarItemsGenerator } from '../../utils/sidebarItemsGenerator';
import { adminPaths } from '../../routes/admin.routes';
import { userPaths } from '../../routes/user.routes';
import { useAppSelector } from '../../redux/hooks';
import { currentToken, TAuth } from '../../redux/features/auth/authSlice';
import { verifyToken } from '../../utils/verifyToken';

const { Sider } = Layout;
const { Title } = Typography;

const userRole = {
    ADMIN: 'admin',
    USER: 'user'
};

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
    const token = useAppSelector(currentToken);
    let auth: TAuth | null = null;

    if (token) {
        auth = verifyToken(token);
    }

    let sidebarItems: MenuProps['items'] = [];

    switch (auth?.role) {
        case userRole.ADMIN:
            sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
            break;
        case userRole.USER:
            sidebarItems = sidebarItemsGenerator(userPaths, userRole.USER);
            break;
        default:
            break;
    }

    return (
        <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh', background: '#001529' }}>
            <div style={{ padding: 16, textAlign: 'center', color: 'white' }}>
                <Title level={4} style={{ color: 'white', marginBottom: 0 }}>Stationery Shop</Title>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={sidebarItems} />
        </Sider>
    );
};

export default Sidebar;