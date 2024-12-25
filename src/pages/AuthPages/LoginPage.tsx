import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  CircularProgress,
  Grid,
} from "@mui/material";
import GoogleIcon from "../../assets/images/Google_logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Auth/context/AuthContext";
import "../../assets/styles/components-style/Auth.scss";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    login,
    loginWithGoogle,
    loading: authLoading,
    showSnackbar,
  } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const from = location.state?.from?.pathname || "/";

  const handleLoginClick = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      try {
        await login(email, password);
        showSnackbar("Login successful!", "success");
        setTimeout(() => navigate(from, { replace: true }), 3000);
      } catch (err) {
        console.error(err);
        showSnackbar("Login failed. Please try again.", "error");
      }
    } else {
      showSnackbar("Please enter both email and password.", "error");
    }
  };

  const handleGoogleLoginClick = async () => {
    try {
      await loginWithGoogle();
      showSnackbar("Google login successful!", "success");
      setTimeout(() => navigate(from, { replace: true }), 3000);
    } catch (err) {
      console.error(err);
      showSnackbar("Google login failed. Please try again.", "error");
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box
          sx={{
            maxWidth: 400,
            margin: "auto",
            mt: 1,
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
            Login
          </Typography>

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
      </Grid>
    </Grid>
  );
};

export default Login;
