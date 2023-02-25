import { User } from "screens/project-list/search-panel";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";
// import * as auth from

type State = {
  user: User | null;
};

const initialState: State = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { reducer: authSliceReducer, actions: authSliceActions } =
  authSlice;
export const selectUser = (state: RootState) => state.authSliceReducer.user;
