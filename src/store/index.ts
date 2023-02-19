import { configureStore } from "@reduxjs/toolkit";
import { projectListReducer } from "screens/project-list/project-list.slice";

export const rootReducer = {
  projectReducer: projectListReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
