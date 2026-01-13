import { baseApi } from "@/redux/baseApi";

const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDivision: builder.mutation({
      query: (divisionData) => ({
        url: "/division/create",
        method: "POST",
        data: divisionData,
      }),
      invalidatesTags: ["DIVISION"],
      transformResponse: (response) => response.data,
    }),

    getDivision: builder.query({
      query: () => ({
        url: "/division",
        method: "GET",
      }),
      providesTags: ["DIVISION"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useCreateDivisionMutation, useGetDivisionQuery } = divisionApi;
