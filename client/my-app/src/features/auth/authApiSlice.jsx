import apiSlice from "../../../src/app/apiSlice";

const authApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        register:build.mutation({
            query:(registerUser)=>({
                url:"/api/auth/register",
                method:"POST",
                body:registerUser
            })
        }),
        login: build.mutation({
            query:(loginUser)=>({
                url:"/api/auth/login",
                method: "POST",
                body:loginUser
            })
        })
    })
})
export default authApiSlice.reducer
export const {useRegisterMutation, useLoginMutation}=authApiSlice