import React from "react";
import NavBar from "./../../components/NavBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function DrivingSchoolPage() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Driving Schools</h1>
        </Box>
      </Box>
    </>
  );
}

export default DrivingSchoolPage;
