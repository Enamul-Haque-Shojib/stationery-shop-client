import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: '/auths/login',
                method: 'POST',
                body: userInfo
            })
        }),
        register: builder.mutation({
            query: (userInfo) => ({
                url: '/auths/create-auth',
                method: 'POST',
                body: userInfo
            })
        }),
        activeStatus: builder.mutation({
            query: (args) => ({
                url: `/auths/manage-auth/${args.email}`,
                method: 'PATCH',
                body: args.manage
            }),
            invalidatesTags:['users']
        }),
        profileData: builder.mutation({
            query: (email) => ({
                url: `/auths/profile/${email}`,
              
                method: 'GET'
            }),
        invalidatesTags:['users']
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: `/auths`,
              
                method: 'GET'
            }),
            providesTags: ['users']
        }),
    })
})

export const { useLoginMutation, useRegisterMutation, useGetAllUsersQuery, useActiveStatusMutation, useProfileDataMutation } = authApi