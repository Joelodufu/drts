import React from "react";
import NavBar from "./../../components/NavBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Profile() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Profile</h1>
        </Box>
      </Box>
    </>
  );
}

export default Profile;
