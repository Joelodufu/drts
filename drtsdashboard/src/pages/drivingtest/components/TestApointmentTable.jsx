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
import { fetchUserData } from "./apointmentService";

const TestAppointmentsTable = () => {
  const [data, setData] = useState([]);
  const [userNames, setUserNames] = useState({});

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
          const userIds = appointments.map(
            (appointment) => appointment.applicantId
          );
          fetchUserData(userIds).then((userData) => {
            const userNamesMap = {};
            userData.forEach((user) => {
              // Assuming the user data contains "firstName" and "lastName" properties
              userNamesMap[user._id] = `${user.fullName}`;
            });
            setUserNames(userNamesMap);
          });
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
                <AccessTime /> Aplicant
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <AccessTime /> Accessor
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <Room /> Location
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">Date</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((appointment) => (
            <TableRow key={appointment._id}>
              <TableCell>{userNames[appointment.applicantId]}</TableCell>
              <TableCell>{appointment.accessorId}</TableCell>
              <TableCell>{appointment.location}</TableCell>
              <TableCell>{appointment.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TestAppointmentsTable;
