import { LOGIN, LOGOUT } from "../types/actionTypes";

interface AuthAction {
  type: typeof LOGIN | typeof LOGOUT;
}

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isAuthenticated: true };
    case LOGOUT:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

export default authReducer;
