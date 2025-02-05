import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  User,
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import {
  signup,
  login,
  logout,
  loginOrSignupWithGoogle,
} from "./services/authService";
import { SignupFormValues } from "./types/form";
import { AuthContext } from "./context/AuthContext";
import { ERROR_MESSAGES } from "./ErrorMessages";
import LoadingComponent from "../components/LoadingComponent";
import { Snackbar, Alert } from "@mui/material";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("info");

  const showSnackbar = useCallback(
    (message: string, severity: "success" | "error" | "info" | "warning") => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setSnackbarOpen(true);
    },
    []
  );

  const handleError = useCallback(
    (
      errorMessage: string,
      severity: "error" | "info" | "success" | "warning"
    ) => {
      setError(errorMessage);
      showSnackbar(errorMessage, severity);
    },
    [showSnackbar]
  );

  const handleAuthAction = useCallback(
    async (
      action: () => Promise<User>,
      successMessage: string,
      errorMessage: string
    ) => {
      try {
        setLoading(true);
        setError(null);
        const result = await action();
        setUser(result);
        showSnackbar(successMessage, "success");
      } catch (err) {
        console.error(`${errorMessage}:`, err);
        handleError(errorMessage, "error");
      } finally {
        setLoading(false);
      }
    },
    [showSnackbar, handleError]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      setUser(null);
      showSnackbar("You logged out", "info");
    } catch (err) {
      console.error("Error during logout:", err);
      handleError(ERROR_MESSAGES.LOGOUT_FAILED, "error");
    }
  }, [showSnackbar, handleError]);
  const updateProfile = useCallback(
    async (profile: {
      firstName?: string;
      lastName?: string;
      email?: string;
      oldPassword?: string;
      newPassword?: string;
    }) => {
      if (user) {
        try {
          if (profile.firstName || profile.lastName) {
            const displayName = `${profile.firstName || ""} ${
              profile.lastName || ""
            }`.trim();

            await firebaseUpdateProfile(user, { displayName });

            await user.reload();
            setUser(auth.currentUser);
          }

          if (profile.email) {
            await updateEmail(user, profile.email);
          }

          if (profile.oldPassword && profile.newPassword) {
            const credential = EmailAuthProvider.credential(
              user.email || "",
              profile.oldPassword
            );
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, profile.newPassword);
          }

          if (profile.firstName || profile.lastName) {
            const db = getFirestore();
            const userRef = doc(db, "users", user.uid);

            await updateDoc(userRef, {
              firstName: profile.firstName,
              lastName: profile.lastName,
            });
          }

          showSnackbar("Profile updated successfully", "success");
        } catch (err) {
          console.error("Error updating profile:", err);
          showSnackbar("Error updating profile", "error");
        }
      } else {
        showSnackbar("No user is currently signed in", "error");
      }
    },
    [user, showSnackbar]
  );

  const value = useMemo(() => {
    const handleLogin = (email: string, password: string) =>
      handleAuthAction(
        () => login(email, password),
        "Login successful!",
        ERROR_MESSAGES.LOGIN_FAILED
      );

    const handleSignup = (formValues: SignupFormValues) =>
      handleAuthAction(
        () =>
          signup(
            formValues.email,
            formValues.password,
            formValues.firstName,
            formValues.lastName
          ),
        "Signup successful!",
        ERROR_MESSAGES.SIGNUP_FAILED
      );

    const handleLoginWithGoogle = () =>
      handleAuthAction(
        () => loginOrSignupWithGoogle(),
        "Google login successful!",
        ERROR_MESSAGES.GOOGLE_LOGIN_FAILED
      );

    return {
      user,
      loading,
      error,
      login: handleLogin,
      signup: handleSignup,
      logout: handleLogout,
      loginWithGoogle: handleLoginWithGoogle,
      showSnackbar,
      updateProfile,
    };
  }, [
    user,
    loading,
    error,
    handleAuthAction,
    handleLogout,
    showSnackbar,
    updateProfile,
  ]);

  if (loading) {
    return <LoadingComponent message="Loading..." />;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
