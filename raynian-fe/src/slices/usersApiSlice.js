import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/user/auth";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: `POST`,
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/logout`,
        method: `POST`,
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signup`,
        method: `POST`,
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useSignupMutation } =
  usersApiSlice;
