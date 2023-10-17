import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import Box from "@mui/material/Box";
import Controls from "./components/controls/controls";
import ApplicationForm from './components/applicationForm';

function DriversLicence() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Drivers Licenses</h1>
          <ApplicationForm/>
          <div></div>
        </Box>
      </Box>
    </>
  );
}

export default DriversLicence;
