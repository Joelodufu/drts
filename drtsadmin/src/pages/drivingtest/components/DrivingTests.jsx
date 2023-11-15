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
import {
  Check,
  Close,
  Timelapse,
  DateRange,
  LocationCity,
} from "@mui/icons-material";
import {
  fetchTestAppointments,
  fetchUserData,
} from "./TestAppointmentController";

const TestAppointmentsTable = () => {
  const [data, setData] = useState([]);
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    // Fetch test appointments
    fetchTestAppointments().then((result) => {
      setData(result);

      // Extract user IDs from the appointments and fetch user data
      const userIds = result.map((appointment) => appointment.user);
      fetchUserData(userIds).then((userData) => {
        const userNamesMap = {};
        userData.forEach((user) => {
          // Assuming the user data contains "firstName" and "lastName" properties
          userNamesMap[user._id] = `${user.firstName} ${user.lastName}`;
        });
        setUserNames(userNamesMap);
      });
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1">
                <IconButton color="primary">
                  <DateRange />
                </IconButton>
                APPLICANT
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <IconButton color="primary">
                  <Timelapse />
                </IconButton>
                DRIVER
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <IconButton color="primary">
                  <LocationCity />
                </IconButton>
                LOCATION
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <IconButton color="primary">
                  <DateRange />
                </IconButton>
                DATE
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((appointment) => (
            <TableRow key={appointment._id}>
              <TableCell>{userNames[appointment.user]}</TableCell>
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
