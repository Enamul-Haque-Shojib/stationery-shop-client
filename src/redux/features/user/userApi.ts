import { baseApi } from "../../api/baseApi";


const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addOrder: builder.mutation({
            query: (orderInfo) => ({
                url: '/products/create-order',
                method: 'POST',
                body: orderInfo
            }),
            invalidatesTags: ["products"],
        }),
     
        getAllUserOrder: builder.query({
            query: (email) => ({
                url: `/products/order?userEmail=${email}`,
                method: 'GET'
            }),
            providesTags:['orderProducts']
        }),
    })
})

export const {useGetAllUserOrderQuery, useAddOrderMutation } = userApi;

