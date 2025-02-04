import { ReactNode, useEffect, useState } from 'react'

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
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    // console.log('Role->',role)

   
    useEffect(() => {

        const getAuthData = async () =>{
           
            try {
            
                    const res = await profileData(auth?.email).unwrap();
                    console.log(res)
                    
                        setUserData(res?.data)
                    
            
            } catch (error) {
                // console.log(error)
                if(error.data.success == false){
                    dispatch(logout())
                }
            }
        }

        if(auth?.email){
            getAuthData()
        }else{
            dispatch(logout())
        }
        
       
   
    }, [auth?.email, profileData])
  
    const authInfo = {
        userData,
    }
  
    return (
      <AuthContext.Provider value={authInfo}>
        {children}
      </AuthContext.Provider>
    )
};

export default AuthProvider;