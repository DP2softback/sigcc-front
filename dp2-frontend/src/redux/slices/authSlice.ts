import { getStorageItem, setStorage, cleanStorage } from "@config/localStorage";
import { AuthUser } from "@redux/types/auth";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Roles } from "@routes/types/roles";
import { State } from "@redux/store";

const initialState: AuthUser = {
	user: null,
	token: null,
	applicant: null
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		getCredentials: (state) => {
			state.user = getStorageItem("user", false);
			state.token = getStorageItem("dp2-access-token", true);
		},
		setCredentials: (state: AuthUser, action: PayloadAction<Partial<AuthUser>>) => {
			const { user, token, applicant } = action.payload;
			state.user = user;
			state.token = token;
			state.applicant = applicant;
			setStorage({ "user": JSON.stringify(user), "dp2-access-token": token, "applicant": JSON.stringify(applicant) })
		},
		logOut: (state: AuthUser) => {
			state.user = null;
			state.token = null;
			cleanStorage();
		}
	}
});

export const { getCredentials, setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: State) => getStorageItem("user", false);
export const selectCurrentToken = (state: State) => getStorageItem("dp2-access-token", true);
