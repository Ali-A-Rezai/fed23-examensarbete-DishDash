import React, { useState, useCallback } from "react";
import {
  Box,
  Button,
  Typography,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import { useAuth } from "../../Auth/context/AuthContext";
import GoogleIcon from "../../assets/images/Google_logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthActions } from "../../Auth/hooks/useAuthActions";
import InputField from "../../components/InputField";
import "../../assets/styles/components-style/Auth.scss";
import useFormState from "../../Auth/hooks/useFormState";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup, loginWithGoogle } = useAuth();
  const { formValues, formErrors, handleChange, validateForm } = useFormState();
  const { loading, error, handleSignup, handleGoogleSignup } = useAuthActions(
    signup,
    loginWithGoogle,
    navigate
  );

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const location = useLocation();
  const redirectTo = new URLSearchParams(location.search).get("redirectTo");

  const handleFormSubmit = useCallback(() => {
    if (validateForm()) {
      handleSignup(formValues)
        .then(() => {
          navigate(redirectTo || "/profile");
          setSnackbarMessage("Signup successful!");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
        })
        .catch((err) => {
          setSnackbarMessage(
            err.message || "Failed to signup. Please try again."
          );
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        });
    }
  }, [formValues, validateForm, handleSignup, navigate, redirectTo]);

  const handleGoogleSubmit = useCallback(() => {
    handleGoogleSignup()
      .then(() => {
        setSnackbarMessage("Signup with Google successful!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      })
      .catch((err) => {
        console.log("Failed to signup with Google.", err);
        setSnackbarMessage("Failed to signup with Google. Please try again.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  }, [handleGoogleSignup]);

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box
          sx={{
            maxWidth: 400,
            margin: "auto",
            mt: 7,
            mb: 7,
            padding: 4,
            borderRadius: 2,
            boxShadow: (theme) => ({
              xs: 0,
              sm: theme.shadows[3],
            }),
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            Signup
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <form onSubmit={(e) => e.preventDefault()}>
            <InputField
              label="First Name"
              type="text"
              value={formValues.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              error={!!formErrors.firstName}
              helperText={formErrors.firstName}
            />
            <InputField
              label="Last Name"
              type="text"
              value={formValues.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              error={!!formErrors.lastName}
              helperText={formErrors.lastName}
            />
            <InputField
              label="Email"
              type="email"
              value={formValues.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={!!formErrors.email}
              helperText={formErrors.email}
              autoComplete="email"
            />
            <InputField
              label="Password"
              type="password"
              value={formValues.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={!!formErrors.password}
              helperText={formErrors.password}
              autoComplete="new-password"
            />
            <InputField
              label="Confirm Password"
              type="password"
              value={formValues.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              autoComplete="new-password"
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 2 }}
              onClick={handleFormSubmit}
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Signup"
              )}
            </Button>
          </form>

          <Divider sx={{ my: 2 }}>OR</Divider>

          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleGoogleSubmit}
            disabled={loading}
            startIcon={
              <img
                src={GoogleIcon}
                alt="Google logo"
                style={{ width: 24, height: 24 }}
              />
            }
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Signup with Google"
            )}
          </Button>

          <Typography
            variant="body2"
            sx={{ mt: 2 }}
            color="textSecondary"
            pt="40px"
          >
            Already have an account?{" "}
            <Typography
              component="span"
              color="primary"
              sx={{ cursor: "pointer", fontWeight: "bold" }}
              onClick={() => navigate("/login")}
            >
              Login here
            </Typography>
          </Typography>
        </Box>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Signup;
