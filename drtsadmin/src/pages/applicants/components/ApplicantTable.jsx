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
import getApplicants from "../applicantsService";

const columns = ["fullName", "licenseType", "dateofBirth", "email"];
const columnLabels = ["Full Name", "License Type", "Date of Birth", "Email"];

const ApplicantTable = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState(columns[0]);
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [bookingData, setBookingData] = useState({
    accessor: "",
    location: "",
    date: "",
    time: "",
  });
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  const handleBooking = () => {
    // Add logic to book the test with the selected data
    handleBookingDialogClose();
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

    fetchApplicants();
  }, []);

  const sortedData = applicants.slice().sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    const compareValue = aValue.localeCompare(bValue, undefined, {
      numeric: true,
      sensitivity: "base",
    });
    return order === "asc" ? compareValue : -compareValue;
  });

  const filteredData = sortedData.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

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
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell key={column}>{row[column]}</TableCell>
                    ))}
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setSelectedApplicant(row)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
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
          <Button onClick={() => setSelectedApplicant(null)} color="primary">
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
              value={bookingData.accessor}
              onChange={(e) =>
                setBookingData({ ...bookingData, accessor: e.target.value })
              }
            >
              {/* Add options for Accessor selection */}
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
              {/* Add options for Location selection */}
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
