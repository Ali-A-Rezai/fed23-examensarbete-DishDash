import React from "react";
import { Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
const Profile: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome to your profile page!</p>

      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Profile;
