
import { jwtDecode } from 'jwt-decode';
import { TAuth } from '../redux/features/auth/authSlice'; // Ensure correct import

export const verifyToken = (token: string): TAuth => {
    return jwtDecode<TAuth>(token);
};


