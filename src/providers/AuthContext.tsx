/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, Dispatch, SetStateAction } from 'react';

interface AuthContextType {
  userData: any;  
  setUserData: Dispatch<SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
