import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";



export type TAuth = {
    email: string;
    role: string;
    iat: number;
    exp: number;
}
type TAuthState = {
    auth: TAuth | null;
    token: string | null;
}

const initialState: TAuthState = {
    auth: null,
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setAuth: (state, action) => {
            const { auth, token} = action.payload;
            state.auth = auth;
            state.token = token;
        },
        logout: (state) => {
            state.auth = null;
            state.token = null;
        }
    }
});

export const {setAuth, logout} = authSlice.actions;
export default authSlice.reducer;

export const currentToken = (state: RootState)=> state.authenticate.token;
export const currentAuth = (state: RootState)=> state.authenticate.auth;