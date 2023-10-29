import React from "react";
import NavBar from "./../../components/NavBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TestAppointmentsTable from "./components/DrivingTests";

function DrivingTestPage() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Driving Tests</h1>
          <TestAppointmentsTable />
        </Box>
      </Box>
    </>
  );
}

export default DrivingTestPage;
