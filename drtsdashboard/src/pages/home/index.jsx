import React from "react";
import NavBar from "./../../components/NavBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LicenseTable from "./components/LicenseTable";
import NewApplications from "./components/NewApplications";

function HomePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>{`Welcome ${user.firstName} ${user.lastName}!`}</h1>
          <NewApplications />
          <LicenseTable />
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
