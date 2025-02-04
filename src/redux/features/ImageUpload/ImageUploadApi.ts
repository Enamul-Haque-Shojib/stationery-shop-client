import { imageUploadBaseApi } from "../../api/baseApi";


const imageUploadApi = imageUploadBaseApi.injectEndpoints({
    endpoints: (builder) => ({
        imageUpload: builder.mutation({
            query: (imageData) => ({
                url: `/upload?key=8367e30714143f89dc7eb7e14faaf8eb`,
                method: 'POST',
                body: imageData
            })
        }),
        
    })
});

export const {useImageUploadMutation} = imageUploadApi;