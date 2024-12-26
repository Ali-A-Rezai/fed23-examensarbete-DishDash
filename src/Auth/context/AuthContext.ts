import { createContext, useContext } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { SignupFormValues } from "../types/form";

export interface UserProfileUpdate {
  firstName: string;
  lastName: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
}

export interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (formValues: SignupFormValues) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  showSnackbar: (
    message: string,
    variant: "success" | "info" | "error"
  ) => void;
  updateProfile: (profile: UserProfileUpdate) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
