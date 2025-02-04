import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { currentToken, logout } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';

type TProtectedRoute = {
    children: ReactNode;
    role: string | undefined;
  };
const ProtectedRoutes = ({ children, role }: TProtectedRoute) => {
    const token = useAppSelector(currentToken);

  let auth;

  if (token) {
    auth = verifyToken(token);
  
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== auth?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoutes;