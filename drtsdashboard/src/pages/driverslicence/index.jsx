import React from "react";
import NavBar from "../../components/NavBar";
import Box from "@mui/material/Box";
import ApplicantForm from "./components/applicantForm";
import DocumentUploader from "./components/documentUploadForm";

function DriversLicence() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Drivers Licenses</h1>
          <DocumentUploader />
        </Box>
      </Box>
    </>
  );
}

export default DriversLicence;
