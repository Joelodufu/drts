import React from "react";
import NavBar from "./../../components/NavBar";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

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
        </Box>
      </Box>
    </>
  );
}

export default Profile;
