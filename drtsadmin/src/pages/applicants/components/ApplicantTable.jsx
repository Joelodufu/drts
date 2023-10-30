import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import {
  getApplicants,
  bookTestForUser,
  fetchAccessors,
  fetchLocations,
} from "../applicantsService";

const columns = ["fullName", "licenseType", "dateofBirth", "email"];
const columnLabels = ["Full Name", "License Type", "Date of Birth", "Email"];

const ApplicantTable = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState(columns[0]);
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [bookingData, setBookingData] = useState({
    applicantId: "",
    accessorId: "",
    location: "",
    date: "",
    time: "",
    testStatus: "awaiting",
  });
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [accessors, setAccessors] = useState([]); // State to store the list of accessors
  const [locations, setLocations] = useState([]); // State to store the list of location
  const [selectedAccessor, setSelectedAccessor] = useState("");
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleDisaprrove = async () => {
    await fetch(
      `https://drts-server.onrender.com/api/license/${selectedApplicant._id}`,
      {
        method: "DELETE",
      }
    ).then(() => window.location.reload());

    setSelectedApplicant(null);
  };

  const addApplicationId = (row) => {
    const appId = row._id;
    setSelectedApplicant(row);
    setBookingData({
      ...bookingData,
      applicantId: appId,
    });
  };
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrderBy(property);
    setOrder(isAsc ? "desc" : "asc");
  };

  const handleBookingDialogOpen = () => {
    setIsBookingDialogOpen(true);
  };

  const handleBookingDialogClose = () => {
    setIsBookingDialogOpen(false);
  };

  const handleBooking = async () => {
    try {
      const user = selectedApplicant.user;
      const applicantId = selectedApplicant._id;
      // Replace 'id' with the actual user ID field
      await bookTestForUser(user, applicantId, bookingData);
      handleBookingDialogClose();
      // Optionally, you can perform any actions after a successful booking.
    } catch (error) {
      // Handle any errors that may occur during booking.
      console.error("Failed to book the test:", error);
    }
  };

  useEffect(() => {
    async function fetchApplicants() {
      try {
        const data = await getApplicants();
        setApplicants(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    async function fetchAccessorsData() {
      try {
        const data = await fetchAccessors();
        setAccessors(data);
      } catch (error) {
        console.error("Error fetching accessors:", error);
      }
    }
    async function fetchLocationsData() {
      try {
        const data = await fetchLocations();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching accessors:", error);
      }
    }

    fetchApplicants();
    fetchAccessorsData();
    fetchLocationsData();
  }, []);

  return (
    <Paper>
      <Typography variant="h6" component="div" style={{ padding: "16px" }}>
        Applicants
      </Typography>
      <div>
        <TextField
          fullWidth
          label="Search"
          InputProps={{
            startAdornment: <Search />,
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer
          style={{ maxHeight: "50vh", width: "100%", overflowY: "auto" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columnLabels.map((label, index) => (
                  <TableCell
                    key={columns[index]}
                    sortDirection={orderBy === columns[index] ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === columns[index]}
                      direction={orderBy === columns[index] ? order : "asc"}
                      onClick={() => handleRequestSort(columns[index])}
                    >
                      {label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1}>Loading...</TableCell>
                </TableRow>
              ) : applicants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1}>
                    No applicants found.
                  </TableCell>
                </TableRow>
              ) : (
                applicants
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      key={index}
                      className={index % 2 === 0 ? "even-row" : "odd-row"}
                    >
                      {columns.map((column) => (
                        <TableCell key={column}>{row[column]}</TableCell>
                      ))}
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => addApplicationId(row)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={applicants.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
        />
      </div>
      <Dialog
        open={selectedApplicant !== null}
        onClose={() => setSelectedApplicant(null)}
      >
        <DialogTitle>
          {selectedApplicant && selectedApplicant.fullName}
        </DialogTitle>
        <DialogContent>
          {selectedApplicant && (
            <Grid container spacing={2}>
              {Object.keys(selectedApplicant).map((key) => (
                <Grid item xs={12} md={6} key={key}>
                  <p>
                    <strong>{key}:</strong> {selectedApplicant[key]}
                  </p>
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleBookingDialogOpen}
          >
            Book Test
          </Button>
          <Button onClick={() => handleDisaprrove()} color="primary">
            Disapprove
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isBookingDialogOpen} onClose={handleBookingDialogClose}>
        <DialogTitle>Book Test</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Accessor</InputLabel>
            <Select
              value={bookingData.accessorId} // Set the value to selectedAccessor
              onChange={(e) =>
                setBookingData({ ...bookingData, accessorId: e.target.value })
              } // Update selectedAccessor
            >
              {accessors.map((accessor) => (
                <MenuItem key={accessor.id} value={accessor.name}>
                  {accessor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Location</InputLabel>
            <Select
              value={bookingData.location}
              onChange={(e) =>
                setBookingData({ ...bookingData, location: e.target.value })
              }
            >
              {locations.map((location) => (
                <MenuItem key={location.id} value={location.name}>
                  {location.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Date</InputLabel>
            <input
              type="date"
              value={bookingData.date}
              onChange={(e) =>
                setBookingData({ ...bookingData, date: e.target.value })
              }
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Time</InputLabel>
            <input
              type="time"
              value={bookingData.time}
              onChange={(e) =>
                setBookingData({ ...bookingData, time: e.target.value })
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBooking} color="primary">
            Book
          </Button>
          <Button onClick={handleBookingDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ApplicantTable;
