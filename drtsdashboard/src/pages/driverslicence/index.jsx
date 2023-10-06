import React, { useState } from "react";
import NavBar from "./../../components/NavBar";
import Box from "@mui/material/Box";
import StickyHeadTable from "./components/table";

function DriversLicese() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Drivers Licenses</h1>
          <StickyHeadTable />
        </Box>
      </Box>
    </>
  );
}

export default DriversLicese;
