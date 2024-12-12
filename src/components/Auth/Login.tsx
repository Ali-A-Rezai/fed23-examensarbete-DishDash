import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import GoogleIcon from "../../assets/images/Google_logo.png";
import { Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../assets/styles/components-style/Auth.scss";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    login,
    loginWithGoogle,
    loading: authLoading,
    error: authError,
  } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const from = location.state?.from?.pathname || "/";

  const handleLoginClick = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      try {
        await login(email, password);
        navigate(from, { replace: true });
      } catch (err) {
        console.log(err);
        setSnackbarMessage("Login failed. Please try again.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } else {
      setSnackbarMessage("Please enter both email and password.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleGoogleLoginClick = async () => {
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      setSnackbarMessage("Google login failed. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

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
          Login
        </Typography>

        {authError && (
          <Typography color="error" sx={{ mb: 2 }}>
            {authError}
          </Typography>
        )}

        <form onSubmit={handleLoginClick}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
            type="submit"
            disabled={authLoading}
          >
            {authLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <Divider sx={{ my: 2 }}>OR</Divider>

        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={handleGoogleLoginClick}
          disabled={authLoading}
          startIcon={
            <img
              src={GoogleIcon}
              alt="Google logo"
              style={{ width: 24, height: 24 }}
            />
          }
        >
          {authLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Login with Google"
          )}
        </Button>
        <Typography
          variant="body2"
          sx={{ mt: 2 }}
          color="textSecondary"
          pt="40px"
        >
          Don't have an account?{" "}
          <Typography
            component="span"
            color="primary"
            sx={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={() => navigate("/signup")}
          >
            Signup here
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

export default Login;
