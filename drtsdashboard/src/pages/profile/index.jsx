import React from "react";
import NavBar from "./../../components/NavBar";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    // Remove the "user" value from local storage
    localStorage.removeItem("user");

    // Reload the page
  
    window.location.reload();
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Welcome</h1>
          <span>
            <Typography> {user.firstName}</Typography>
          </span>
          <span>
            <Typography> {user.lastName}</Typography>
          </span>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Profile;
