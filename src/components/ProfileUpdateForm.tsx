import React from "react";
import { Grid, TextField, Button } from "@mui/material";
import "../assets/styles/Pages-style/ProfilePage.scss";

interface ProfileUpdateFormProps {
  firstName: string;
  lastName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  handleProfileUpdate: (e: React.FormEvent) => void;
  formState: {
    updating: boolean;
  };
}

const ProfileUpdateForm: React.FC<ProfileUpdateFormProps> = ({
  firstName,
  lastName,
  setFirstName,
  setLastName,
  handleProfileUpdate,
  formState,
}) => {
  return (
    <form onSubmit={handleProfileUpdate}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            autoComplete="family-name"
          />
        </Grid>
      </Grid>
      <Button
        className="update-btn"
        type="submit"
        variant="contained"
        color="primary"
        disabled={formState.updating}
      >
        {formState.updating ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  );
};

export default ProfileUpdateForm;
