import React, { useEffect, useState } from "react";
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
import { useLoginActions } from "../../utils/hooks/useAuthActions";
import ErrorComponent from "../ErrorComponent";
import "../../assets/styles/components-style/Auth.scss";

const login = async (data: { email: string; password: string }) => {
  console.log("Logging in with", data);
  return;
};

const loginWithGoogle = async () => {
  return;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, successMessage, handleLogin, handleGoogleLogin } =
    useLoginActions(login, loginWithGoogle, navigate);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const redirected = searchParams.get("redirected");

    if (redirected) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  }, [location.search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      handleLogin({ email, password })
        .then(() => {
          setSnackbarMessage(successMessage || "Login successful!");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
        })
        .catch(() => {
          setSnackbarMessage("Failed to login. Please check your credentials.");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        });
    } else {
      setSnackbarMessage("Please enter both email and password.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleGoogleLoginClick = async () => {
    try {
      await handleGoogleLogin();
      setSnackbarMessage("Google login successful!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (err) {
      console.log("Failed to login with Google.", err);
      setSnackbarMessage("Failed to login with Google. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      {showError && <ErrorComponent message="Please login first." />}

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

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
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
              disabled={loading}
            >
              {loading ? (
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
    </>
  );
};

export default Login;
