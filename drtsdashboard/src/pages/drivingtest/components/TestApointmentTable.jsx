import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import { Check, Close, AccessTime, Room } from "@mui/icons-material";

const TestAppointmentsTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Retrieve the user object from local storage
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      // Extract the user ID from the user object
      const userId = user._id; // Assuming 'id' is the property containing the user ID

      // Make a complete fetch GET request to the API endpoint with the user ID
      fetch(
        `https://drts-server.onrender.com/api/testSchedules/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json", // Set the appropriate content type if needed
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((appointments) => {
          setData(appointments);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1">
                <AccessTime /> Date
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <AccessTime /> Appointment Time
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <Room /> Location
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">Test Status</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((appointment) => (
            <TableRow key={appointment._id}>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>{appointment.location}</TableCell>
              <TableCell>
                {appointment.testStatus === "awaiting" ? (
                  <IconButton color="primary">
                    <Close />
                  </IconButton>
                ) : (
                  <IconButton color="success">
                    <Check />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TestAppointmentsTable;
