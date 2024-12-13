import React from "react";
import { Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import LoadingComponent from "../components/LoadingComponent";

const Profile: React.FC = () => {
  const { user, logout, loading } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <LoadingComponent message="Loading your profile..." />;
  }

  return (
    <div>
      <p>
        Welcome, <strong>{user?.displayName || user?.email}</strong>!
      </p>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Profile;
