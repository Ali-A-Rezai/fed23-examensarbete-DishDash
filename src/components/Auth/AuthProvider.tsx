import React, { useState, useEffect, useMemo } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import {
  signup,
  login,
  logout,
  loginOrSignupWithGoogle,
  getUser,
} from "../../services/authService";
import LoadingComponent from "../LoadingComponent";
import ErrorComponent from "../ErrorComponent";
import { SignupFormValues } from "../../types/form";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = getUser();
    if (currentUser) {
      setUser(currentUser);
    }

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const user = await login(email, password);
      setUser(user);
      setError(null);
    } catch (err) {
      console.log(
        "Login failed. Please check your credentials and try again.",
        err
      );
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  const handleSignup = async (formValues: SignupFormValues) => {
    try {
      const { email, password, firstName, lastName } = formValues;
      const user = await signup(email, password, firstName, lastName);
      setUser(user);
      setError(null);
    } catch (err) {
      console.log(
        "Signup failed. Please check your credentials and try again.",
        err
      );
      setError("Signup failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setError(null);
    } catch (err) {
      console.log("Logout failed.", err);
      setError("Logout failed. Please try again.");
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const user = await loginOrSignupWithGoogle();
      setUser(user);
      setError(null);
    } catch (err) {
      console.log(
        "Signup failed. Please check your credentials and try again.",
        err
      );
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

  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent message={error} />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
