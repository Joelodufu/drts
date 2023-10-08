import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import Box from "@mui/material/Box";
import StickyHeadTable from "./components/applicantsTable";

function Applications() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <StickyHeadTable />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box>
      </Box>
    </>
  );
}

export default Applications;
