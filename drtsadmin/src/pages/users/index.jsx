import React from "react";
import NavBar from "./../../components/NavBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UserTable from './UserTable';

function UsersPage() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Users</h1>
          <UserTable/>
        </Box>
      </Box>
    </>
  );
}

export default UsersPage;
