import { createStore } from "redux";
import { combineReducers } from "redux";

type AuthAction = { type: "LOGIN" } | { type: "LOGOUT" };

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
