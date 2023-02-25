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

export const { reducer: projectListReducer, actions: projectListActions } =
  projectListSlice;
export const selectProjectModalVisible = (state: RootState) =>
  state.projectListReducer.projectModalVisible;
