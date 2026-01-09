import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTourType: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      providesTags: ["TOUR"],
      transformResponse: (response) => response.data,
    }),

    createTourType: builder.mutation({
      query: (info) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: info,
      }),
      invalidatesTags: ["TOUR"],
      transformResponse: (response) => response.data,
    }),

    deleteTourType: builder.mutation({
      query: (tourTypeId) => ({
        url: `/tour/tour-type/${tourTypeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR"],
    }),
  }),
});

export const {
  useGetAllTourTypeQuery,
  useCreateTourTypeMutation,
  useDeleteTourTypeMutation,
} = tourApi;
