import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import Box from "@mui/material/Box";

function DriversLicence() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Drivers Licenses</h1>
        </Box>
      </Box>
    </>
  );
}

export default DriversLicence;
