import ProfileSettings from "../pages/user/manageProfile/ProfileSettings";
import UserDashboard from "../pages/user/UserDashboard";
import ViewOrders from "../pages/user/viewOrders/ViewOrders";


export const userPaths = [
    {
      name: 'Dashboard',
      path: 'dashboard',
      element: <UserDashboard />,
    },
    {
      name: 'View Orders',
      path: 'view-orders',
      element: <ViewOrders />,
    },
    {
      name: 'Profile',
      path: 'profile',
      element: <ProfileSettings />,
    }
  ];