/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { currentAuth, logout } from '../redux/features/auth/authSlice';
import { useProfileDataMutation } from '../redux/features/auth/authApi';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAppSelector(currentAuth);
  const dispatch = useAppDispatch();
  const [profileData] = useProfileDataMutation();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const getAuthData = async () => {
      try {
        const res = await profileData(auth?.email).unwrap();
        console.log(res);
        setUserData(res?.data);
      } catch (error) {
        if (error.data?.success === false) {
          dispatch(logout());
        }
      }
    };

    if (auth?.email) {
      getAuthData();
    } else {
      dispatch(logout());
    }
  }, [auth?.email, profileData, dispatch]);

  const authInfo = {
    userData,
    setUserData
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
