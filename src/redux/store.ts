import { configureStore } from "@reduxjs/toolkit";
import { baseApi, imageUploadBaseApi } from "./api/baseApi";
import authReducer from './features/auth/authSlice'
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'stationery_shop_auth',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);



export const store = configureStore({
    reducer:{
        [baseApi.reducerPath]: baseApi.reducer,
        [imageUploadBaseApi.reducerPath] : imageUploadBaseApi.reducer,
        authenticate: persistedAuthReducer,
    },
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }).concat(baseApi.middleware).concat(imageUploadBaseApi.middleware),
});

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;