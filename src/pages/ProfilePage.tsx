import React from "react";
import { Button } from "@mui/material";
import { useAuth } from "../Auth/context/AuthContext";
import LoadingComponent from "../components/LoadingComponent";
import "../assets/styles/Pages-style/ProfilePage.scss";

const Profile: React.FC = () => {
  const { user, logout, loading } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <LoadingComponent message="Loading your profile..." />;
  }

  return (
    <div className="profile-page-container ">
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
