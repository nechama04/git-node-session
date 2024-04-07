
import apiSlice from "../../app/apiSlice";
const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getOrders: build.query({
            query: () => ({
                url: "/api/order",
                method: "GET",

            }),
            providesTags: ["Orders"],
        }),

        getOrdersByUser: build.query({
            query: () => ({
                url: "/api/order/history",
                method: "GET",
            }),
            providesTags: ["Orders"],
        }),

        getBasket: build.query({
            query: () => ({
                url: "/api/order/basket",
                method:"GET"
            }),
            providesTags: ["basket"]
        }),
        addProduct: build.mutation({
            query: (prodId) => ({
                url: "/api/order/addProduct",
                method: "POST",
                body:{prod:prodId} 
            }),
            invalidatesTags:["basket"]
        }),
        removeProduct: build.mutation({
            query: (prod) => ({
                url: "/api/order/removeProduct",
                method:"PUT",
                body:{prod:prod}
            }),
            invalidatesTags:["basket"]
        }),
        updatePaid: build.mutation({
            query: (id) => ({
                url: "/api/order/paid",
                method:"PUT",
                body:{id:id}
            }),
            invalidatesTags:["basket"]
        })


        })

    })
    export const { useGetOrdersQuery, useGetOrdersByUserQuery,useGetBasketQuery, useAddProductMutation, useRemoveProductMutation,useUpdatePaidMutation } = orderApiSlice

