import React from "react";
import NavBar from "./../../components/NavBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LicenseTable from "./components/LicenseTable";

function HomePage() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Dashboard</h1>
          <LicenseTable />
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
