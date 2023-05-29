import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "@redux/slices/authSlice";
import { State } from "@redux/store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as State).auth.token;
    if (token) {
      headers.set("authorization", `Token ${token}`);
      console.log("hay token !!!")
    } else {
      console.log("no hay token !!!")
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api', 
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: builder => ({})
})