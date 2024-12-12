import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { SignupFormValues } from "../types/form";
import {
  signup,
  login,
  logout,
  loginOrSignupWithGoogle,
} from "../services/authService";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (formValues: SignupFormValues) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const user = await login(email, password);
      setUser(user);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Login failed. Please try again.");
    }
  };

  const handleSignup = async (formValues: SignupFormValues): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const user = await signup(
        formValues.email,
        formValues.password,
        formValues.firstName,
        formValues.lastName
      );
      setUser(user);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Signup failed. Please try again.");
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.log(err);
      setError("Logout failed. Please try again.");
    }
  };

  const handleLoginWithGoogle = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const user = await loginOrSignupWithGoogle();
      setUser(user);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Google login failed. Please try again.");
    }
  };

  const value: AuthContextType = useMemo(
    () => ({
      user,
      loading,
      error,
      login: handleLogin,
      signup: handleSignup,
      logout: handleLogout,
      loginWithGoogle: handleLoginWithGoogle,
    }),
    [user, loading, error]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
