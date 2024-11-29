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
      console.error("Login failed:", err);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      const user = await signup(email, password);
      setUser(user);
      setError(null);
    } catch (err) {
      console.error("Signup failed:", err);
      setError("Signup failed. Please try again. Error:");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setError(null);
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Logout failed. Please try again.");
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const user = await loginOrSignupWithGoogle();
      setUser(user);
      setError(null);
    } catch (err) {
      console.error("Google login/signup failed:", err);
      setError("Google login failed. Please try again.");
    }
  };

  const value: AuthContextType = useMemo(
    () => ({
      user,
      login: handleLogin,
      signup: handleSignup,
      logout: handleLogout,
      loginWithGoogle: handleLoginWithGoogle,
    }),
    [user]
  );

  if (loading) {
    return <LoadingComponent message="loading" />;
  }

  return (
    <AuthContext.Provider value={value}>
      {error && <ErrorComponent message="error" />}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
