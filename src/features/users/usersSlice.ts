import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UsersState = {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: unknown;
};

const initialState: UsersState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsersRequest(state) {
      state.loading = true;
    },
    getUsersSuccess(state, action: PayloadAction<User[]>) {
      state.loading = false;
      state.users = action.payload;
    },
    getCurrentUserSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.currentUser = action.payload;
    },
    getUsersFailure(state, action: PayloadAction<unknown>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getUsersRequest,
  getUsersSuccess,
  getCurrentUserSuccess,
  getUsersFailure,
} = usersSlice.actions;

const usersReducer = usersSlice.reducer;

export default usersReducer;
