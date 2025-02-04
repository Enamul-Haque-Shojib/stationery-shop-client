import { baseApi } from "../../api/baseApi";


const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addProduct: builder.mutation({
            query: (productInfo) => ({
                url: '/products/create-product',
                method: 'POST',
                body: productInfo
            }),
            invalidatesTags: ["products"],
        }),
        updateProduct: builder.mutation({
            query: (args) => ({
                url: `/products/update-product/${args._id}`,
                method: 'PATCH',
                body: args.productInfo
            }),
            invalidatesTags: ["products"],
        }),
        orderStatus: builder.mutation({
            query: (args) => ({
                url: `/products/order-status/${args.id}`,
                method: 'PATCH',
                body: args.status
            }),
            invalidatesTags: ["orderProducts"],
        }),
        getAllProducts: builder.query({
            query: () => ({
                url: '/products',
                method: 'GET'
            }),
            providesTags:['products']
        }),
        getAllQueryProducts: builder.mutation({
            query: (category) => ({
                url: `/products?category=${category}`,
                method: 'GET'
            }),
            invalidatesTags:['products']
        }),
        getSingleProducts: builder.query({
            query: (id) => ({
                url: `/products/single-product/${id}`,
                method: 'GET'
            }),
            providesTags:['products']
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/delete-product/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["products"],
        }),
      
        getAllOrderProducts: builder.query({
            query: () => ({
                url: '/products/order',
                method: 'GET'
            }),
            providesTags:['orderProducts']
        }),
    })
})

export const {useAddProductMutation, useGetAllProductsQuery, useUpdateProductMutation, useGetSingleProductsQuery, useDeleteProductMutation, useGetAllOrderProductsQuery, useOrderStatusMutation, useGetAllQueryProductsMutation} = adminApi;

