import React from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { validatePassword } from "../Auth/utils/password-validator";
import "../assets/styles/Pages-style/ProfilePage.scss";

interface PasswordUpdateFormProps {
  oldPassword: string;
  setOldPassword: React.Dispatch<React.SetStateAction<string>>;
  newPassword: string;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  formState: {
    passwordError: string;
    passwordMismatch: boolean;
    currentPasswordError: string;
    updating: boolean;
  };
  handlePasswordUpdate: (e: React.FormEvent) => void;
}

const PasswordUpdateForm: React.FC<PasswordUpdateFormProps> = ({
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  formState,
  handlePasswordUpdate,
}) => {
  return (
    <form onSubmit={handlePasswordUpdate}>
      <Typography variant="h6" gutterBottom>
        Change Password
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Current Password"
            variant="outlined"
            type="password"
            fullWidth
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            autoComplete="current-password"
            error={!!formState.currentPasswordError}
            helperText={formState.currentPasswordError}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="New Password"
            variant="outlined"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              const { isValid, errorMessage } = validatePassword(
                e.target.value
              );
              formState.passwordError = isValid ? "" : errorMessage;
            }}
            required
            autoComplete="new-password"
            error={!!formState.passwordError}
            helperText={formState.passwordError}
          />
        </Grid>
        {formState.passwordMismatch && (
          <Grid item xs={12}>
            <Typography color="error" variant="body2">
              Passwords do not match.
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            error={formState.passwordMismatch}
            helperText={
              formState.passwordMismatch ? "Passwords do not match." : ""
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            className="update-btn"
            type="submit"
            variant="contained"
            color="primary"
          >
            {formState.updating ? "Updating..." : "Update Password"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PasswordUpdateForm;
