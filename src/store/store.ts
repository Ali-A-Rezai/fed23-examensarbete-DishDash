import { createStore, combineReducers } from "redux";
import authReducer from "./reducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
