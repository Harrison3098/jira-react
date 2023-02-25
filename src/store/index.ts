import { configureStore } from "@reduxjs/toolkit";
import { projectListReducer } from "screens/project-list/project-list.slice";
import { authSliceReducer } from "./auth.slice";

export const rootReducer = {
  projectListReducer,
  authSliceReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
