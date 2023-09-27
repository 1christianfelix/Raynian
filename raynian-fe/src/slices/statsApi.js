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
    updateTasksCompleted: builder.query({
      query: ({ id, data }) => ({
        url: `/${id}/stats/tasks`,
        body: data,
        method: put,
      }),
      invalidatesTags: ["Stats"],
    }),
    updateSessionsCompleted: builder.query({
      query: ({ id, data }) => ({
        url: `/${id}/stats/sessions`,
        body: data,
        method: put,
      }),
      invalidatesTags: ["Stats"],
    }),
    updateStudyTime: builder.query({
      query: ({ id, data }) => ({
        url: `/${id}/stats/studytimer`,
        body: data,
        method: put,
      }),
      invalidatesTags: ["Stats"],
    }),
    updateLongestStreak: builder.query({
      query: ({ id, data }) => ({
        url: `/${id}/stats/longeststreak`,
        body: data,
        method: put,
      }),
      invalidatesTags: ["Stats"],
    }),
  }),
});

export const {
  useGetStatsQuery,
  useUpdateTasksCompletedQuery,
  useUpdateSessionsCompletedQuery,
  useUpdateStudyTimeQuery,
  useUpdateLongestStreakQuery,
} = statsApi;
