import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import GoogleIcon from "../../assets/images/Google_logo.png";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuthActions } from "../../utils/hooks/useAuthActions";
import useFormState from "../../utils/hooks/useFormState";
import InputField from "../InputField";
import "../../assets/styles/components-style/Auth.scss";

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

  return (
    <Container className="auth-container">
      <Box
        sx={{
          maxWidth: 400,
          margin: "auto",
          mt: 8,
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
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
            onClick={() => {
              if (validateForm()) {
                handleSignup(formValues)
                  .then(() => {
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
            }}
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
          onClick={() => {
            handleGoogleSignup()
              .then(() => {
                setSnackbarMessage("Signup with Google successful!");
                setSnackbarSeverity("success");
                setOpenSnackbar(true);
              })
              .catch((err) => {
                console.log("Failed to signup with Google.", err);
                setSnackbarMessage(
                  "Failed to signup with Google. Please try again."
                );
                setSnackbarSeverity("error");
                setOpenSnackbar(true);
              });
          }}
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
    </Container>
  );
};

export default Signup;
