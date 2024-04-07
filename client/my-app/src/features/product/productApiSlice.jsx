
import apiSlice from "../../app/apiSlice";
const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query({
            query: () => ({
                url: "/api/product",
                method: "GET",

            }),
            providesTags: ["Products"]
        }),
        getProductById: build.query({
            query: (id) => ({
                url: "/api/product/"+id,
                method: "GET",
            }),
            providesTags: ["Products"]
        }),
        addProductItem: build.mutation({
            query: (product) => ({
                url: "/api/product",
                method: "POST",
                body: product
            })
        }),
        updateProductItem: build.mutation({
            query: (product) => ({
                url: "/api/product",
                method: "PUT",
                body: product
            }),
            invalidatesTags: ["Products"]
        }),
        deleteProductItem: build.mutation({
            query: ({ id }) => ({
                url: "/api/product",
                method: "DELETE",
                body: { id: id }
            }),
            invalidatesTags: ["Products"]

        })

    })

})
export const { useGetProductsQuery, useGetProductByIdQuery, useAddProductItemMutation, useUpdateProductItemMutation, useDeleteProductItemMutation } = productApiSlice

