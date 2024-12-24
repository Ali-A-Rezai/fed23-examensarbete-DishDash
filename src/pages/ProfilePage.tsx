import React, { useState } from "react";
import { Button, TextField, Grid, Typography, Box } from "@mui/material";
import { useAuth } from "../Auth/context/AuthContext";
import LoadingComponent from "../components/LoadingComponent";
import "../assets/styles/Pages-style/ProfilePage.scss";

const Profile: React.FC = () => {
  const { user, logout, loading, updateProfile } = useAuth();
  const [firstName, setFirstName] = useState<string>(
    user?.displayName?.split(" ")[0] || ""
  );

  const [lastName, setLastName] = useState<string>(
    user?.displayName?.split(" ").slice(1).join(" ") || ""
  );

  const [updating, setUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleLogout = () => {
    logout();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setError("");
    setSuccess("");
    try {
      await updateProfile({ firstName, lastName });
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      console.error("Error updating profile:", err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <LoadingComponent message="Loading your profile..." />;
  }

  return (
    <Box
      className="profile-page-container"
      sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}
    >
      <Typography variant="h4" gutterBottom>
        Your Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
          {success && (
            <Grid item xs={12}>
              <Typography color="primary">{success}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={updating}
              fullWidth
            >
              {updating ? "Updating..." : "Update Profile"}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleLogout}
              fullWidth
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Profile;
