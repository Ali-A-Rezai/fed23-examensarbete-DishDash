/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { Box, Snackbar, Alert, Button, Typography } from "@mui/material";
import ProfileUpdateForm from "../components/ProfileUpdateForm";
import PasswordUpdateForm from "../components/PasswordUpdateForm";
import { useAuth } from "../Auth/context/AuthContext";
import {
  reauthenticateUser,
  getErrorMessage,
} from "../Auth/utils/reauthenticateUser";
import LoadingComponent from "../components/LoadingComponent";
import { updatePassword } from "firebase/auth";
import "../assets/styles/Pages-style/ProfilePage.scss";

const Profile: React.FC = () => {
  const { user, logout, loading, updateProfile } = useAuth();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [formState, setFormState] = useState({
    updating: false,
    passwordError: "",
    passwordMismatch: false,
    currentPasswordError: "",
  });
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (user?.displayName) {
      const nameParts = user.displayName.trim().split(" ");
      setFirstName(nameParts.slice(0, nameParts.length - 1).join(" ") || "");
      setLastName(nameParts[nameParts.length - 1] || "");
    }
  }, [user]);

  const handleLogout = () => logout();

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ ...formState, updating: true });

    try {
      if (user) {
        await updateProfile({ firstName, lastName });
        setSnackbar({
          open: true,
          message: "Profile updated successfully!",
          severity: "success",
        });
      }
    } catch (err: unknown) {
      setSnackbar({
        open: true,
        message: "Failed to update profile. Please try again.",
        severity: "error",
      });
    } finally {
      setFormState({ ...formState, updating: false });
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({
      ...formState,
      updating: true,
      passwordError: "",
      passwordMismatch: false,
      currentPasswordError: "",
    });

    if (newPassword !== confirmPassword) {
      setFormState({ ...formState, passwordMismatch: true, updating: false });
      return;
    }

    try {
      const email = user?.email;
      if (!email) {
        setFormState({
          ...formState,
          currentPasswordError: "Email is unavailable.",
        });
        return;
      }

      const reauthError = await reauthenticateUser(user!, oldPassword, email);
      if (reauthError) {
        setFormState({
          ...formState,
          currentPasswordError:
            "The current password you entered is incorrect.",
          updating: false,
        });
        return;
      }

      await updatePassword(user!, newPassword);

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setFormState({
        updating: false,
        passwordError: "",
        passwordMismatch: false,
        currentPasswordError: "",
      });

      setSnackbar({
        open: true,
        message: "Password updated successfully!",
        severity: "success",
      });
    } catch (err: unknown) {
      setSnackbar({
        open: true,
        message: getErrorMessage((err as Error).message),
        severity: "error",
      });
      setFormState({ ...formState, updating: false });
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  if (loading) {
    return <LoadingComponent message="Loading your profile..." />;
  }

  return (
    <Box className="profile-page-container">
      <Typography variant="h4">Your Profile</Typography>
      <ProfileUpdateForm
        firstName={firstName}
        lastName={lastName}
        setFirstName={setFirstName}
        setLastName={setLastName}
        handleProfileUpdate={handleProfileUpdate}
        formState={formState}
      />
      <PasswordUpdateForm
        oldPassword={oldPassword}
        setOldPassword={setOldPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        formState={formState}
        handlePasswordUpdate={handlePasswordUpdate}
      />
      <Button
        className="logout-btn"
        variant="outlined"
        color="error"
        onClick={handleLogout}
      >
        Logout
      </Button>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
