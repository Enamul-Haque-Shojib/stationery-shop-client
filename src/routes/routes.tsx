
import {
    createBrowserRouter,
} from "react-router-dom";

import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.routes";
import { userPaths } from "./user.routes";
import DashboardRoot from "../root/DashboardRoot";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/errorPage/ErrorPage";

import CartDetails from "../pages/Carts/CartDetails";
import Register from "../pages/register/Register";
import Login from "../pages/Login/Login";
import Home from "../pages/home/Home";
import AllProducts from "../pages/allProducts/AllProducts";
import ProtectedRoutes from "../layout/ProtectedRoutes";
import About from "../pages/about/About";


export const router = createBrowserRouter([
    
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorPage />,
      children:[
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cart-details/:id",
          element: <CartDetails />,
        },
        {
          path: '/all-products',
          element: <AllProducts></AllProducts>
        },
        {
          path: '/about',
          element: <About></About>
        },
      ]
    },
   
    {
      path: '/register',
      element: <Register></Register>
    },
    {
      path: '/login',
      element: <Login></Login>
    },
    
    {
      path: '/admin',
      element: (
        <ProtectedRoutes role="admin">
          <DashboardRoot />
         </ProtectedRoutes>
      ),
      children: routeGenerator(adminPaths),
    },
    {
      path: '/user',
      element: (
        <ProtectedRoutes role="user">
          <DashboardRoot />
         </ProtectedRoutes>
      ),
      children: routeGenerator(userPaths),
    },
  ]);