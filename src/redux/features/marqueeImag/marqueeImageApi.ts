
import { baseApi } from "../../api/baseApi";

const marqueeImageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        
        getMarqueeImage: builder.query({
            query: () => ({
                url: `/marquee`,
                method: 'GET'
            }),
            
        }),
    })
})

export const {useGetMarqueeImageQuery } = marqueeImageApi;

