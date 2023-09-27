import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const statsApi = createApi({
  reducerPath: "stats",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/user",
    credentials: "include",
  }),
  tagTypes: ["Stats"],
  endpoints: (builder) => ({
    getStats: builder.query({
      query: (id) => `/${id}/stats`,
    }),
    updateTasksCompleted: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}/stats/tasks`,
        body: data,
        method: "put",
      }),
      invalidatesTags: ["Stats"],
    }),
    updateSessionsCompleted: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}/stats/sessions`,
        body: data,
        method: "put",
      }),
      invalidatesTags: ["Stats"],
    }),
    updateStudyTime: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}/stats/studytime`,
        body: data,
        method: "put",
      }),
      invalidatesTags: ["Stats"],
    }),
    updateLongestStreak: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}/stats/longeststreak`,
        body: data,
        method: "put",
      }),
      invalidatesTags: ["Stats"],
    }),
  }),
});

export const {
  useGetStatsQuery,
  useUpdateTasksCompletedMutation,
  useUpdateSessionsCompletedMutation,
  useUpdateStudyTimeMutation,
  useUpdateLongestStreakMutation,
} = statsApi;
