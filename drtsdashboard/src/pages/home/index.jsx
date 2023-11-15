import React from "react";
import NavBar from "./../../components/NavBar";
import Box from "@mui/material/Box";
import LicenseTable from "./components/LicenseTable";
import NewApplications from "./components/NewApplications";

function HomePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = JSON.parse(localStorage.getItem("user")).role;

  return (
    <>
      {" "}
      {role == "admin" ? (
        (window.location.href = "https://drtsadminonly.web.app/")
      ) : (
        <Box sx={{ display: "flex" }}>
          <NavBar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <h1>{`Welcome ${user.firstName} ${user.lastName}!`}</h1>
            <NewApplications />
            <LicenseTable />
          </Box>
        </Box>
      )}
    </>
  );
}

export default HomePage;
