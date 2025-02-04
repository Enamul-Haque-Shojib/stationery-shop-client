import AdminDashboard from "../pages/admin/AdminDashboard";
import AllOrders from "../pages/admin/manageOrders/AllOrders";

import AddProducts from "../pages/admin/manageProducts/AddProducts";
import AllProducts from "../pages/admin/manageProducts/AllProducts";
import UpdateProducts from "../pages/admin/manageProducts/UpdateProducts";
import AllUsers from "../pages/admin/manageUsers/allUsers/AllUsers";




export const adminPaths = [
    {
      name: 'Dashboard',
      path: 'dashboard',
      element: <AdminDashboard />,
    },
    {
      name: 'Products Management',
      children: [
        {
          name: 'Add Products',
          path: 'add-products',
          element: <AddProducts />,
        },
        {
          path: 'update-products/:id',
          element: <UpdateProducts />,
        },
        {
          name: 'All Products',
          path: 'all-products',
          element: <AllProducts />,
        },
      ],
    },
    {
      name: 'User Management',
      children: [
        {
          name: 'All Users',
          path: 'all-users',
          element: <AllUsers />,
        },
      ],
    },
    {
      name: 'Order Management',
      children: [
        {
          name: 'All Orders',
          path: 'all-orders',
          element: <AllOrders />,
        },
      ],
    },
  ];