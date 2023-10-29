import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { fetchNewApplications } from "./newApplicationService"; // Update the path
const tableContainerStyle = {
  margin: "16px", // Adjust the margin as needed
};
const NewApplications = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchNewApplications().then((result) => {
      setData(result);
    });
  }, []);

  return (
    <TableContainer component={Paper} style={tableContainerStyle}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>License Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((application) => (
            <TableRow key={application._id}>
              <TableCell>{application.fullName}</TableCell>
              <TableCell>{application.phoneNumber}</TableCell>
              <TableCell>{application.email}</TableCell>
              <TableCell>{application.licenseType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NewApplications;
