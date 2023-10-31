import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import Box from "@mui/material/Box";
import AccessorTable from "./component/AccessorTable";
function Accessor() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <AccessorTable />
      </Box>
    </>
  );
}

export default Accessor;
