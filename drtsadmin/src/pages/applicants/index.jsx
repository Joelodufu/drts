import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import Box from "@mui/material/Box";
import ApplicantTable from "./components/ApplicantTable";

function Applications() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <ApplicantTable />
      </Box>
    </>
  );
}

export default Applications;
