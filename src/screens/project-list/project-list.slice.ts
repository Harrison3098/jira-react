import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

type State = {
  projectModalVisible: boolean;
};

const initialState: State = {
  projectModalVisible: false,
};

const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  reducers: {
    openProjectModal(state) {
      state.projectModalVisible ||= true;
    },
    closeProjectModal(state) {
      state.projectModalVisible &&= false;
    },
  },
});

export const projectListActions = projectListSlice.actions;
export const projectListReducer = projectListSlice.reducer;
export const selectProjectModalVisible = (state: RootState) =>
  state.projectReducer.projectModalVisible;
