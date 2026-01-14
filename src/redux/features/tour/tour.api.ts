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

    createTour: builder.mutation({
      query: (tourData) => ({
        url: "/tour/create",
        method: "POST",
        data: tourData,
      }),
    }),
    getAllTour: builder.query({
      query: () => ({
        url: "/tour",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetAllTourTypeQuery,
  useCreateTourTypeMutation,
  useDeleteTourTypeMutation,
  useCreateTourMutation,
  useGetAllTourQuery,
} = tourApi;
