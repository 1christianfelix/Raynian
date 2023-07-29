import { usersSlice } from "./usersSlice";
const USERS_URL = "/api/user/auth";

export const usersApi = usersSlice.injectEndpoints({
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
  usersApi;
