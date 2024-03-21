import { apiSlice } from "./apiSlice";
import { MOVIE_URL,UPLOAD_URL } from "../constants";

export const moviesApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createMovie:builder.mutation({
            query:(newMovie)=>({
                url:`${MOVIE_URL}/create-movie`,
                method:"POST",
                body:newMovie,
            })
        }),
        uploadImage:builder.mutation({
            query:(formData)=>({
                url:`${UPLOAD_URL}`,
               method:"POST",
               body:formData
            })
        })
    })
})

export const{
useCreateMovieMutation,
useUploadImageMutation
}=moviesApiSlice