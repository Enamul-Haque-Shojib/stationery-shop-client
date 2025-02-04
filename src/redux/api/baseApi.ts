import { notification } from 'antd';
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logout, setAuth } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authenticate.token;

    if (token) {
      headers.set('authorization', `${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 404) {
    notification.error({
      message: 'Error 404',
      description: result.error.data.message || 'Resource not found',
      placement: 'bottomRight',
    });
  }

  if (result?.error?.status === 403) {
    notification.error({
      message: 'Error 403',
      description: result.error.data.message || 'Forbidden access',
      placement: 'bottomRight',
    });
  }

  if (result?.error?.status === 401) {
    //* Send Refresh Token request
    console.log('Sending refresh token');

    const res = await fetch('http://localhost:5000/api/auths/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });

    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).authenticate.auth;

      api.dispatch(
        setAuth({
          user,
          token: data.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);

      notification.success({
        message: 'Token Refreshed',
        description: 'Your session has been refreshed successfully.',
        placement: 'bottomRight',
      });
    } else {
      api.dispatch(logout());
      notification.error({
        message: 'Session Expired',
        description: 'Your session has expired. Please log in again.',
        placement: 'bottomRight',
      });
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['admin', 'users', 'products', 'orderProducts'],
  endpoints: () => ({}),
});

export const imageUploadBaseApi = createApi({
  reducerPath: 'imageUploadApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.imgbb.com/1' }),
  endpoints: () => ({}),
});
