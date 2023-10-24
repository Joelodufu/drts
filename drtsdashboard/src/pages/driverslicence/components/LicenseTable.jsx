import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Box,
} from "@mui/material";

const LicenseTable = ({ licenses, onRenewalClick }) => {
  return (
    <Box>
      <Button variant="contained" color="primary" onClick={onRenewalClick}>
        Apply New
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>License Type</TableCell>
            <TableCell>Expiry Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {licenses.map((license, index) => (
            <TableRow key={index}>
              <TableCell>{license.type}</TableCell>
              <TableCell>{license.expiryDate}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onRenewalClick(license)}
                >
                  Renew
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default LicenseTable;
