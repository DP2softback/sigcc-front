import { apiSlice } from "./apiSlice";
import { LoginResponse } from "@redux/types/auth";

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<LoginResponse, FormData>({
			query: (credentials: FormData) => ({
				url: "/login",
				method: "POST",
				body: credentials
			})
		})
	})
});

export const { useLoginMutation } = authApiSlice;
