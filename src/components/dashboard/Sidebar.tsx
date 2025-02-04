// import {
//     MenuFoldOutlined,
//     MenuUnfoldOutlined,
//     UploadOutlined,
//     UserOutlined,
//     VideoCameraOutlined,
//   } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { sidebarItemsGenerator } from '../../utils/sidebarItemsGenerator';
import { adminPaths } from '../../routes/admin.routes';
import { userPaths } from '../../routes/user.routes';
import { useAppSelector } from '../../redux/hooks';
import { currentAuth, currentToken } from '../../redux/features/auth/authSlice';


const {Sider} = Layout;

const userRole = {
    ADMIN: 'admin',
    USER: 'user'
  };

const Sidebar = ({collapsed} : {collapsed:boolean}) => {
    const auth = useAppSelector(currentAuth);

    let sidebarItems;

    switch (auth?.role as string) {
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
        <Sider trigger={null} collapsible collapsed={collapsed}>
            
        <div className="demo-logo-vertical" style={{color:"white"}}>
            <h1>Stationery Shop</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={sidebarItems}
        />
      </Sider>
    );
};

export default Sidebar;