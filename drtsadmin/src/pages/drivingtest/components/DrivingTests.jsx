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
  Typography, // Add Typography component
} from "@mui/material";
import { Check, Close, Timelapse, DateRange, LocationCity } from "@mui/icons-material";
import { fetchTestAppointments } from "./TestAppointmentController";

const TestAppointmentsTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchTestAppointments().then((result) => {
      setData(result);
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
                Appointment Date
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <IconButton color="primary">
                  <Timelapse />
                </IconButton>
                Appointment Time
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <IconButton color="primary">
                  <LocationCity />
                </IconButton>
                Location
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <IconButton color="primary">
                  <Close />
                </IconButton>
                Test Status
              </Typography>
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
